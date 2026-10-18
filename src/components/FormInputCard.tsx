import { forwardRef, useEffect, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { nonResettableItems, submitItems, type DemoItem } from "../data/demoItems";
import { Icon } from "./Icon";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input({ className = "", ...props }, ref) {
  return <input ref={ref} className={`demo-input ${className}`} {...props} />;
});

const TextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextArea({ className = "", ...props }, ref) {
  return <textarea ref={ref} className={`demo-textarea ${className}`} {...props} />;
});

export function ComponentCard({ item }: { item: DemoItem }) {
  const [value, setValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pasteValue, setPasteValue] = useState("");
  const [clipboardMessage, setClipboardMessage] = useState("");
  const [chips, setChips] = useState(["status:ready"]);
  const [chipInput, setChipInput] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [validating, setValidating] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [historyValue, setHistoryValue] = useState("");
  const [draft, setDraft] = useState(() => localStorage.getItem("lava-demo-draft") || "");
  const [imageUrl, setImageUrl] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const fieldRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item.id !== 54 || !value) {
      setValidating(false);
      setAvailable(null);
      return;
    }
    setValidating(true);
    const timer = window.setTimeout(() => {
      setValidating(false);
      setAvailable(value.toLowerCase() !== "admin");
    }, 650);
    return () => window.clearTimeout(timer);
  }, [item.id, value]);

  useEffect(() => {
    if (item.id === 57) {
      if (draft) localStorage.setItem("lava-demo-draft", draft);
      else localStorage.removeItem("lava-demo-draft");
    }
  }, [draft, item.id]);

  const strength = value.length === 0 ? 0 : Math.min(4, Number(value.length >= 8) + Number(/[A-Z]/.test(value)) + Number(/[0-9]/.test(value)) + Number(/[^A-Za-z0-9]/.test(value)));
  const strengthText = ["Very weak", "Weak", "Fair", "Strong", "Excellent"][strength];
  const codeValue = value || "const lab = 'lava';\n\nfunction runTest() {\n  return true;\n}";
  const formatPan = (text: string) => text.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };
  const formatId = (text: string) => text.replace(/\D/g, "").slice(0, 12).replace(/(\d{4})(?=\d)/g, "$1-");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAddressError(false);
    setSubmitMessage("Looks good — browser validation passed.");
  };
  const handleReset = () => {
    setValue("");
    setSecondValue("");
    setShow(false);
    setCopied(false);
    setPasteValue("");
    setClipboardMessage("");
    setChips(["status:ready"]);
    setChipInput("");
    setOtp(["", "", "", "", "", ""]);
    setHistoryValue("");
    setAddressError(false);
    setSubmitMessage("");
    if (item.id === 57) {
      localStorage.removeItem("lava-demo-draft");
      setDraft("");
    }
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl("");
    formRef.current?.querySelectorAll<HTMLElement>("[contenteditable='true']").forEach((editor) => {
      editor.textContent = "";
    });
    if (textAreaRef.current) textAreaRef.current.style.height = "";
  };
  const addChip = () => {
    const candidate = chipInput.trim();
    if (candidate && !chips.includes(candidate)) setChips([...chips, candidate]);
    setChipInput("");
  };
  const onChipKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addChip();
    }
    if (event.key === "Backspace" && !chipInput && chips.length) setChips(chips.slice(0, -1));
  };
  const copyDemoValue = async () => {
    try {
      await navigator.clipboard.writeText("lava_testlab_2026");
      setCopied(true);
      setClipboardMessage("Copied. Paste it into the field below.");
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Could not copy the demo value to the clipboard.", error);
      setClipboardMessage("Clipboard access was blocked. You can still select and copy the value.");
    }
  };
  const pasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setPasteValue(clipboardText);
      setClipboardMessage(clipboardText ? "Pasted from clipboard." : "Your clipboard is empty.");
    } catch (error) {
      console.error("Could not read text from the clipboard.", error);
      setClipboardMessage("Clipboard access was blocked. Paste directly into the field instead.");
    }
  };
  const tool = (command: string, valueArg?: string) => {
    document.execCommand(command, false, valueArg);
  };
  const richActions: Array<{ title: string; label: ReactNode; command: string; value?: string }> = [];
  if (item.id === 37) richActions.push({ title: "Bold", label: <b>B</b>, command: "bold" });
  if (item.id === 38) richActions.push({ title: "Italic", label: <i>I</i>, command: "italic" });
  if (item.id === 39) richActions.push({ title: "Insert link", label: "↗", command: "createLink" });
  if (item.id === 40) richActions.push({ title: "Blockquote", label: "❝", command: "formatBlock", value: "blockquote" });
  if (item.id === 41) richActions.push({ title: "Code block", label: "</>", command: "formatBlock", value: "pre" });
  if (item.id === 42) richActions.push({ title: "Numbered list", label: "1.", command: "insertOrderedList" });
  if (item.id === 43) richActions.push({ title: "Bullet list", label: "•", command: "insertUnorderedList" });
  if (item.id === 45) richActions.push({ title: "Align left", label: "⇤", command: "justifyLeft" });
  if (item.id === 46) richActions.push({ title: "Align center", label: "↔", command: "justifyCenter" });
  if (item.id === 47) richActions.push({ title: "Align right", label: "⇥", command: "justifyRight" });
  if (item.id === 48) richActions.push({ title: "Justify text", label: "☷", command: "justifyFull" });
  const richEditor = <div className="rich-editor">
    <div className="rich-toolbar">
      {richActions.map((action) => <button type="button" title={action.title} key={action.title} onClick={() => {
        if (action.command === "createLink") {
          const url = window.prompt("Enter a link URL", "https://");
          if (url && /^https?:\/\//i.test(url)) tool(action.command, url);
          else if (url) window.alert("Use a valid http or https URL.");
          return;
        }
        tool(action.command, action.value);
      }}>{action.label}</button>)}
      {item.id === 44 && <label className="toolbar-upload" title="Attach image">＋ image<input type="file" accept="image/*" onChange={(event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) setImageUrl(URL.createObjectURL(file)); }} /></label>}
      <span>RICH TEXT</span>
    </div>
    {imageUrl && item.id === 44 && <img className="image-preview" src={imageUrl} alt="Selected attachment preview" />}
    <div className={`rich-content ${item.id === 41 ? "code-content" : ""}`} contentEditable suppressContentEditableWarning role="textbox" aria-label={`${item.title} editor`} data-placeholder={item.id === 44 ? "Write something, or add an image…" : "Select some text and try the toolbar…"} />
  </div>;

  const content: Record<number, ReactNode> = {
    1: <Input placeholder="e.g. Lava TestLab" value={value} onChange={(e) => setValue(e.target.value)} />,
    2: <div className="input-with-action"><Input type={show ? "text" : "password"} placeholder="Enter a password" value={value} onChange={(e) => setValue(e.target.value)} /><button type="button" className="field-action" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)}><Icon name={show ? "eyeOff" : "eye"} size={17} /></button></div>,
    3: <Input type="email" placeholder="name@example.com" value={value} onChange={(e) => setValue(e.target.value)} />,
    4: <div className="input-with-action"><Input type="tel" placeholder="+91 98765 43210" value={value} onChange={(e) => setValue(e.target.value)} /><button type="button" className="keypad-trigger" onClick={() => setShow(!show)}>⌗ Keypad</button>{show && <div className="keypad">{["1","2","3","4","5","6","7","8","9","*","0","#"].map((key) => <button type="button" key={key} onClick={() => setValue(value + key)}>{key}</button>)}</div>}</div>,
    5: <Input type="url" placeholder="https://example.com" value={value} onChange={(e) => setValue(e.target.value)} />,
    6: <Input type="number" placeholder="0" value={value} onChange={(e) => setValue(e.target.value)} />,
    7: <Input type="number" min="0" placeholder="0 or higher" value={value} onChange={(e) => setValue(e.target.value)} />,
    8: <Input type="number" max="100" placeholder="Up to 100" value={value} onChange={(e) => setValue(e.target.value)} />,
    9: <Input type="number" step="5" placeholder="Multiples of 5" value={value} onChange={(e) => setValue(e.target.value)} />,
    10: <div className="input-with-action"><Input type="search" placeholder="Search components…" value={value} onChange={(e) => setValue(e.target.value)} />{value && <button type="button" className="field-action" aria-label="Clear search" onClick={() => setValue("")}><Icon name="close" size={17} /></button>}</div>,
    11: <TextArea rows={3} placeholder="Start typing…" value={value} onChange={(e) => setValue(e.target.value)} />,
    12: <TextArea rows={4} placeholder="Four visible rows…" value={value} onChange={(e) => setValue(e.target.value)} />,
    13: <TextArea rows={3} className="resize-none" placeholder="This field cannot be resized…" value={value} onChange={(e) => setValue(e.target.value)} />,
    14: <TextArea rows={3} className="resize-horizontal" placeholder="Drag the lower-right corner horizontally…" value={value} onChange={(e) => setValue(e.target.value)} />,
    15: <TextArea rows={3} className="resize-vertical" placeholder="Drag the lower-right corner vertically…" value={value} onChange={(e) => setValue(e.target.value)} />,
    16: <><TextArea rows={3} maxLength={500} placeholder="Write up to 500 characters…" value={value} onChange={(e) => setValue(e.target.value)} /><div className="field-meta"><span>Keep it concise</span><span className={value.length > 460 ? "count-warning" : ""}>{value.length}/500</span></div></>,
    17: <Input readOnly value="LAVA-READ-ONLY-01" />,
    18: <Input disabled placeholder="Unavailable right now" />,
    19: <label className="required-field"><span>Project name <b>*</b></span><Input required placeholder="Required to continue" value={value} onChange={(e) => setValue(e.target.value)} /></label>,
    20: <div className="input-with-action"><Input ref={fieldRef} placeholder="Focus on demand" value={value} onChange={(e) => setValue(e.target.value)} /><button type="button" className="keypad-trigger" onClick={() => fieldRef.current?.focus()}>Focus field</button></div>,
    21: <><Input required pattern="[A-Z]{3}" maxLength={3} placeholder="ABC" value={value} onChange={(e) => setValue(e.target.value.toUpperCase())} /><span className="field-hint">Use exactly three uppercase letters.</span></>,
    22: <label className={`floating-field ${value ? "has-value" : ""}`}><Input id="floating-input" placeholder=" " value={value} onChange={(e) => setValue(e.target.value)} /><span>Workspace name</span></label>,
    23: <><Input required type="email" aria-invalid={value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "true" : undefined} className={value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "input-error" : ""} placeholder="name@example.com" value={value} onChange={(e) => setValue(e.target.value)} /><span className="inline-error">{value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid email address." : "A valid email address is required."}</span></>,
    24: <Input required pattern="[0-9]{4}( [0-9]{4}){3}" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" value={value} onChange={(e) => setValue(formatPan(e.target.value))} />,
    25: <Input required pattern="(0[1-9]|1[0-2])/[0-9]{2}" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" maxLength={5} value={value} onChange={(e) => setValue(formatExpiry(e.target.value))} />,
    26: <Input required pattern="[0-9]{3,4}" type={show ? "text" : "password"} inputMode="numeric" autoComplete="cc-csc" maxLength={4} placeholder="•••" value={value.replace(/\D/g, "")} onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 4))} />,
    27: <div className="otp-row" ref={groupRef}>{otp.map((digit, index) => <input aria-label={`OTP digit ${index + 1}`} key={index} value={digit} required maxLength={1} inputMode="numeric" onChange={(e) => { const next = [...otp]; next[index] = e.target.value.replace(/\D/g, "").slice(-1); setOtp(next); if (next[index] && index < 5) (groupRef.current?.children[index + 1] as HTMLInputElement)?.focus(); }} onKeyDown={(e) => { if (e.key === "Backspace" && !digit && index > 0) (groupRef.current?.children[index - 1] as HTMLInputElement)?.focus(); }} />)}</div>,
    28: <div className="input-prefix"><span>₹</span><Input type="number" min="0" step="0.01" placeholder="0.00" value={value} onChange={(e) => setValue(e.target.value)} /></div>,
    29: <div className="input-suffix"><Input type="number" placeholder="0" value={value} onChange={(e) => setValue(e.target.value)} /><span>kg</span></div>,
    30: <div className="inline-edit" contentEditable suppressContentEditableWarning role="textbox" aria-label="Inline editable text">Click here to edit this text</div>,
    31: <div className="clipboard-demo"><div className="copy-value"><code>lava_testlab_2026</code><button type="button" className="copy-button" onClick={() => void copyDemoValue()}><Icon name={copied ? "check" : "copy"} size={16} />{copied ? "Copied" : "Copy"}</button></div><label className="paste-field-label" htmlFor="clipboard-paste-field">Paste into this field</label><div className="input-with-action paste-input"><Input id="clipboard-paste-field" aria-label="Paste clipboard text here" placeholder="Paste copied text here" value={pasteValue} onChange={(e) => { setPasteValue(e.target.value); setClipboardMessage(""); }} /><button type="button" className="keypad-trigger" onClick={() => void pasteFromClipboard()}>Paste</button></div>{clipboardMessage && <span className="clipboard-message" role="status">{clipboardMessage}</span>}</div>,
    32: <><input type="hidden" value="usr_8F29A1" /><div className="hidden-id"><span>Value hidden from view</span><code>usr_8F29A1</code></div></>,
    33: <div className="validation-demo"><div className="validation-summary"><b>{Number(!value.trim()) + Number(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(secondValue.trim()))} fields need attention</b><span>Complete the required details below.</span></div><Input required placeholder="Full name *" value={value} onChange={(e) => setValue(e.target.value)} /><Input required type="email" placeholder="Email address *" value={secondValue} onChange={(e) => setSecondValue(e.target.value)} />{addressError && <span className="inline-error">Enter a name and a valid email address.</span>}</div>,
    34: <><Input list="name-options" autoComplete="on" placeholder="Start typing a name…" value={value} onChange={(e) => setValue(e.target.value)} /><datalist id="name-options"><option value="Ava Patel" /><option value="Noah Chen" /><option value="Mia Johnson" /></datalist></>,
    35: <><Input list="address-options" autoComplete="street-address" placeholder="Search a sample address…" value={value} onChange={(e) => setValue(e.target.value)} /><datalist id="address-options"><option value="22 Baker Street, London" /><option value="1 Infinite Loop, Cupertino" /><option value="5th Avenue, New York" /></datalist><span className="field-hint">Suggestions are local demo data; no map service is connected.</span></>,
    36: <div className="chip-field">{chips.map((chip) => <span className="query-chip" key={chip}>{chip}<button type="button" aria-label={`Remove ${chip}`} onClick={() => setChips(chips.filter((item) => item !== chip))}>×</button></span>)}<input placeholder="Add a filter…" value={chipInput} onChange={(e) => setChipInput(e.target.value)} onKeyDown={onChipKey} /><button type="button" className="chip-add" onClick={addChip}>Add</button></div>,
    37: richEditor, 38: richEditor, 39: richEditor, 40: richEditor, 41: richEditor, 42: richEditor, 43: richEditor, 44: richEditor, 45: richEditor, 46: richEditor, 47: richEditor, 48: richEditor,
    49: <div className="code-editor"><div className="line-numbers">{codeValue.split("\n").map((_, index) => <span key={index}>{index + 1}<br /></span>)}</div><textarea spellCheck={false} aria-label="Code editor" value={codeValue} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Tab") { e.preventDefault(); const target = e.currentTarget; const start = target.selectionStart; const end = target.selectionEnd; setValue(codeValue.slice(0, start) + "  " + codeValue.slice(end)); requestAnimationFrame(() => { target.selectionStart = target.selectionEnd = start + 2; }); } }} /></div>,
    50: <Input required pattern="[0-9]{4}(-[0-9]{4}){2}" inputMode="numeric" placeholder="0000-0000-0000" maxLength={14} value={value} onChange={(e) => setValue(formatId(e.target.value))} />,
    51: <div className="input-prefix icon-prefix"><Icon name="user" size={17} /><Input placeholder="Your name" value={value} onChange={(e) => setValue(e.target.value)} /></div>,
    52: <div className="input-with-action"><Input type={show ? "text" : "password"} placeholder="Secret value" value={value} onChange={(e) => setValue(e.target.value)} /><button type="button" className="field-action" aria-label={show ? "Hide value" : "Show value"} onClick={() => setShow(!show)}><Icon name={show ? "eyeOff" : "eye"} size={17} /></button></div>,
    53: <><Input placeholder="e.g. lava.design" value={value} onChange={(e) => setValue(e.target.value)} /><span className="field-hint"><Icon name="spark" size={13} /> Use your team’s short, memorable name.</span></>,
    54: <div className="input-with-action"><Input placeholder="Try “admin” or a username" value={value} onChange={(e) => setValue(e.target.value)} />{validating && <span className="validation-spinner" />}{!validating && available !== null && <span className={available ? "available-status" : "unavailable-status"}>{available ? "Available" : "Taken"}</span>}</div>,
    55: <div className="clear-demo"><Input placeholder="A sample value" value={value} onChange={(e) => setValue(e.target.value)} /><Input placeholder="Another value" value={secondValue} onChange={(e) => setSecondValue(e.target.value)} /><button type="button" className="mini-button" onClick={() => { setValue(""); setSecondValue(""); }}>Clear fields <Icon name="close" size={14} /></button></div>,
    56: <><Input placeholder="Type to create a previous value" value={value} onChange={(e) => { setHistoryValue(value); setValue(e.target.value); }} />{historyValue && <button type="button" className="undo-bubble" onClick={() => { setValue(historyValue); setHistoryValue(""); }}>↶ Undo previous value</button>}</>,
    57: <><div className="draft-header"><span><span className="saved-dot" /> Saved locally</span><span>Autosave on</span></div><TextArea rows={3} placeholder="Your draft is saved in this browser…" value={draft} onChange={(e) => setDraft(e.target.value)} /></>,
    58: <TextArea ref={textAreaRef} rows={2} placeholder="This area grows as you type…" value={value} onChange={(e) => { setValue(e.target.value); if (textAreaRef.current) { textAreaRef.current.style.height = "auto"; textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; } }} />,
    59: <><div className="input-with-action"><Input type={show ? "text" : "password"} placeholder="Build a strong password" value={value} onChange={(e) => setValue(e.target.value)} /><button type="button" className="field-action" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)}><Icon name={show ? "eyeOff" : "eye"} size={17} /></button></div><div className="strength-meter">{[1,2,3,4].map((step) => <span key={step} className={strength >= step ? `strength-${strength}` : ""} />)}</div><div className="field-meta"><span>Password strength</span><span className={`strength-label strength-text-${strength}`}>{strengthText}</span></div></>,
    60: <><Input type={show ? "text" : "password"} placeholder="Type while Caps Lock is on" value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={(e) => setShow(e.getModifierState("CapsLock"))} onKeyDown={(e) => setShow(e.getModifierState("CapsLock"))} /><span className={`caps-warning ${show ? "caps-visible" : ""}`}>⇧ Caps Lock is on</span></>,
  };

  const shouldShowSubmit = submitItems.has(item.id);
  const shouldShowReset = !nonResettableItems.has(item.id);

  return <article className="component-card" id={`component-${item.id}`}>
    <div className="card-topline"><span className="component-number">{String(item.id).padStart(2, "0")}</span><span className="component-status"><span /> INTERACTIVE</span></div>
    <h3>{item.title}</h3>
    <p className="card-description">{item.description}</p>
    <form className="demo-form" ref={formRef} onSubmit={handleSubmit} onInvalidCapture={() => setAddressError(true)} onReset={handleReset}>
      <div className="control-area">{content[item.id]}</div>
      {(shouldShowSubmit || shouldShowReset) && <div className="form-actions">
        {shouldShowSubmit && <button className="form-submit" type="submit">Submit <Icon name="arrow" size={13} /></button>}
        {shouldShowReset && <button className="form-reset" type="reset">Reset</button>}
      </div>}
      {submitMessage && <span className="form-feedback" role="status">{submitMessage}</span>}
    </form>
  </article>;
}

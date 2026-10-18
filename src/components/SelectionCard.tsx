import { useEffect, useRef, useState, type ReactNode } from "react";
import type { DemoItem } from "../data/demoItems";
import { Input } from "./FormInputCard";
import { Icon } from "./Icon";

const choiceOptions = ["Design", "Engineering", "Marketing"];
const selectionPalette = [
  { name: "Violet", color: "#a77cff" },
  { name: "Coral", color: "#ff806e" },
  { name: "Mint", color: "#64d6a0" },
  { name: "Sky", color: "#68b8ff" },
  { name: "Gold", color: "#f2bd62" },
];
const selectionSizes = ["XS", "S", "M", "L", "XL"];
const seatLabels = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"];
const menuActions = ["Edit", "Duplicate", "Archive"];

export function SelectionCard({ item }: { item: DemoItem }) {
  const [checked, setCheckedState] = useState(item.id === 62 || item.id === 73 || item.id === 92 || item.id === 112 || item.id === 113);
  const [selected, setSelectedState] = useState<string[]>(item.id === 64 ? ["read"] : item.id === 69 ? ["design"] : item.id === 75 ? ["A"] : item.id === 77 ? ["one", "three"] : item.id === 81 || item.id === 84 ? ["React"] : item.id === 98 ? ["A1", "B3"] : item.id === 119 ? ["Design"] : []);
  const [choice, setChoiceState] = useState(() => {
    if ([67, 70, 71, 72, 76, 85, 86, 99, 117, 118].includes(item.id)) return "one";
    if (item.id === 97) return "True";
    if (item.id === 106) return "Not started";
    return "";
  });
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [textSelected, setTextSelected] = useState(false);
  const [hotspot, setHotspot] = useState("");
  const indeterminateRef = useRef<HTMLInputElement>(null);
  const keyboardIndex = useRef(0);
  const check = (key: string) => selected.includes(key);
  const selectionLabels: Record<number, Record<string, string>> = {
    67: { one: "Starter", two: "Pro" },
    70: { one: "Basic plan", two: "Pro plan" },
    71: { one: "Day", two: "Week", three: "Month" },
    72: { one: "List", two: "Board", three: "Calendar" },
    76: { one: "Overview", two: "Activity", three: "Settings", four: "Members", five: "Billing" },
    77: { one: "Overview", two: "Activity", three: "Settings", four: "Members", five: "Billing" },
    78: { figma: "Figma", sketch: "Sketch", vscode: "VS Code", github: "GitHub" },
    79: { starter: "Starter", team: "Team", scale: "Scale" },
    80: { India: "India", Canada: "Canada", Germany: "Germany", Japan: "Japan" },
    85: { one: "Low", two: "Medium", three: "High" },
    86: { one: "Compact", two: "Comfortable", three: "Spacious" },
    89: Object.fromEntries(selectionPalette.map(({ name }) => [name, name])),
    90: Object.fromEntries(selectionSizes.map((size) => [size, size])),
    91: { forest: "Forest", ocean: "Ocean", desert: "Desert" },
    93: { Personal: "Personal", Product: "Product", Sandbox: "Sandbox" },
    94: { Dashboard: "Dashboard", Reports: "Reports", "Team settings": "Team settings", "Help center": "Help center" },
    97: { True: "True", False: "False" },
    99: { one: "Overview", two: "Activity", three: "Members" },
    100: { one: "Accept", two: "Skip" },
    106: { "Not started": "Not started", "In progress": "In progress", Complete: "Complete" },
    108: { North: "North zone", East: "East zone", West: "West zone", South: "South zone" },
    117: { one: "English", two: "Español", three: "Français", four: "日本語" },
    118: { one: "India +91", two: "United States +1", three: "United Kingdom +44", four: "Japan +81" },
  };
  const updateChoice = (next: string, label?: string) => {
    setChoiceState(next);
    setMessage(next ? `${label || selectionLabels[item.id]?.[next] || next} selected` : "Selection cleared");
  };
  const updateChecked = (next: boolean, label: string) => {
    setCheckedState(next);
    setMessage(`${label} ${next ? "on" : "off"}`);
  };
  const updateSelected = (next: string[]) => {
    setSelectedState(next);
    setMessage(next.length ? `${next.length} selected` : "Selection cleared");
  };
  const toggle = (key: string, label = key) => {
    const next = selected.includes(key) ? selected.filter((value) => value !== key) : [...selected, key];
    setSelectedState(next);
    setMessage(`${label} ${next.includes(key) ? "selected" : "cleared"} · ${next.length} selected`);
  };
  const selectionStatus = message
    || (selected.length > 0 ? `${selected.length} selected${selected.length < 4 ? `: ${selected.join(", ")}` : ""}`
      : choice ? `Selected: ${selectionLabels[item.id]?.[choice] || choice}`
        : item.id === 111 && rating ? `Rating: ${rating} of 5`
          : item.id === 108 && hotspot ? `${hotspot} zone selected`
            : item.id === 74 ? "Disabled · On"
              : item.id === 62 && checked ? "Keep me signed in is on"
                : item.id === 73 && checked ? "Product updates are on"
                  : item.id === 92 ? `Switch is ${checked ? "on" : "off"}`
                    : item.id === 112 ? (checked ? "Saved to favorites" : "Not in favorites")
                      : item.id === 113 ? (checked ? "Bookmarked" : "Not bookmarked")
            : checked ? "On" : "No selection yet");
  const setChoice = updateChoice;
  const choose = updateChoice;
  const setChecked = (next: boolean) => updateChecked(next, "Selection");
  const setSelected = updateSelected;
  const selectableCheckbox = (key: string, label: string) => (
    <label className="choice-check" key={key}>
      <input type="checkbox" checked={check(key)} onChange={() => toggle(key, label)} />
      <span className="custom-check"><Icon name="check" size={12} /></span>
      <span>{label}</span>
    </label>
  );
  const optionRows = (options: string[]) => options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (indeterminateRef.current) indeterminateRef.current.indeterminate = selected.length > 0 && selected.length < 2;
  }, [selected]);

  const content: Record<number, ReactNode> = {
    61: selectableCheckbox("standard", "Enable notifications"),
    62: <div className="choice-note"><label className="choice-check"><input type="checkbox" checked={checked} onChange={(event) => updateChecked(event.target.checked, "Keep me signed in")} /><span className="custom-check"><Icon name="check" size={12} /></span><span>Keep me signed in</span></label><span className="choice-caption">Checked by default</span></div>,
    63: <label className="choice-check"><input type="checkbox" checked={checked} onChange={(event) => updateChecked(event.target.checked, "Subscribe to updates")} /><span className="custom-check"><Icon name="check" size={12} /></span><span>Subscribe to updates</span></label>,
    64: <div className="choice-note"><label className="choice-check"><input ref={indeterminateRef} type="checkbox" checked={selected.length === 2} onChange={(event) => setSelected(event.target.checked ? ["read", "write"] : [])} /><span className="custom-check"><Icon name="check" size={12} /></span><span>Select all permissions</span></label><div className="choice-subitems">{selectableCheckbox("read", "Read")}{selectableCheckbox("write", "Write")}</div><span className="choice-caption">Partial state updates from child selections.</span></div>,
    65: <div className="choice-note"><label className="choice-check"><input type="checkbox" checked={selected.length === choiceOptions.length} ref={(node) => { if (node) node.indeterminate = selected.length > 0 && selected.length < choiceOptions.length; }} onChange={(event) => setSelected(event.target.checked ? choiceOptions.map((option) => option.toLowerCase()) : [])} /><span className="custom-check"><Icon name="check" size={12} /></span><b>Select all teams</b></label><div className="choice-subitems">{choiceOptions.map((option) => selectableCheckbox(option.toLowerCase(), option))}</div></div>,
    66: <div className="choice-list">{["Monthly", "Yearly", "One-time"].map((option) => <label className="choice-radio" key={option}><input type="radio" name="radio-66" value={option} checked={choice === option} onChange={() => choose(option)} /><span />{option}</label>)}</div>,
    67: <div className="choice-list">{["Starter", "Pro"].map((option, index) => <label className="choice-radio" key={option}><input type="radio" name="radio-67" value={option} checked={choice === (index === 0 ? "one" : "two")} onChange={() => setChoice(index === 0 ? "one" : "two")} /><span />{option}{index === 0 && <em>Selected</em>}</label>)}</div>,
    68: <div className="choice-list">{["Option A", "Option B", "Option C"].map((option) => <label className="choice-radio" key={option}><input type="radio" name="radio-68" checked={choice === option} onChange={() => setChoice(option)} /><span />{option}</label>)}</div>,
    69: <div className="choice-card-list">{[["design","Design system","Tokens & components"],["research","User research","Interviews & insights"]].map(([key,title,desc]) => <label className={`selectable-card ${check(key) ? "selected" : ""}`} key={key}><input type="checkbox" checked={check(key)} onChange={() => toggle(key, title)} /><span className="selectable-card-check"><Icon name="check" size={12} /></span><b>{title}</b><small>{desc}</small></label>)}</div>,
    70: <div className="choice-card-list">{["Basic plan","Pro plan"].map((option, index) => <label className={`selectable-card ${choice === (index ? "two" : "one") ? "selected" : ""}`} key={option}><input type="radio" name="radio-card-70" checked={choice === (index ? "two" : "one")} onChange={() => setChoice(index ? "two" : "one")} /><span className="selectable-card-check"><Icon name="check" size={12} /></span><b>{option}</b><small>{index ? "$12 / month" : "Free forever"}</small></label>)}</div>,
    71: <div className="segmented-control">{["Day","Week","Month"].map((option, index) => <button key={option} className={choice === ["one","two","three"][index] ? "selected" : ""} type="button" aria-pressed={choice === ["one","two","three"][index]} onClick={() => setChoice(["one","two","three"][index])}>{option}</button>)}</div>,
    72: <div className="segmented-control">{["List","Board","Calendar"].map((option, index) => <button key={option} className={choice === ["one","two","three"][index] ? "selected" : ""} type="button" aria-pressed={choice === ["one","two","three"][index]} onClick={() => setChoice(["one","two","three"][index])}>{option}</button>)}</div>,
    73: <label className="switch-row"><span>Product updates</span><input type="checkbox" checked={checked} onChange={(event) => updateChecked(event.target.checked, "Product updates")} /><span className="switch-track" /></label>,
    74: <label className="switch-row is-disabled"><span>Managed by admin</span><input type="checkbox" checked disabled /><span className="switch-track" /></label>,
    75: <div className="choice-grid">{["A","B","C","D","E","F"].map((cell) => <button key={cell} type="button" className={check(cell) ? "selected" : ""} aria-pressed={check(cell)} onClick={() => toggle(cell)}>{cell}</button>)}</div>,
    76: <select className="demo-select listbox" size={4} value={choice} onChange={(event) => setChoice(event.target.value)}><option value="one">Overview</option><option value="two">Activity</option><option value="three">Settings</option><option value="four">Members</option><option value="five">Billing</option></select>,
    77: <select className="demo-select listbox" multiple size={4} value={selected} onChange={(event) => setSelected(Array.from(event.target.selectedOptions, (option) => option.value))}><option value="one">Overview</option><option value="two">Activity</option><option value="three">Settings</option><option value="four">Members</option><option value="five">Billing</option></select>,
    78: <select className="demo-select" value={choice} onChange={(event) => setChoice(event.target.value)}><option value="">Choose a tool…</option><optgroup label="Design"><option value="figma">Figma</option><option value="sketch">Sketch</option></optgroup><optgroup label="Development"><option value="vscode">VS Code</option><option value="github">GitHub</option></optgroup></select>,
    79: <select className="demo-select" value={choice} onChange={(event) => setChoice(event.target.value)}><option value="">Choose a plan…</option><option value="starter">Starter — free</option><option value="team">Team — $12</option><option value="scale">Scale — $29</option></select>,
    80: <select className="demo-select" required value={choice} onChange={(event) => setChoice(event.target.value)}><option value="" disabled>Please choose a country…</option>{["India","Canada","Germany","Japan"].map((country) => <option key={country}>{country}</option>)}</select>,
    81: <div className="selection-tags">{selected.map((tag) => <span className="query-chip" key={tag}>{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={() => toggle(tag)}>×</button></span>)}<div className="choice-pill-row">{["React","Vue","Svelte"].filter((tag) => !check(tag)).map((tag) => <button className="choice-pill" type="button" key={tag} onClick={() => toggle(tag)}>+ {tag}</button>)}</div></div>,
    82: <div className="quick-select"><button className="mini-button" type="button" onClick={() => setSelected(choiceOptions.map((option) => option.toLowerCase()))}>Select all</button><button className="mini-button" type="button" onClick={() => setSelected([])}>Clear</button><div className="choice-subitems">{choiceOptions.map((option) => selectableCheckbox(option.toLowerCase(), option))}</div></div>,
    83: <div className="quick-select"><div className="choice-subitems">{choiceOptions.map((option) => selectableCheckbox(option.toLowerCase(), option))}</div><button className="mini-button" type="button" onClick={() => setSelected([])}>Deselect all</button><span className="choice-caption">{selected.length} selected</span></div>,
    84: <div className="selection-tags">{["React","Vue","Svelte"].map((tag) => check(tag) && <span className="query-chip" key={tag}>{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={() => toggle(tag)}>×</button></span>)}<div className="choice-pill-row">{["React","Vue","Svelte"].map((tag) => <button className={`choice-pill ${check(tag) ? "choice-active" : ""}`} type="button" key={tag} onClick={() => toggle(tag)}>{tag}</button>)}</div></div>,
    85: <div className="button-choice-row">{["Low","Medium","High"].map((option, index) => <button key={option} className={choice === ["one","two","three"][index] ? "selected" : ""} type="button" onClick={() => setChoice(["one","two","three"][index])}>{option}</button>)}</div>,
    86: <div className="button-choice-column">{["Compact","Comfortable","Spacious"].map((option, index) => <button key={option} className={choice === ["one","two","three"][index] ? "selected" : ""} type="button" onClick={() => setChoice(["one","two","three"][index])}>{option}</button>)}</div>,
    87: <div className="choice-filter"><div className="selection-search"><Icon name="search" size={14} /><input placeholder="Filter options…" value={query} onChange={(event) => { const nextQuery = event.target.value; setQuery(nextQuery); const count = ["Design","Engineering","Marketing","Operations"].filter((option) => option.toLowerCase().includes(nextQuery.toLowerCase())).length; setMessage(`${count} matching options`); }} /></div><div className="choice-subitems">{optionRows(["Design","Engineering","Marketing","Operations"]).map((option) => selectableCheckbox(option.toLowerCase(), option))}</div></div>,
    88: <div className="tree-list"><button type="button" className="tree-parent" onClick={() => { setExpanded(!expanded); setMessage(expanded ? "Workspace settings collapsed" : "Workspace settings expanded"); }}><span>{expanded ? "▾" : "▸"}</span> Workspace settings</button>{expanded && <div className="tree-children">{["Profile","Notifications","Security"].map((option) => selectableCheckbox(option.toLowerCase(), option))}</div>}</div>,
    89: <div className="color-swatches">{selectionPalette.map((color) => <button key={color.name} type="button" title={color.name} aria-label={`Select ${color.name}`} aria-pressed={choice === color.name} className={choice === color.name ? "selected" : ""} style={{ "--swatch-color": color.color } as React.CSSProperties} onClick={() => setChoice(color.name)} />)}</div>,
    90: <div className="size-options">{selectionSizes.map((size, index) => <button key={size} type="button" disabled={index === 0} className={choice === size ? "selected" : ""} aria-pressed={choice === size} onClick={() => setChoice(size)}>{size}</button>)}</div>,
    91: <div className="image-options">{[["forest","🌲","Forest"],["ocean","🌊","Ocean"],["desert","🏜️","Desert"]].map(([key,icon,label]) => <button type="button" key={key} className={choice === key ? "selected" : ""} aria-pressed={choice === key} onClick={() => setChoice(key)}><span>{icon}</span><small>{label}</small>{choice === key && <i><Icon name="check" size={11} /></i>}</button>)}</div>,
    92: <button type="button" role="switch" aria-checked={checked} className={`text-switch ${checked ? "on" : ""}`} onClick={() => setChecked(!checked)}><span>{checked ? "ON" : "OFF"}</span><i /></button>,
    93: <select className="demo-select" value={choice} onChange={(event) => setChoice(event.target.value)}><option value="">Select a workspace…</option>{["Personal","Product","Sandbox"].map((name) => <option key={name}>{name}</option>)}</select>,
    94: <div className="hover-options" role="listbox">{["Dashboard","Reports","Team settings","Help center"].map((option) => <button key={option} type="button" role="option" aria-selected={choice === option} className={choice === option ? "selected" : ""} onMouseEnter={() => setChoice(option)} onClick={() => setChoice(option)}>{option}</button>)}</div>,
    95: <div className="combo-box"><Input aria-label="Choose a project" placeholder="Choose a project…" value={query || choice} onChange={(event) => { const nextQuery = event.target.value; setQuery(nextQuery); setOpen(true); const count = ["Lava web","Mobile app","Design system"].filter((option) => option.toLowerCase().includes(nextQuery.toLowerCase())).length; setMessage(`${count} matching projects`); }} /><button type="button" aria-label="Show project options" onClick={() => setOpen(!open)}>▾</button>{open && <div className="combo-options">{optionRows(["Lava web","Mobile app","Design system"]).map((option) => <button key={option} type="button" onClick={() => { setChoice(option); setQuery(""); setOpen(false); }}>{option}</button>)}</div>}</div>,
    96: <><Input list="selection-datalist" placeholder="Type a framework…" value={query} onChange={(event) => { setQuery(event.target.value); setMessage(event.target.value ? `Suggestion query: ${event.target.value}` : "No selection yet"); }} /><datalist id="selection-datalist"><option value="React" /><option value="Vue" /><option value="Svelte" /></datalist></>,
    97: <div className="boolean-choice">{["True","False"].map((option) => <label className={`boolean-option ${choice === option ? "selected" : ""}`} key={option}><input type="radio" name="boolean-choice" checked={choice === option} onChange={() => setChoice(option)} /><span>{option}</span></label>)}</div>,
    98: <div className="seat-grid">{seatLabels.map((seat, index) => <button key={seat} type="button" disabled={index === 2 || index === 5} className={`${check(seat) ? "selected" : ""} ${index === 2 || index === 5 ? "reserved" : ""}`} aria-pressed={check(seat)} onClick={() => toggle(seat)}>{seat}</button>)}</div>,
    99: <div className="list-group">{["Overview","Activity","Members"].map((option, index) => <button key={option} type="button" className={choice === ["one","two","three"][index] ? "selected" : ""} onClick={() => setChoice(["one","two","three"][index])}><span>{option}</span><span>›</span></button>)}</div>,
    100: <div className="button-choice-row touch-choice"><button type="button" className={choice === "one" ? "selected" : ""} aria-pressed={choice === "one"} onClick={() => setChoice("one")}>Accept</button><button type="button" className={choice === "two" ? "selected" : ""} aria-pressed={choice === "two"} onClick={() => setChoice("two")}>Skip</button></div>,
    101: <div className="nested-menu"><button type="button" onClick={() => setOpen(!open)}>Move to… <span>›</span></button>{open && <div className="nested-options"><button type="button" onClick={() => setChoice("Projects")}>Projects <span>›</span></button><button type="button" onClick={() => setChoice("Archive")}>Archive <span>›</span></button>{choice === "Projects" && <button type="button" onClick={() => { setMessage("Moved to Design"); setOpen(false); }}>Design</button>}</div>}{message && <small>{message}</small>}</div>,
    102: <div className="dropdown-demo"><button type="button" className="menu-trigger" onClick={() => setOpen(!open)}>File actions <span>⌄</span></button>{open && <div className="action-menu">{[...menuActions,"Delete"].map((action) => <button type="button" key={action} className={action === "Delete" ? "danger" : ""} onClick={() => { setMessage(`${action} selected`); setOpen(false); }}>{action}</button>)}</div>}{message && <small>{message}</small>}</div>,
    103: <div className="hover-menu"><button type="button" onClick={() => setOpen(!open)}>Products <span>›</span></button><div className={`hover-submenu ${open ? "show" : ""}`}><button type="button" onClick={() => setMessage("Overview opened")}>Overview</button><button type="button" onClick={() => setMessage("Integrations opened")}>Integrations</button></div>{message && <small>{message}</small>}</div>,
    104: <div className="dropdown-demo"><button className="menu-trigger" type="button" aria-label="Open asset actions" onClick={() => setOpen(!open)}>Asset menu <span>⌄</span></button>{open && <div className="action-menu">{menuActions.map((action) => <button type="button" key={action} onClick={() => { setMessage(`${action} selected`); setOpen(false); }}>{action}</button>)}</div>}{message && <small>{message}</small>}</div>,
    105: <div className="dropdown-demo"><button type="button" className="menu-trigger" onClick={() => setOpen(!open)}>{choice || "Choose a plan"} <span>⌄</span></button>{open && <div className="multi-column-menu">{[["Starter","Free","1 seat"],["Team","$12/mo","10 seats"],["Scale","$29/mo","Unlimited"]].map(([plan,price,seats]) => <button type="button" key={plan} onClick={() => { setChoice(plan); setMessage(`${price} · ${seats}`); setOpen(false); }}><b>{plan}</b><span>{price}</span><small>{seats}</small></button>)}</div>}{message && <small>{message}</small>}</div>,
    106: <div className="keyboard-options" role="listbox" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); keyboardIndex.current = (keyboardIndex.current + (event.key === "ArrowDown" ? 1 : 2)) % 3; setChoice(["Not started","In progress","Complete"][keyboardIndex.current]); } if (event.key === "Enter") setMessage(`${choice} selected`); }}><button type="button" className={choice === "Not started" ? "selected" : ""} onClick={() => setChoice("Not started")}>Not started</button><button type="button" className={choice === "In progress" ? "selected" : ""} onClick={() => setChoice("In progress")}>In progress</button><button type="button" className={choice === "Complete" ? "selected" : ""} onClick={() => setChoice("Complete")}>Complete</button>{message && <small>{message}</small>}</div>,
    107: <div className="dropdown-demo"><button type="button" className="menu-trigger" onClick={() => setOpen(!open)}>{choice || "Search and choose…"} <span>⌄</span></button>{open && <div className="searchable-menu"><div className="selection-search"><Icon name="search" size={14} /><input autoFocus placeholder="Search options…" value={query} onChange={(event) => { const nextQuery = event.target.value; setQuery(nextQuery); const count = ["Analytics","Design","Engineering","Marketing","Support"].filter((option) => option.toLowerCase().includes(nextQuery.toLowerCase())).length; setMessage(`${count} matching options`); }} /></div>{optionRows(["Analytics","Design","Engineering","Marketing","Support"]).map((option) => <button type="button" key={option} onClick={() => { setChoice(option); setOpen(false); }}>{option}</button>)}</div>}</div>,
    108: <div className="zone-map"><div className="zone-shape">{["North","East","West","South"].map((zone) => <button key={zone} type="button" aria-pressed={hotspot === zone} className={hotspot === zone ? "selected" : ""} onClick={() => { setHotspot(zone); setMessage(`${zone} zone selected`); }}>{zone.slice(0,1)}</button>)}</div><span>{hotspot ? `${hotspot} zone selected` : "Choose a map zone"}</span></div>,
    109: <div className="split-action"><button type="button" onClick={() => setMessage("Primary action completed")}>Run test <Icon name="arrow" size={13} /></button><button type="button" aria-label="Choose another action" onClick={() => setOpen(!open)}>⌄</button>{open && <div className="split-menu">{["Run & save","Run all","Schedule"].map((action) => <button type="button" key={action} onClick={() => { setMessage(`${action} selected`); setOpen(false); }}>{action}</button>)}</div>}{message && <small>{message}</small>}</div>,
    110: <div className="floating-toolbar-demo"><div className="floating-toolbar-copy" onMouseUp={() => setTextSelected(Boolean(window.getSelection()?.toString()))}>Select some words in this example sentence to show the toolbar.</div>{textSelected && <div className="floating-toolbar"><button type="button" onClick={() => setMessage("Bold applied")}>B</button><button type="button" onClick={() => setMessage("Italic applied")}><i>I</i></button><button type="button" onClick={() => setMessage("Link action selected")}>↗</button></div>}{message && <small>{message}</small>}</div>,
    111: <div className="rating-control" onMouseLeave={() => setHoverRating(0)}>{[1,2,3,4,5].map((star) => <button type="button" key={star} aria-label={`${star} star${star > 1 ? "s" : ""}`} aria-pressed={rating === star} className={star <= (hoverRating || rating) ? "active" : ""} onMouseEnter={() => setHoverRating(star)} onClick={() => { setRating(star); setMessage(`Rating: ${star} of 5 stars`); }}>★</button>)}<span>{rating ? `${rating}/5` : "Rate this"}</span></div>,
    112: <button className={`reaction-button heart-reaction ${checked ? "active" : ""}`} type="button" aria-pressed={checked} onClick={() => updateChecked(!checked, "Favorite")}><span>♥</span>{checked ? "Saved to favorites" : "Add to favorites"}</button>,
    113: <button className={`reaction-button ${checked ? "active" : ""}`} type="button" aria-pressed={checked} onClick={() => updateChecked(!checked, "Bookmark")}><span>{checked ? "▮" : "▯"}</span>{checked ? "Bookmarked" : "Bookmark"}</button>,
    114: <div className="vote-row"><button type="button" className={choice === "up" ? "active" : ""} aria-pressed={choice === "up"} onClick={() => setChoice(choice === "up" ? "" : "up")}>👍 <span>{choice === "up" ? 13 : 12}</span></button><span>Was this helpful?</span></div>,
    115: <div className="vote-row"><button type="button" className={choice === "down" ? "negative" : ""} aria-pressed={choice === "down"} onClick={() => setChoice(choice === "down" ? "" : "down")}>👎 <span>{choice === "down" ? 4 : 3}</span></button><span>Not quite right?</span></div>,
    116: <div className="tile-pills">{["Fast","Reliable","Simple"].map((option) => <button className={`choice-pill ${choice === option ? "choice-active" : ""}`} type="button" key={option} aria-pressed={choice === option} onClick={() => setChoice(choice === option ? "" : option)}>{option}</button>)}</div>,
    117: <select className="demo-select" value={choice} onChange={(event) => setChoice(event.target.value)}><option value="one">🇬🇧 English</option><option value="two">🇪🇸 Español</option><option value="three">🇫🇷 Français</option><option value="four">🇯🇵 日本語</option></select>,
    118: <div className="country-prefix"><select className="demo-select" aria-label="Country dialing code" value={choice} onChange={(event) => setChoice(event.target.value)}><option value="one">🇮🇳 +91</option><option value="two">🇺🇸 +1</option><option value="three">🇬🇧 +44</option><option value="four">🇯🇵 +81</option></select><Input type="tel" placeholder="Phone number" /></div>,
    119: <div className="highlight-list">{["Design","Engineering","Marketing"].map((option) => <button type="button" key={option} className={check(option) ? "selected" : ""} aria-pressed={check(option)} onClick={() => toggle(option)}><span className="custom-check"><Icon name="check" size={12} /></span>{option}</button>)}</div>,
    120: <div className="focus-demo"><Input placeholder="Click or tab into this field" onFocus={() => setMessage("Input focus ring active")} /><button className="focus-demo-button" type="button" onFocus={() => setMessage("Button focus ring active")}>Focusable action</button></div>,
  };

  return <article className="component-card selection-card" id={`component-${item.id}`}>
    <div className="card-topline"><span className="component-number">{item.id}</span><span className="component-status"><span /> INTERACTIVE</span></div>
    <h3>{item.title}</h3>
    <p className="card-description">{item.description}</p>
    <div className="selection-control-area">{content[item.id]}</div>
    <div className="selection-feedback" role="status" aria-live="polite"><Icon name={message || selected.length || choice || checked || rating || hotspot ? "check" : "spark"} size={12} />{item.id === 96 && query && !message ? `Suggestion query: ${query}` : selectionStatus}</div>
  </article>;
}

import { useEffect, useState, type ReactNode } from "react";
import type { DemoItem } from "../data/demoItems";

function downloadSample(name: string, content: string, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ActionCard({ item }: { item: DemoItem }) {
  const [message, setMessage] = useState("");
  const [reportUrl, setReportUrl] = useState("");
  const [copiedUrl, setCopiedUrl] = useState("");
  const [themePreviewLight, setThemePreviewLight] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState("Overview");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [sortAscending, setSortAscending] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(false);
  useEffect(() => () => {
    if (reportUrl) URL.revokeObjectURL(reportUrl);
  }, [reportUrl]);
  const inform = (text: string) => setMessage(text);
  const toggle = (label: string) => {
    const next = !checked;
    setChecked(next);
    inform(`${label} ${next ? "enabled" : "disabled"}`);
  };
  const actionButton = (label: string, action: () => void, className = "") => <button type="button" className={`action-demo-button ${className}`} onClick={action}>{label}</button>;
  const tabPanel = <div className="action-tabs">{["Overview","Activity","Settings"].map((tab) => <button type="button" className={selected === tab ? "selected" : ""} key={tab} onClick={() => { setSelected(tab); inform(`${tab} tab opened`); }}>{tab}</button>)}<p>{selected} panel content</p></div>;
  const rows = (sortAscending ? ["Alpha", "Bravo", "Charlie"] : ["Charlie", "Bravo", "Alpha"]);

  const content: Record<number, ReactNode> = {
    181: actionButton("Run action", () => inform("Action completed successfully"), "primary"),
    182: <form className="action-inline-form" onSubmit={(event) => { event.preventDefault(); inform("Sample form submitted"); }}><input required className="demo-input" aria-label="Required sample value" placeholder="Required value" /><button className="action-demo-button primary">Submit</button></form>,
    183: <form className="action-inline-form" onReset={() => inform("Sample form reset")}><input className="demo-input" aria-label="Reset sample value" placeholder="Type, then reset" /><button className="action-demo-button" type="reset">Reset form</button></form>,
    184: <a className="action-text-link" href="#component-184" onClick={(event) => { event.preventDefault(); inform("In-page demo link activated"); }}>Open demo link ↗</a>,
    185: <a className="action-text-link" href="https://email-risk-analyzer-phishnix.vercel.app/" target="_blank" rel="noreferrer" onClick={() => inform("Opening PhishNix – Email Risk Analyzer in a new tab")}>PhishNix – Email Risk Analyzer ↗</a>,
    186: <a className="action-text-link" href="#component-186" onClick={(event) => { event.preventDefault(); inform("In-page anchor activated"); }}>Jump to section ↓</a>,
    187: <a className="action-text-link" href="tel:+18005550199" onClick={(event) => { event.preventDefault(); inform("Call link ready: +1 800 555 0199"); }}>☎ +1 (800) 555-0199</a>,
    188: <a className="action-text-link" href="mailto:hello@example.com" onClick={() => inform("Email link ready: hello@example.com")}>✉ hello@example.com</a>,
    189: actionButton("Download sample", () => { downloadSample("lava-sample.txt", "Lava TestLab sample download\n"); inform("Sample file downloaded"); }),
    190: actionButton("Create project", () => inform("Project created"), "primary"),
    191: actionButton("Save draft", () => inform("Draft saved"), "secondary"),
    192: actionButton("Learn more", () => inform("More information selected"), "tertiary"),
    193: <button type="button" className="action-icon-button" aria-label="Add item" onClick={() => { setCount(count + 1); inform(`Item added · ${count + 1} total`); }}>＋</button>,
    194: <div className="report-demo">{actionButton("✦  Generate report", () => {
      const url = URL.createObjectURL(new Blob(["Lava TestLab demo report\nStatus: complete\nGenerated from the Button with icon demo.\n"], { type: "text/plain" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "lava-testlab-report.txt";
      anchor.click();
      setReportUrl(url);
      inform("Report generated and downloaded. Use the link below to open it again.");
    })}{reportUrl && <a className="report-download-link" href={reportUrl} download="lava-testlab-report.txt">Open generated report</a>}</div>,
    195: <div className="action-menu-wrap">{actionButton(expanded ? "Close menu" : "☰ Open menu", () => setExpanded(!expanded))}{expanded && <div className="action-popover">{["Home","Projects","Settings"].map((entry) => <button type="button" key={entry} onClick={() => { setSelected(entry); setExpanded(false); inform(`${entry} opened`); }}>{entry}</button>)}</div>}{selected !== "Overview" && <small>{selected}</small>}</div>,
    196: <div className="action-menu-wrap">{actionButton("⋮  More actions", () => setExpanded(!expanded))}{expanded && <div className="action-popover">{["Edit","Duplicate","Archive"].map((entry) => <button type="button" key={entry} onClick={() => { setExpanded(false); inform(`${entry} action selected`); }}>{entry}</button>)}</div>}</div>,
    197: <div className="action-menu-wrap">{actionButton("•••  Options", () => setExpanded(!expanded))}{expanded && <div className="action-popover action-popover-row">{["Edit","Copy","Delete"].map((entry) => <button type="button" key={entry} onClick={() => { setExpanded(false); inform(`${entry} action selected`); }}>{entry}</button>)}</div>}</div>,
    198: <div className="app-launcher">{["◈","▦","◉","▤"].map((icon,index) => <button type="button" key={icon} aria-label={`Open app ${index+1}`} onClick={() => inform(`App ${index+1} opened`)}>{icon}</button>)}</div>,
    199: <>{expanded && <div className="action-modal-backdrop"><div role="dialog" aria-modal="true" aria-labelledby={`dialog-title-${item.id}`}><h4 id={`dialog-title-${item.id}`}>Sample dialog</h4><p>Dialog content stays local to this demo.</p>{actionButton("Close dialog", () => { setExpanded(false); inform("Dialog closed"); })}</div></div>}{actionButton("Open dialog", () => { setExpanded(true); inform("Dialog opened"); })}</>,
    200: <div className="action-accordion"><button type="button" aria-expanded={expanded} onClick={() => { setExpanded(!expanded); inform(expanded ? "Details collapsed" : "Details expanded"); }}>Details <span>{expanded ? "−" : "+"}</span></button>{expanded && <p>Additional information is now visible.</p>}</div>,
    201: <div className="action-accordion"><button type="button" onClick={() => { setExpanded(!expanded); inform(expanded ? "Panel shown" : "Panel hidden"); }}>{expanded ? "Show details" : "Hide details"}</button>{!expanded && <p>Collapsible detail panel.</p>}</div>,
    202: <div className="action-menu-wrap"><button type="button" className="action-demo-button" onClick={() => setExpanded(!expanded)}>More options <span>{expanded ? "⌄" : "›"}</span></button>{expanded && <div className="action-popover">{["Profile","Preferences","Sign out"].map((entry) => <button key={entry} type="button" onClick={() => { setExpanded(false); inform(`${entry} selected`); }}>{entry}</button>)}</div>}</div>,
    203: <div className="carousel-demo"><button type="button" aria-label="Previous item" onClick={() => { setCount((count + 2) % 3); inform(`Slide ${(count + 2) % 3 + 1} of 3`); }}>‹</button><b>Slide {count % 3 + 1} of 3</b><button type="button" aria-label="Next item" onClick={() => { setCount((count + 1) % 3); inform(`Slide ${(count + 1) % 3 + 1} of 3`); }}>›</button></div>,
    204: <div className="carousel-demo"><button type="button" onClick={() => { setCount((count + 2) % 3); inform(`Slide ${(count + 2) % 3 + 1} of 3`); }}>‹ Previous</button><b>Slide {count % 3 + 1}</b></div>,
    205: actionButton("↑ Back to top", () => { window.scrollTo({ top: 0, behavior: "smooth" }); inform("Scrolled to page top"); }),
    206: <div className="action-menu-wrap"><button type="button" className="floating-shortcut" aria-label="Open quick actions" onClick={() => setExpanded(!expanded)}>✦</button>{expanded && <div className="action-popover"><button type="button" onClick={() => inform("New note created")}>New note</button><button type="button" onClick={() => inform("Shortcut settings opened")}>Settings</button></div>}</div>,
    207: actionButton("Download report", () => { downloadSample("lava-report.txt", "Lava TestLab demo report\nStatus: complete\n"); inform("Report downloaded"); }),
    208: actionButton("Print page", () => { inform("Print dialog opened"); window.print(); }),
    209: <div className="share-link-demo">{actionButton("Copy page link", async () => {
      const url = window.location.href;
      setCopiedUrl(url);
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard API is unavailable");
        await navigator.clipboard.writeText(url);
        inform("Page link copied. Paste it into the field below or anywhere you want to share it.");
      } catch (error) {
        console.error("Could not copy page link.", error);
        inform("Clipboard access unavailable. The page URL is shown below so you can copy it manually.");
      }
    })}{copiedUrl && <label className="share-link-field">Copied page URL · paste it here to test
      <textarea aria-label="Copied page URL; paste here to test" value={copiedUrl} onChange={(event) => setCopiedUrl(event.target.value)} rows={2} />
    </label>}</div>,
    210: actionButton("Share", async () => { if (navigator.share) { try { await navigator.share({ title: "Lava TestLab", url: window.location.href }); inform("Share sheet opened"); } catch (error) { if (error instanceof Error && error.name !== "AbortError") { console.error("Could not share this page.", error); inform("Sharing failed."); } } } else { inform("Native sharing is not supported; use Copy page link."); } }),
    211: actionButton(`Add to cart · ${count}`, () => { setCount(count + 1); inform(`Added to cart · ${count + 1} item${count ? "s" : ""}`); }, "primary"),
    212: actionButton("Buy now", () => inform("Demo checkout started"), "primary"),
    213: <div className="action-inline-form"><input className="demo-input" placeholder="Coupon code" aria-label="Coupon code" value={query} onChange={(event) => setQuery(event.target.value)} /><button type="button" className="action-demo-button" onClick={() => { if (!query.trim()) { inform("Enter a coupon code first"); return; } inform(`Coupon ${query.trim().toUpperCase()} applied · 10% off`); }}>Apply</button></div>,
    214: <div className="chat-demo"><div className="chat-messages">{expanded ? <span>Hi! How can we help?</span> : <span>Support is online</span>}</div><div className="action-inline-form"><input aria-label="Chat message" className="demo-input" placeholder="Write a message…" value={query} onChange={(event) => setQuery(event.target.value)} /><button type="button" className="action-demo-button" onClick={() => { if (!query.trim()) { inform("Write a message before sending"); return; } inform(`Message sent: ${query.trim()}`); setExpanded(true); setQuery(""); }}>Send</button></div></div>,
    215: actionButton("🎙 Start voice input", () => { const speechWindow = window as Window & { SpeechRecognition?: new () => { start: () => void; onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null; onerror: (() => void) | null }; webkitSpeechRecognition?: new () => { start: () => void; onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null; onerror: (() => void) | null } }; const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition; if (!Recognition) { inform("Voice input is not supported in this browser."); return; } const recognition = new Recognition(); recognition.onresult = (event) => inform(`Recognized: ${event.results[0][0].transcript}`); recognition.onerror = () => inform("Voice input could not be captured."); try { recognition.start(); inform("Listening…"); } catch (error) { console.error("Could not start voice input.", error); inform("Voice input could not be started."); } }),
    216: <>{expanded && <div className="action-modal-backdrop" onClick={() => setExpanded(false)}><div className="qr-modal" role="dialog" aria-modal="true" aria-labelledby={`qr-title-${item.id}`} onClick={(event) => event.stopPropagation()}><button type="button" className="qr-modal-close" aria-label="Close QR code popup" onClick={() => setExpanded(false)}>×</button><h4 id={`qr-title-${item.id}`}>Demo QR code</h4><p>Scan this sample code or open the page URL shown below.</p><div className="qr-pattern" aria-label="Decorative sample QR pattern" role="img" /><code>{window.location.href}</code>{actionButton("Close popup", () => { setExpanded(false); inform("QR code popup closed"); })}</div></div>}{actionButton("▦  Open QR code", () => { setExpanded(true); inform("QR code popup opened"); })}</>,
    217: actionButton("Export CSV", () => { downloadSample("lava-data.csv", "Name,Status\nAlpha,Ready\nBravo,In progress\nCharlie,Ready\n", "text/csv"); inform("CSV exported"); }),
    218: actionButton("Print / Save as PDF", () => { inform("Use the print dialog to save this demo as PDF"); window.print(); }),
    219: <div className="theme-preference-demo"><label className="action-toggle"><span>{themePreviewLight ? "Light preview" : "Dark preview"}</span><input type="checkbox" checked={themePreviewLight} onChange={(event) => { setThemePreviewLight(event.target.checked); inform(`Theme preference set to ${event.target.checked ? "light" : "dark"} preview`); }} /><i /></label><div className={`theme-preview ${themePreviewLight ? "theme-preview-light" : ""}`}><b>Lava TestLab</b><span>Preference preview · {themePreviewLight ? "Light" : "Dark"}</span></div></div>,
    220: <div className={`contrast-demo ${checked ? "high-contrast" : ""}`}><span>Preview text</span><button type="button" onClick={() => toggle("High contrast")}>{checked ? "Standard" : "High contrast"}</button></div>,
    221: <div className="font-size-control"><button type="button" aria-label="Decrease text size" onClick={() => { setFontSize(Math.max(10, fontSize - 2)); inform(`Text size ${Math.max(10,fontSize-2)}px`); }}>A−</button><span style={{ fontSize }}>{fontSize}px sample</span><button type="button" aria-label="Increase text size" onClick={() => { setFontSize(Math.min(24, fontSize + 2)); inform(`Text size ${Math.min(24,fontSize+2)}px`); }}>A+</button></div>,
    222: actionButton("▶ Read sample aloud", () => { if (!("speechSynthesis" in window)) { inform("Text-to-speech is not supported in this browser."); return; } window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance("Welcome to Lava TestLab.")); inform("Reading sample aloud"); }),
    223: <div className="poll-demo"><p>Which feature should we build next?</p>{["More inputs","Charts","Themes"].map((option,index)=><button key={option} type="button" onClick={()=>{setCount(index+1);inform(`Vote recorded: ${option}`);}}>{option}<span>{count ? `${index===count-1?52:24}%` : "Vote"}</span></button>)}</div>,
    224: actionButton("Delete sample item", () => { if (window.confirm("Delete this sample item?")) inform("Sample item deleted"); else inform("Delete canceled"); }, "danger"),
    225: <div className="action-menu-wrap"><button type="button" className="action-demo-button" onClick={() => setExpanded(!expanded)}>Products <span>›</span></button>{expanded && <div className="action-popover"><button type="button" onClick={() => inform("Design tools submenu selected")}>Design tools ›</button><button type="button" onClick={() => inform("Developer tools submenu selected")}>Developer tools ›</button></div>}</div>,
    226: tabPanel,
    227: <div className="action-accordion">{["First panel","Second panel","Third panel"].map((entry)=><div key={entry}><button type="button" onClick={()=>{setSelected(selected===entry?"":entry);inform(selected===entry?`${entry} collapsed`:`${entry} expanded`);}}>{entry}<span>{selected===entry?"−":"+"}</span></button>{selected===entry&&<p>{entry} content is visible.</p>}</div>)}</div>,
    228: <><button type="button" className="action-demo-button" onClick={() => { setExpanded(!expanded); inform(expanded?"Filters hidden":"Filters shown"); }}>{expanded?"Hide filters":"Show filters"}</button>{expanded && <div className="filter-options">{["All","Active","Archived"].map((entry)=><button className={filter===entry?"selected":""} key={entry} type="button" onClick={()=>{setFilter(entry);inform(`${entry} filter applied`);}}>{entry}</button>)}</div>}</>,
    229: <div className="sortable-table"><div><button type="button" onClick={()=>{setSortAscending(!sortAscending);inform(`Sorted ${sortAscending?"Z to A":"A to Z"}`);}}>Name ↕</button><span>Status</span></div>{rows.map((row)=><div key={row}><b>{row}</b><span>{row==="Bravo"?"In progress":"Ready"}</span></div>)}</div>,
    230: <div className="map-pins"><div className="map-demo"><button type="button" style={{left:"25%",top:"35%"}} aria-label="Select north pin" onClick={()=>inform("North pin selected · Studio 4")} /> <button type="button" style={{left:"68%",top:"62%"}} aria-label="Select south pin" onClick={()=>inform("South pin selected · Lobby")} /></div><span>{message || "Select a map pin"}</span></div>,
    231: <div className="load-more-demo"><div>{Array.from({length:Math.min(count+2,6)},(_,index)=><span key={index}>Result {index+1}</span>)}</div><button type="button" className="action-demo-button" onClick={()=>{setCount(Math.min(count+2,6));inform(count>=4?"All sample results loaded":`Loaded ${Math.min(count+4,6)} results`);}}>Load more</button></div>,
    232: <div className="pagination-demo"><button type="button" disabled={page===1} onClick={()=>{setPage(page-1);inform(`Page ${page-1}`);}}>‹</button><span>Page {page} of 5</span><button type="button" disabled={page===5} onClick={()=>{setPage(page+1);inform(`Page ${page+1}`);}}>›</button></div>,
    233: <div className="pagination-demo"><button type="button" onClick={()=>{setPage(5);inform("Last page · 5");}}>Last page ›|</button><span>Page {page} / 5</span></div>,
    234: <div className="pagination-demo"><button type="button" onClick={()=>{setPage(1);inform("First page · 1");}}>|‹ First page</button><span>Page {page} / 5</span></div>,
    235: <div className="filter-options">{["Design","Engineering","Marketing"].map((tag)=><button type="button" className={filter===tag?"selected":""} key={tag} onClick={()=>{setFilter(filter===tag?"All":tag);inform(filter===tag?"Tag filter cleared":`${tag} tag applied`);}}>{tag}</button>)}</div>,
    236: <label className="action-toggle"><span>{checked?"Following channel":"Follow channel"}</span><input type="checkbox" checked={checked} onChange={()=>toggle("Channel follow")} /><i /></label>,
    237: <div className="notification-options">{["Email","Push","Weekly digest"].map((setting)=><label key={setting}><input type="checkbox" onChange={(event)=>inform(`${setting} notifications ${event.target.checked?"enabled":"disabled"}`)} />{setting}</label>)}</div>,
    238: <div className="action-inline-form"><input className="demo-input" placeholder="Email address" aria-label="Subscription email" type="email" value={query} onChange={(event)=>setQuery(event.target.value)} /><button type="button" className="action-demo-button primary" onClick={()=>{if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query)){inform("Enter a valid email address to subscribe");return;}inform(`Subscribed ${query}`);}}>Subscribe</button></div>,
    239: <div className="batch-demo"><label><input type="checkbox" checked={checked} onChange={(event)=>{setChecked(event.target.checked);inform(event.target.checked?"2 rows selected":"Selection cleared");}} /> Select all rows</label><div>{["Alpha","Bravo"].map((row)=><span key={row}>☑ {row}</span>)}</div>{checked&&<button type="button" onClick={()=>inform("Batch archive completed")}>Archive selected</button>}</div>,
    240: <div className="quantity-demo"><button type="button" aria-label="Decrease quantity" disabled={quantity<=1} onClick={()=>{setQuantity(quantity-1);inform(`Quantity: ${quantity-1}`);}}>−</button><b>{quantity}</b><button type="button" aria-label="Increase quantity" onClick={()=>{setQuantity(quantity+1);inform(`Quantity: ${quantity+1}`);}}>＋</button><span>× $24</span></div>,
  };
  return <article className="component-card action-card" id={`component-${item.id}`}>
    <div className="card-topline"><span className="component-number">{item.id}</span><span className="component-status"><span /> INTERACTIVE</span></div>
    <h3>{item.title}</h3>
    <p className="card-description">{item.description}</p>
    <div className="action-demo-area">{content[item.id]}</div>
    <div className="selection-feedback" role="status" aria-live="polite">{message || "Try the control to see its result."}</div>
  </article>;
}

import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import type { DemoItem } from "../data/demoItems";

const localMedia = {
  images: [
    new URL("../../media/Image1.png", import.meta.url).href,
    new URL("../../media/Image2.png", import.meta.url).href,
    new URL("../../media/Image3.png", import.meta.url).href,
  ],
  audio: new URL("../../media/media/Audio.wav", import.meta.url).href,
  video: new URL("../../media/media/Demo.mp4", import.meta.url).href,
};

export function ExtendedDemoCard({ item, onLogout }: { item: DemoItem; onLogout: () => void }) {
  const [message, setMessage] = useState("Try the control to see its result.");
  const [value, setValue] = useState(45);
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [count, setCount] = useState(0);
  const [logoutReady, setLogoutReady] = useState(false);

  useEffect(() => {
    if (!message.startsWith("Done:")) return;
    const timer = window.setTimeout(() => setMessage("Try the control to see its result."), 2400);
    return () => window.clearTimeout(timer);
  }, [message]);

  if (item.id === 515) return <article className="component-card semantic-logout-card" id={`component-${item.id}`}>
    <div className="card-topline"><span className="component-number">{item.id}</span><span className="component-status"><span /> SESSION</span></div>
    <h3>{item.title}</h3><p className="card-description">{item.description}</p>
    <div className="semantic-logout-panel">
      <span className="semantic-session-indicator"><i /> Demo session active</span>
      <label><input type="checkbox" checked={logoutReady} onChange={(event) => setLogoutReady(event.target.checked)} /> Confirm sign out</label>
      <button type="button" className="action-demo-button danger" disabled={!logoutReady} onClick={onLogout}>Log out</button>
    </div>
  </article>;

  const notify = (result: string) => setMessage(result);
  const button = (label: string, onClick: () => void, className = "") =>
    <button type="button" className={`action-demo-button ${className}`} onClick={onClick}>{label}</button>;
  const primaryAction = () => {
    const next = count + 1;
    setCount(next);
    notify(`Done: ${item.title} updated locally · ${next}`);
  };
  const semanticNode = item.id === 421 ? <main>Core page content <span>{selected || "Select Update preview"}</span></main>
    : item.id === 422 ? <header>Page header <span>Brand · Actions</span></header>
    : item.id === 423 ? <nav aria-label="Sample navigation"><span>Home</span><span>Library</span><span>About</span></nav>
    : item.id === 424 ? <footer>Local footer · Lava TestLab</footer>
    : item.id === 425 ? <section><b>Sample section</b><p>Related content grouped together.</p></section>
    : item.id === 426 ? <article><b>Sample article</b><p>Self-contained content preview.</p></article>
    : item.id === 427 ? <aside>Related information</aside>
    : item.id >= 428 && item.id <= 433 ? (() => {
      const headingText = `Heading level ${item.id - 427}`;
      switch (item.id) {
        case 428: return <h1>{headingText}</h1>;
        case 429: return <h2>{headingText}</h2>;
        case 430: return <h3>{headingText}</h3>;
        case 431: return <h4>{headingText}</h4>;
        case 432: return <h5>{headingText}</h5>;
        default: return <h6>{headingText}</h6>;
      }
    })()
    : item.id === 434 ? <p>Paragraph content preview.</p>
    : item.id === 435 ? <strong>Important emphasized text</strong>
    : item.id === 436 ? <em>Emphasized sample text</em>
    : item.id === 437 ? <code>const test = "local";</code>
    : item.id === 438 ? <pre>{`line one\n  line two`}</pre>
    : item.id === 439 ? <blockquote>“A sample quotation.”</blockquote>
    : item.id === 440 ? <cite>Sample citation title</cite>
    : item.id === 441 ? <time dateTime="2026-10-17">October 17, 2026</time>
    : item.id === 442 ? <address>TestLab · Local demo</address>
    : item.id === 443 ? <><span>Before divider</span><hr /><span>After divider</span></>
    : item.id === 444 ? <span>Line one<br />Line two</span>
    : item.id === 445 ? <span>Long<wbr />Component<wbr />Name</span>
    : item.id === 446 ? <span>Inline semantic span</span>
    : item.id === 447 ? <div>Generic block container</div>
    : item.id === 495 ? <div className="semantic-avatar"><img src={localMedia.images[0]} alt="Local sample profile" /><span>Sample profile image</span></div>
    : null;

  let demo: ReactNode;
  if (item.id >= 241 && item.id <= 255) {
    const selectFiles = (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.currentTarget.files ?? []);
      if (files.length) {
        setFileName(files.map((file) => file.name).join(", "));
        notify(`Done: ${files.length} local file${files.length === 1 ? "" : "s"} selected`);
      }
    };
    if (item.id === 244) {
      demo = <div className="extended-dropzone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => {
        event.preventDefault();
        const names = Array.from(event.dataTransfer.files).map((file) => file.name);
        if (names.length) {
          setFileName(names.join(", "));
          notify(`Done: ${names.length} file${names.length === 1 ? "" : "s"} dropped into this card`);
        } else notify("No files were included in the drop.");
      }}>
        <span>Drop files here</span>
        <label className="action-demo-button">or browse
          <input type="file" multiple onChange={selectFiles} />
        </label>
        {fileName && <small>{fileName}</small>}
      </div>;
    } else if (item.id <= 243 || item.id === 252) {
      demo = <div className="extended-upload">
        <label className="action-demo-button">Choose local file
          <input type="file" multiple={item.id === 242} accept={item.id === 243 ? ".pdf" : item.id === 252 ? "image/*" : undefined} onChange={selectFiles} />
        </label>
        <span className="extended-file-name">{fileName || "No file selected"}</span>
        {item.id === 252 && fileName && <img className="extended-thumbnail-image" src={localMedia.images[0]} alt="Local sample image preview" />}
      </div>;
    } else if (item.id === 245) {
      demo = <div className="extended-crop-demo"><div><span style={{ transform: `translateX(${value - 50}%)` }} /></div><input aria-label="Crop position" type="range" min="0" max="100" value={value} onChange={(event) => { setValue(Number(event.target.value)); notify(`Done: crop position ${event.target.value}%`); }} /></div>;
    } else if (item.id === 246) {
      demo = <div className="extended-rotate-demo"><span style={{ transform: `rotate(${value * 3.6}deg)` }}>◧</span>{button("Rotate 90°", () => { setValue((value + 25) % 100); notify(`Done: preview rotated ${(value + 25) % 100 * 3.6}°`); })}</div>;
    } else if (item.id === 247) {
      demo = <div className="extended-progress-demo"><progress value={value} max="100" /><span>{value}% uploaded locally</span>{button(value === 100 ? "Reset" : "Upload sample", () => { const next = value === 100 ? 0 : Math.min(100, value + 25); setValue(next); notify(`Done: local upload preview ${next}%`); })}</div>;
    } else if (item.id === 248 || item.id === 249) {
      demo = <div className="extended-upload-state"><span>{open ? item.id === 248 ? "✓ Upload complete" : "↻ Retry complete" : item.id === 248 ? "Ready to upload" : "Upload paused"}</span>{button(item.id === 248 ? "Simulate success" : "Retry upload", () => { setOpen(true); notify(item.id === 248 ? "Done: sample upload succeeded locally" : "Done: local upload retry started"); })}</div>;
    } else if (item.id >= 250 && item.id <= 251 || item.id === 253) {
      demo = <div className="extended-upload-state"><span className="extended-file-badge">{item.id === 251 ? "PDF" : "FILE"}</span><span>{fileName || "sample-document.pdf"}</span>{item.id === 253 && button("Detach", () => { setFileName(""); setOpen(false); notify("Done: attachment detached from this card"); })}</div>;
    } else {
      demo = <div className="extended-device">
          <span className={`extended-device-indicator ${open ? "active" : ""}`} />
          {button(open ? "Stop local preview" : item.id === 254 ? "Preview microphone" : "Preview camera", () => {
            setOpen(!open);
            notify(`Done: local ${item.id === 254 ? "microphone" : "camera"} preview ${open ? "stopped" : "started"}; no device permission requested`);
          })}
        </div>;
    }
  } else if (item.id >= 256 && item.id <= 260 || item.id >= 293 && item.id <= 295) {
    demo = <div className="extended-canvas">
      <svg viewBox="0 0 180 65" role="img" aria-label={`${item.title} local vector preview`}>
        <path d={`M10 52 Q${value} ${8 + ((value * 3) % 40)} 90 30 T170 ${60 - value % 35}`} />
        <circle cx={value * 1.6 + 10} cy={18 + value % 32} r="5" />
      </svg>
      <input aria-label={`${item.title} control`} type="range" min="0" max="100" value={value} onChange={(event) => { setValue(Number(event.target.value)); notify(`Done: preview updated to ${event.target.value}%`); }} />
      <div>{button("Add mark", primaryAction)}{button("Clear preview", () => { setValue(0); notify("Done: local preview cleared"); })}</div>
    </div>;
  } else if (item.id >= 261 && item.id <= 284 || item.id >= 298 && item.id <= 300 || item.id === 404 || item.id === 485 || item.id === 486 || item.id === 514) {
    demo = item.id === 262 || item.id === 281 || item.id === 486
      ? <div className="extended-media"><video className="local-video" src={localMedia.video} controls playsInline onPlay={() => notify("Done: local sample video playing")} onPause={() => notify("Done: local sample video paused")} /><small>Local video · media/Demo.mp4</small></div>
      : item.id === 263 || item.id === 276 || item.id === 277 || item.id === 485 || item.id === 514
        ? <div className="extended-media"><audio className="local-audio" src={localMedia.audio} controls onPlay={() => notify("Done: local sample audio playing")} onPause={() => notify("Done: local sample audio paused")} /><small>Local audio · media/Audio.wav</small></div>
        : item.id >= 265 && item.id <= 270 || item.id === 273 || item.id === 274
          ? <div className={`extended-image-demo ${open && item.id === 273 ? "lightbox-preview" : ""}`}><img src={localMedia.images[(item.id - 265) % localMedia.images.length]} alt={`Local sample image for ${item.title}`} loading="lazy" onClick={() => { if (item.id === 273 || item.id === 274) { setOpen(!open); notify(item.id === 273 ? `Done: image ${open ? "closed" : "enlarged"} inside this card` : "Done: image hotspot selected"); } }} /><span>{item.id === 274 ? "● Select image hotspot" : item.title}</span>{item.id === 273 && button(open ? "Close image preview" : "Enlarge image", () => { setOpen(!open); notify(`Done: image ${open ? "closed" : "enlarged"} inside this card`); })}</div>
          : <div className="extended-media">
            <div className={`extended-media-screen ${open ? "playing" : ""}`}><span>{item.id === 281 || item.id === 282 ? "Local embed preview" : "▶"}</span><small>{selected || "Sample media · local preview"}</small></div>
            <div>{button(open ? "Pause" : "Play", () => { setOpen(!open); notify(`Done: local preview ${open ? "paused" : "playing"}`); })}{button(item.id === 280 ? "Theater mode" : "Next", () => { setSelected(`Preview ${count + 1}`); setCount(count + 1); notify(`Done: ${item.title} preview changed`); })}</div>
          </div>;
  } else if (item.id >= 285 && item.id <= 292 || item.id === 484 || item.id === 509 || item.id === 510) {
    demo = <div className="extended-chart">
      <div className="extended-chart-bars">{[35, 66, value, 48, 78].map((height, index) => <button key={index} type="button" aria-label={`Select data point ${index + 1}`} style={{ height: `${height}%` }} onClick={() => { setSelected(`Point ${index + 1}`); notify(`Done: ${item.title} · point ${index + 1} selected`); }} />)}</div>
      <div className="extended-chart-foot"><span>{selected || "Select a data point"}</span>{button("Refresh data", primaryAction)}</div>
    </div>;
  } else if (item.id >= 301 && item.id <= 360 || item.id === 419 || item.id === 482 || item.id === 483 || item.id === 487 || item.id === 488) {
    demo = <div className="extended-overlay-demo">
      {button(open ? "Close preview" : `Open ${item.title}`, () => { setOpen(!open); notify(`Done: ${item.title} ${open ? "closed" : "opened"} inside this card`); })}
      {open && <div className="extended-overlay-panel" role="status">
        <b>{item.title}</b>
        <p>This is a local overlay preview. The page behind this card remains unchanged.</p>
        {item.id === 360 && <div>{["Spam", "Harassment", "Other"].map((reason) => button(reason, () => { setSelected(reason); notify(`Done: report reason selected · ${reason}`); }))}</div>}
        {item.id === 355 && <input aria-label="Type DELETE to confirm" value={text} onChange={(event) => setText(event.target.value)} placeholder="Type DELETE" />}
      </div>}
    </div>;
  } else if (item.id >= 361 && item.id <= 420 || item.id === 493 || item.id === 499 || item.id === 500 || item.id === 510) {
    demo = <div className="extended-list-demo">
      <div className="extended-data-table"><b>Item</b><b>Status</b>{["Alpha", "Bravo", "Charlie"].map((row, index) => <button type="button" className={selected === row ? "selected" : ""} key={row} onClick={() => { setSelected(row); notify(`Done: ${row} selected · ${index + 1} of 3`); }}><span>{row}</span><span>{index === 1 ? "In progress" : "Ready"}</span></button>)}</div>
      <div>{button("Add row", primaryAction)}{button("Clear selection", () => { setSelected(""); notify("Done: selection cleared"); })}</div>
    </div>;
  } else if (item.id >= 421 && item.id <= 515) {
    demo = <div className="extended-semantic-demo">
      <div className="extended-semantic-preview">
        {item.id <= 447 ? semanticNode :
          item.id >= 472 && item.id <= 478 ? <p>Sample text with <mark>highlight</mark>, <sub>sub</sub>, <sup>sup</sup>, <s>removed</s>, <ins>added</ins>, and <del>deleted</del> content.</p> :
          <><b>{item.title}</b><span>{selected || "Sample component preview"}</span></>}
      </div>
      {item.id >= 481 && item.id <= 515 && <input aria-label={`${item.title} sample input`} value={text} onChange={(event) => { setText(event.target.value); notify("Done: sample text updated"); }} placeholder="Type to update this preview" />}
      <div>{button("Update preview", primaryAction)}{button("Reset preview", () => { setSelected(""); setText(""); setValue(45); notify("Done: card preview reset"); })}</div>
    </div>;
  } else {
    demo = <div>{button(`Try ${item.title}`, primaryAction)}</div>;
  }

  return <article className="component-card extended-card" id={`component-${item.id}`}>
    <div className="card-topline"><span className="component-number">{item.id}</span><span className="component-status"><span /> INTERACTIVE</span></div>
    <h3>{item.title}</h3>
    <p className="card-description">{item.description}</p>
    <div className="extended-demo-area">{demo}</div>
    <div className="selection-feedback" role="status" aria-live="polite">{message}</div>
  </article>;
}

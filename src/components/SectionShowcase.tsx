import { useEffect, useState, type ReactNode } from "react";
import { allDemoItems, type DemoItem } from "../data/demoItems";

type Row = { id: number; name: string; owner: string; status: string; value: number };
type ShowcaseSection = "media" | "overlays" | "tables" | "semantic" | "loaders" | "broken-assets";

const initialRows: Row[] = [
  { id: 1, name: "Alpha launch", owner: "Ari", status: "Ready", value: 84 },
  { id: 2, name: "Beta review", owner: "Mina", status: "In progress", value: 62 },
  { id: 3, name: "Gamma update", owner: "Dev", status: "Review", value: 47 },
  { id: 4, name: "Delta report", owner: "Noah", status: "Ready", value: 93 },
  { id: 5, name: "Epsilon test", owner: "Lee", status: "Blocked", value: 25 },
];

function SuiteCard({ id, range, title, description, children, className = "" }: { id: number; range?: string; title: string; description: string; children: ReactNode; className?: string }) {
  return <article className={`component-card suite-card ${className}`} id={`component-${id}`}>
    <div className="card-topline"><span className="component-number">{range ?? id}</span><span className="component-status"><span /> INTERACTIVE</span></div>
    <h3>{title}</h3>
    <p className="card-description">{description}</p>
    <div className="suite-card-body">{children}</div>
  </article>;
}

function ScenarioPicker({ first, last, selected, onSelect }: { first: number; last: number; selected: number; onSelect: (item: DemoItem) => void }) {
  const scenarios = allDemoItems.filter((item) => item.id >= first && item.id <= last);
  return <label className="suite-scenario-picker">Test scenario
    <select aria-label={`Choose scenario from ${first} to ${last}`} value={selected || ""} onChange={(event) => {
      const scenario = scenarios.find((item) => item.id === Number(event.target.value));
      if (scenario) onSelect(scenario);
    }}>
      <option value="">Choose a scenario</option>
      {scenarios.map((scenario) => <option key={scenario.id} value={scenario.id}>{scenario.title}</option>)}
    </select>
  </label>;
}

function AlertWorkbench({ first, last }: { first: number; last: number }) {
  const [scenario, setScenario] = useState<DemoItem | null>(null);
  const [alerts, setAlerts] = useState([
    { id: 1, type: "Success", text: "Workspace synced successfully." },
    { id: 2, type: "Warning", text: "One item needs your review." },
  ]);
  const [toast, setToast] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [browserMessage, setBrowserMessage] = useState("");
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);
  const runScenario = (item: DemoItem) => {
    setScenario(item);
    setConfirmed(false);
    if (item.id === 314 || item.id === 315) {
      const type = item.id === 315 ? "Info" : "Success";
      setToast(item.title);
      setAlerts((current) => [{ id: Date.now(), type, text: `${item.title} triggered in this card.` }, ...current]);
    }
  };
  const showBrowserAlert = () => {
    window.alert("Lava TestLab browser alert: this is a native browser dialog.");
    setBrowserMessage("Browser alert was dismissed with OK.");
  };
  const showBrowserConfirmation = () => {
    const accepted = window.confirm("Lava TestLab browser confirmation\n\nChoose OK or Cancel to test the native browser dialog.");
    setConfirmed(accepted);
    setBrowserMessage(accepted ? "Browser confirmation accepted with OK." : "Browser confirmation dismissed with Cancel.");
  };
  const dismiss = (id: number) => setAlerts((current) => current.filter((alert) => alert.id !== id));
  return <div className="overlay-workbench">
    <h4>Choose a scenario to preview it</h4>
    <div className="browser-alert-actions">
      <button type="button" className="action-demo-button primary" onClick={showBrowserAlert}>Show browser alert</button>
      <button type="button" className="action-demo-button" onClick={showBrowserConfirmation}>Browser OK / Cancel</button>
      {browserMessage && <span role="status" aria-live="polite">{browserMessage}</span>}
    </div>
    <ScenarioPicker first={first} last={last} selected={scenario?.id ?? 0} onSelect={runScenario} />
    {scenario && <div className="suite-inline-panel" role={scenario.id === 306 ? "alertdialog" : scenario.id === 301 || scenario.id === 303 ? "dialog" : "region"} aria-labelledby={`scenario-title-${scenario.id}`} aria-describedby={`scenario-description-${scenario.id}`}>
      <div className="suite-inline-panel-heading"><b id={`scenario-title-${scenario.id}`}>{scenario.title}</b><button type="button" aria-label="Close scenario preview" onClick={() => setScenario(null)}>×</button></div>
      <p id={`scenario-description-${scenario.id}`}>{scenario.description} The preview stays inside this workbench.</p>
      {scenario.id === 306
        ? <div className="suite-actions"><span>Are you sure you want to continue?</span><button type="button" className="action-demo-button danger" onClick={() => { const accepted = window.confirm("Lava TestLab: Continue with this sample action?\n\nChoose OK to confirm or Cancel to dismiss."); setConfirmed(accepted); setToast(accepted ? "Browser confirmation accepted" : "Browser confirmation canceled"); }}>Open browser alert · OK / Cancel</button>{confirmed && <b role="status">Confirmed locally.</b>}</div>
        : scenario.id === 307
          ? <div className="suite-actions"><button type="button" className="action-demo-button primary" onClick={() => setConfirmed(true)}>Accept</button><button type="button" className="action-demo-button" onClick={() => setConfirmed(true)}>Reject</button>{confirmed && <b role="status">Preference saved in this preview.</b>}</div>
          : scenario.id === 328
            ? <div className="suite-actions"><b>Session expires in {confirmed ? "00:29" : "00:30"}</b><button type="button" className="action-demo-button" onClick={() => setConfirmed(!confirmed)}>Reset countdown</button></div>
            : scenario.id === 355
              ? <div className="suite-actions"><input aria-label="Type DELETE to confirm" placeholder="Type DELETE" onChange={(event) => setConfirmed(event.target.value === "DELETE")} /><button type="button" disabled={!confirmed} className="action-demo-button danger">Confirm deletion</button></div>
              : <div className={`suite-alert suite-alert-${scenario.id % 3 === 0 ? "warning" : "info"}`} role="status"><span><b>{scenario.title}</b>{confirmed ? "Action confirmed in this card." : "This alert or overlay is contained within this card."}</span><button type="button" onClick={() => setConfirmed(!confirmed)}>{confirmed ? "Undo" : "Try action"}</button></div>}
    </div>}
    {toast && <div className="suite-toast" role="status">{toast}<button type="button" aria-label="Dismiss toast" onClick={() => setToast("")}>×</button></div>}
    <div className="suite-alert-list">{alerts.map((alert) => <div className={`suite-alert suite-alert-${alert.type.toLowerCase()}`} role="status" key={alert.id}><span><b>{alert.type}</b>{alert.text}</span><button type="button" aria-label={`Dismiss ${alert.type} alert`} onClick={() => dismiss(alert.id)}>×</button></div>)}</div>
  </div>;
}

function TableWorkbench() {
  const [rows, setRows] = useState(initialRows);
  const [selected, setSelected] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [message, setMessage] = useState("Select or edit rows; changes stay in this table.");
  const [scenario, setScenario] = useState(0);
  const matchingRows = rows.filter((row) => `${row.name} ${row.owner} ${row.status}`.toLowerCase().includes(query.toLowerCase()));
  const sortedRows = [...matchingRows].sort((a, b) => sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  const toggleRow = (id: number) => setSelected((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]);
  const updateRow = (id: number, patch: Partial<Row>) => setRows((current) => current.map((row) => row.id === id ? { ...row, ...patch } : row));
  const visibleSelected = sortedRows.length > 0 && sortedRows.every((row) => selected.includes(row.id));
  const addRow = () => {
    const id = Math.max(0, ...rows.map((row) => row.id)) + 1;
    setRows((current) => [...current, { id, name: `New item ${id}`, owner: "You", status: "New", value: 0 }]);
    setMessage(`New item ${id} added.`);
  };
  const renderTable = (kind: "projects" | "metrics") => <div className="suite-table-wrap">
    <table className="suite-table">
      <caption>{kind === "projects" ? "Projects · select, sort, expand, and edit rows" : "Metrics · edit values, filter, and remove records"}</caption>
      <thead><tr>
        {kind === "projects" && <th scope="col"><label className="suite-select-all"><input type="checkbox" aria-label="Select all visible projects" checked={visibleSelected} onChange={() => setSelected((current) => visibleSelected ? current.filter((id) => !sortedRows.some((row) => row.id === id)) : [...new Set([...current, ...sortedRows.map((row) => row.id)])])} />Select</label></th>}
        <th scope="col"><button type="button" className="suite-sort" onClick={() => setSortAscending(!sortAscending)}>Name {sortAscending ? "↑" : "↓"}</button></th>
        <th scope="col">{kind === "metrics" ? "Value" : "Owner"}</th>
        <th scope="col">Status</th>
        <th scope="col">{kind === "metrics" ? "Actions" : "Details"}</th>
      </tr></thead>
      <tbody>{sortedRows.map((row) => <tr key={`${kind}-${row.id}`}>
        {kind === "projects" && <td><input aria-label={`Select ${row.name}`} type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleRow(row.id)} /></td>}
        <td>{kind === "metrics" ? row.name : <input aria-label={`Edit ${row.name}`} value={row.name} onChange={(event) => updateRow(row.id, { name: event.target.value })} />}</td>
        <td>{kind === "metrics" ? <input aria-label={`${row.name} metric value`} type="number" value={row.value} onChange={(event) => updateRow(row.id, { value: Number(event.target.value) })} /> : row.owner}</td>
        <td><select aria-label={`${row.name} status`} value={row.status} onChange={(event) => updateRow(row.id, { status: event.target.value })}><option>Ready</option><option>In progress</option><option>Review</option><option>Blocked</option><option>New</option><option>Reviewed</option></select></td>
        <td>{kind === "metrics"
          ? <button type="button" className="suite-row-action" onClick={() => { setRows((current) => current.filter((entry) => entry.id !== row.id)); setMessage(`${row.name} removed.`); }}>Remove</button>
          : <button type="button" className="suite-row-action" onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>{expandedRow === row.id ? "Hide" : "View"}</button>}</td>
      </tr>)}</tbody>
    </table>
    {kind === "projects" && expandedRow !== null && <div className="suite-row-detail"><b>{rows.find((row) => row.id === expandedRow)?.name}</b><span>Owner and status details · updated locally.</span></div>}
  </div>;
  return <div className="table-workbench">
    <ScenarioPicker first={361} last={376} selected={scenario} onSelect={(item) => { setScenario(item.id); setMessage(`${item.title} scenario selected. Try the matching table control below.`); }} />
    <div className="suite-table-toolbar">
      <label>Search rows <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, owner, or status" /></label>
      <button type="button" className="action-demo-button primary" onClick={addRow}>＋ Add row</button>
      <button type="button" className="action-demo-button" onClick={() => { setRows(initialRows); setSelected([]); setQuery(""); setMessage("Both tables have been reset."); }}>Reset tables</button>
    </div>
    {renderTable("projects")}
    {renderTable("metrics")}
    <div className="suite-actions">
      <button type="button" className="action-demo-button" disabled={!selected.length} onClick={() => { setRows((current) => current.map((row) => selected.includes(row.id) ? { ...row, status: "Reviewed" } : row)); setMessage(`${selected.length} row${selected.length === 1 ? "" : "s"} marked reviewed.`); }}>Mark selected reviewed ({selected.length})</button>
      <button type="button" className="action-demo-button danger" disabled={!selected.length} onClick={() => { setRows((current) => current.filter((row) => !selected.includes(row.id))); setMessage(`${selected.length} selected row${selected.length === 1 ? "" : "s"} deleted.`); setSelected([]); }}>Delete selected</button>
      <span role="status">{message}</span>
    </div>
  </div>;
}

function ListWorkbench() {
  const [tasks, setTasks] = useState(["Review form validation", "Check responsive layout", "Verify export action"]);
  const [checked, setChecked] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [task, setTask] = useState("");
  const [scenario, setScenario] = useState(0);
  const visible = tasks.filter((entry) => entry.toLowerCase().includes(query.toLowerCase()));
  const addTask = () => {
    if (!task.trim()) return;
    setTasks((current) => [...current, task.trim()]);
    setTask("");
  };
  return <div className="list-workbench">
    <ScenarioPicker first={377} last={382} selected={scenario} onSelect={(item) => setScenario(item.id)} />
    <div className="suite-table-toolbar"><input aria-label="Filter list" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter tasks" /><input aria-label="New list item" value={task} onChange={(event) => setTask(event.target.value)} placeholder="Add a list item" /><button type="button" className="action-demo-button primary" onClick={addTask}>Add</button></div>
    {scenario === 378 ? <ol className="suite-task-list suite-ordered-list">{visible.map((entry) => <li key={entry} className={checked.includes(entry) ? "done" : ""}><label><input type="checkbox" checked={checked.includes(entry)} onChange={() => setChecked((current) => current.includes(entry) ? current.filter((value) => value !== entry) : [...current, entry])} /><span>{entry}</span></label><button type="button" className="suite-row-action" onClick={() => setTasks((current) => current.filter((value) => value !== entry))}>Remove</button></li>)}</ol>
      : <ul className="suite-task-list">{visible.map((entry) => <li key={entry} className={checked.includes(entry) ? "done" : ""}><label><input type="checkbox" checked={checked.includes(entry)} onChange={() => setChecked((current) => current.includes(entry) ? current.filter((value) => value !== entry) : [...current, entry])} /><span>{entry}</span></label><button type="button" className="suite-row-action" onClick={() => setTasks((current) => current.filter((value) => value !== entry))}>Remove</button></li>)}</ul>}
    <dl className="suite-definition-list"><div><dt>{scenario ? allDemoItems.find((item) => item.id === scenario)?.title : "Definition list"}</dt><dd>{scenario === 380 ? "Definition term component preview." : scenario === 381 ? "Definition description component preview." : "Terms and descriptions rendered with semantic list markup."}</dd></div><div><dt>Selected tasks</dt><dd>{checked.length} of {tasks.length} complete</dd></div></dl>
  </div>;
}

function CardWorkbench() {
  const [active, setActive] = useState("Analytics");
  const [saved, setSaved] = useState<string[]>([]);
  const [scenario, setScenario] = useState(0);
  const cards = [
    { name: "Analytics", type: "Metric card", metric: "1,284", details: "Active events · +12.4%" },
    { name: "Product", type: "Product card", metric: "$48", details: "Sample item · 4.8 ★" },
    { name: "Article", type: "Article card", metric: "6 min", details: "Automation notes · updated today" },
  ];
  return <div className="card-workbench">
    <ScenarioPicker first={383} last={420} selected={scenario} onSelect={(item) => { setScenario(item.id); setActive(item.id >= 392 ? "Article" : item.id >= 391 ? "Product" : "Analytics"); }} />
    {scenario > 0 && <div className="suite-card-detail"><b>{allDemoItems.find((item) => item.id === scenario)?.title}</b> selected for the preview below.</div>}
    <div className="suite-card-previews">{cards.map((card) => <article className={`suite-preview-card ${active === card.name ? "active" : ""}`} key={card.name} onClick={() => setActive(card.name)}>
      <span className="suite-preview-card-type">{card.type}</span>
      <b>{card.name}</b>
      <strong>{card.metric}</strong>
      <span>{card.details}</span>
      <div><button type="button" className="action-demo-button" onClick={(event) => { event.stopPropagation(); setSaved((current) => current.includes(card.name) ? current.filter((value) => value !== card.name) : [...current, card.name]); }}>{saved.includes(card.name) ? "Saved" : "Save"}</button><button type="button" className="action-demo-button primary" onClick={(event) => { event.stopPropagation(); setActive(card.name); }}>Open</button></div>
    </article>)}</div>
    <div className="suite-card-detail" role="status"><b>{active} card selected.</b> Cards support selection, save toggles, and an in-card open state. {saved.length} saved.</div>
  </div>;
}

function MediaWorkbench() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [message, setMessage] = useState("Files are previewed locally; nothing is uploaded.");
  const [selectedImage, setSelectedImage] = useState(0);
  const [droppedFiles, setDroppedFiles] = useState<string[]>([]);
  return <div className="media-workbench">
    <SuiteCard id={241} title="File selection & upload checks" description="Focused automation coverage: single/multiple file selection, accepted file types, upload progress, and remove action.">
      <div className="media-file-control"><label className="action-demo-button primary">Choose image or PDF<input type="file" accept="image/*,.pdf" multiple onChange={(event) => { const files = Array.from(event.currentTarget.files ?? []); if (files.length) { setFileNames(files.map((file) => file.name)); setMessage(`${files.length} local file${files.length === 1 ? "" : "s"} selected.`); } }} /></label><span>{fileNames.length ? fileNames.join(", ") : "No file selected"}</span>{fileNames.length > 0 && <button type="button" className="action-demo-button" onClick={() => { setFileNames([]); setMessage("Selected files removed."); }}>Remove</button>}</div>
      <progress value={fileNames.length > 0 ? 100 : 0} max="100" /><div className="selection-feedback" role="status">{message}</div>
    </SuiteCard>
    <SuiteCard id={244} title="Drag-and-drop file upload" description="Drop one or more local files here or browse; verify drag-over, file names, and removal without uploading anything.">
      <div className="media-dropzone" onDragOver={(event) => { event.preventDefault(); event.currentTarget.classList.add("dragging"); }} onDragLeave={(event) => event.currentTarget.classList.remove("dragging")} onDrop={(event) => { event.preventDefault(); event.currentTarget.classList.remove("dragging"); const files = Array.from(event.dataTransfer.files).map((file) => file.name); if (files.length) { setDroppedFiles(files); setMessage(`${files.length} file${files.length === 1 ? "" : "s"} dropped locally.`); } }}>
        <span className="dropzone-icon">⇧</span><b>Drop files into this card</b><span>or choose files from your device</span>
        <label className="action-demo-button">Browse files<input type="file" multiple onChange={(event) => { const files = Array.from(event.currentTarget.files ?? []).map((file) => file.name); if (files.length) { setDroppedFiles(files); setMessage(`${files.length} file${files.length === 1 ? "" : "s"} selected locally.`); } }} /></label>
      </div>
      {droppedFiles.length > 0 && <div className="media-dropped-list">{droppedFiles.map((name) => <span key={name}>{name}</span>)}<button type="button" className="action-demo-button" onClick={() => { setDroppedFiles([]); setMessage("Dropped files removed."); }}>Clear files</button></div>}
      <div className="selection-feedback" role="status">{message}</div>
    </SuiteCard>
    <SuiteCard id={261} title="Embedded page (iframe)" description="Test iframe loading, title, sandbox boundaries, and a local preview without navigating away.">
      <iframe className="media-iframe" title="Lava TestLab local iframe demo" sandbox="allow-scripts" srcDoc={`<!doctype html><html><body style="margin:0;background:#111217;color:#e6d7fa;font:14px sans-serif;display:grid;place-items:center;height:100vh"><main><h2 style="margin:0 0 8px">Embedded demo</h2><p style="color:#aaa">This isolated iframe is running local sample content.</p></main></body></html>`} />
      <p className="media-iframe-caption">Sandboxed local iframe preview</p>
    </SuiteCard>
    <SuiteCard id={262} title="Native video & audio playback" description="Test play, pause, seek, duration, and media loading with the provided local samples.">
      <video className="local-video" src={new URL("../../media/media/Demo.mp4", import.meta.url).href} controls playsInline onPlay={() => setMessage("Video playback started.")} onPause={() => setMessage("Video playback paused.")} />
      <audio className="local-audio" src={new URL("../../media/media/Audio.wav", import.meta.url).href} controls onPlay={() => setMessage("Audio playback started.")} onPause={() => setMessage("Audio playback paused.")} />
      <div className="selection-feedback" role="status">{message}</div>
    </SuiteCard>
    <SuiteCard id={266} title="Image, alternative text & lightbox" description="Focused automation coverage: image loading, alt text, lazy loading, and an expandable preview contained in this card.">
      <div className="media-image-grid">{[1, 2, 3].map((number) => <button type="button" key={number} onClick={() => { setSelectedImage(number); setMessage(`Image${number}.png selected. Alt text: Local sample image ${number}.`); }}><img src={new URL(`../../media/Image${number}.png`, import.meta.url).href} alt={`Local sample image ${number}`} loading="lazy" /><span>Image {number} · select to test</span></button>)}</div>
      {selectedImage > 0 && <div className="media-selected-image"><img src={new URL(`../../media/Image${selectedImage}.png`, import.meta.url).href} alt={`Expanded local sample image ${selectedImage}`} /><button type="button" className="action-demo-button" onClick={() => setSelectedImage(0)}>Close image preview</button></div>}
      <div className="selection-feedback" role="status">{message}</div>
    </SuiteCard>
  </div>;
}

function SemanticWorkbench({ onLogout }: { onLogout: () => void }) {
  const [activePage, setActivePage] = useState("Overview");
  const [status, setStatus] = useState("Ready for interaction.");
  const [progressComplete, setProgressComplete] = useState(false);
  const [logoutConfirmed, setLogoutConfirmed] = useState(false);
  const pages = ["Overview", "Reports", "Settings"];

  return <div className="semantic-workbench">
    <SuiteCard id={421} title="Accessible page landmarks" description="Use semantic regions and keyboard-operable navigation to exercise page structure and active-state announcements." className="semantic-workbench-card">
      <header className="semantic-page-header"><b>Lava workspace</b><span>Automation demo</span></header>
      <nav className="semantic-page-nav" aria-label="Demo pages">
        {pages.map((page) => <button type="button" key={page} aria-current={activePage === page ? "page" : undefined} onClick={() => { setActivePage(page); setStatus(`${page} view selected.`); }}>{page}</button>)}
      </nav>
      <section className="semantic-page-content" aria-labelledby="semantic-active-page"><h4 id="semantic-active-page">{activePage}</h4><p>This section is grouped within the page structure and updates when a navigation choice is activated.</p><div className="semantic-status" role="status" aria-live="polite">{status}</div></section>
    </SuiteCard>
    <SuiteCard id={441} title="Live status & form semantics" description="Submit a required form, update an accessible progress value, and verify the in-card status announcement." className="semantic-workbench-card">
      <form className="semantic-demo-form" onSubmit={(event) => { event.preventDefault(); setStatus("Form submitted successfully."); }}>
        <label htmlFor="semantic-demo-name">Display name <span aria-hidden="true">*</span></label>
        <input id="semantic-demo-name" required minLength={2} placeholder="Enter at least 2 characters" />
        <button type="submit" className="action-demo-button primary">Submit form</button>
      </form>
      <label className="semantic-progress-label" htmlFor="semantic-progress">Progress <progress id="semantic-progress" value={progressComplete ? 100 : 64} max="100">{progressComplete ? 100 : 64}%</progress></label>
      <button type="button" className="action-demo-button" onClick={() => { setProgressComplete((value) => !value); setStatus(progressComplete ? "Progress returned to 64%." : "Progress completed at 100%."); }}>Toggle progress state</button>
      <p className="semantic-status" role="status" aria-live="polite">{status}</p>
    </SuiteCard>
    <SuiteCard id={515} title="Demo session logout" description="Exercise a real sign-out: clear the active demo session and return to the login screen." className="semantic-workbench-card semantic-logout-card">
      <div className="semantic-logout-panel">
        <span className="semantic-session-indicator"><i /> Demo session active</span>
        <p>Logging out ends this browser session. You can sign in again with any demo credential.</p>
        <label><input type="checkbox" checked={logoutConfirmed} onChange={(event) => setLogoutConfirmed(event.target.checked)} /> I’m ready to end this demo session.</label>
        <button type="button" className="action-demo-button danger" disabled={!logoutConfirmed} onClick={onLogout}>Log out</button>
      </div>
    </SuiteCard>
  </div>;
}

function LoaderWorkbench() {
  const [spinning, setSpinning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressRunning, setProgressRunning] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [blinking, setBlinking] = useState(false);
  const [status, setStatus] = useState("Ready to test loading states.");

  useEffect(() => {
    if (!spinning) return;
    const timer = window.setTimeout(() => {
      setSpinning(false);
      setStatus("Spinner demonstration completed.");
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [spinning]);

  useEffect(() => {
    if (!progressRunning) return;
    if (progress >= 100) {
      setProgressRunning(false);
      setStatus("Progress complete.");
      return;
    }
    const timer = window.setTimeout(() => setProgress((value) => Math.min(value + 5, 100)), 120);
    return () => window.clearTimeout(timer);
  }, [progress, progressRunning]);

  return <div className="loader-workbench">
    <SuiteCard id={528} title="Animated spinners" description="Start an animated busy indicator, then let it complete or stop it early." className="loader-demo-card">
      <div className="loader-demo-preview" aria-live="polite">
        {spinning ? <><span className="testlab-spinner" role="status" aria-label="Loading" /><span>Loading demo data…</span></> : <span>Spinner is idle.</span>}
      </div>
      <div className="suite-actions">
        <button type="button" className="action-demo-button primary" disabled={spinning} onClick={() => { setSpinning(true); setStatus("Spinner started."); }}>Start spinner</button>
        <button type="button" className="action-demo-button" disabled={!spinning} onClick={() => { setSpinning(false); setStatus("Spinner stopped."); }}>Stop</button>
      </div>
    </SuiteCard>
    <SuiteCard id={529} title="Progress indicator" description="Run, pause, and reset a timed progress bar with an announced percentage." className="loader-demo-card">
      <div className="loader-progress-preview">
        <div className="loader-progress-label"><span>{progressRunning ? "Processing" : progress === 100 ? "Complete" : "Waiting"}</span><b>{progress}%</b></div>
        <progress value={progress} max="100" aria-label={`Loading progress ${progress}%`} />
      </div>
      <div className="suite-actions">
        <button type="button" className="action-demo-button primary" disabled={progressRunning} onClick={() => { if (progress === 100) setProgress(0); setProgressRunning(true); setStatus("Progress started."); }}>{progress === 100 ? "Run again" : "Start"}</button>
        <button type="button" className="action-demo-button" disabled={!progressRunning} onClick={() => { setProgressRunning(false); setStatus("Progress paused."); }}>Pause</button>
        <button type="button" className="action-demo-button" onClick={() => { setProgressRunning(false); setProgress(0); setStatus("Progress reset."); }}>Reset</button>
      </div>
    </SuiteCard>
    <SuiteCard id={530} title="Skeleton loading state" description="Toggle a shimmer placeholder to compare a loading layout with its resolved content." className="loader-demo-card loader-skeleton-card">
      {skeletonLoading
        ? <div className="loader-skeleton-preview" role="status" aria-label="Loading content">
          <span className="skeleton-avatar" /><div><i /><i /><i /></div>
        </div>
        : <div className="loader-loaded-preview"><b>Demo content loaded</b><span>Title, description, and profile details are ready.</span></div>}
      <button type="button" className="action-demo-button primary" onClick={() => { setSkeletonLoading((value) => !value); setStatus(skeletonLoading ? "Skeleton replaced by loaded content." : "Skeleton loading state shown."); }}>{skeletonLoading ? "Show loaded content" : "Show skeleton"}</button>
    </SuiteCard>
    <SuiteCard id={531} title="Blinking loading text" description="Toggle a blinking status message to test animated text loading feedback." className="loader-demo-card">
      <div className="loader-blink-preview" aria-live="polite">
        <span className={blinking ? "is-blinking" : ""}>{blinking ? "Processing request…" : "Text animation is paused."}</span>
      </div>
      <button type="button" className="action-demo-button primary" onClick={() => { setBlinking((value) => !value); setStatus(blinking ? "Blinking text stopped." : "Blinking text started."); }}>{blinking ? "Stop blinking text" : "Start blinking text"}</button>
    </SuiteCard>
    <p className="loader-workbench-status" role="status" aria-live="polite">{status}</p>
  </div>;
}

function BrokenAssetsWorkbench() {
  const [linkResults, setLinkResults] = useState<Record<string, boolean>>({});
  const [imageFailed, setImageFailed] = useState(false);
  const destinations = [
    { label: "Dashboard home", href: "#top" },
    { label: "Missing help section", href: "#missing-help-section" },
    { label: "Missing support section", href: "#missing-support-section" },
  ];
  const checkLinks = () => setLinkResults(Object.fromEntries(destinations.map(({ href }) => [
    href,
    href.startsWith("#") && Boolean(document.getElementById(decodeURIComponent(href.slice(1)))),
  ])));

  return <div className="broken-assets-workbench">
    <SuiteCard id={532} title="Broken link checker" description="Check whether sample in-page links point to elements that exist on this page. The missing targets are intentional test cases." className="broken-assets-card">
      <div className="broken-link-list">
        {destinations.map((destination) => <div className="broken-link-row" key={destination.href}>
          <span className={`broken-link-indicator ${destination.href in linkResults ? linkResults[destination.href] ? "is-healthy" : "is-broken" : ""}`} aria-hidden="true" />
          <a className="broken-link-copy" href={destination.href}><b>{destination.label}</b><code>{destination.href}</code></a>
          <span className="broken-link-result">{destination.href in linkResults ? linkResults[destination.href] ? "Working" : "Broken" : "Not checked"}</span>
        </div>)}
      </div>
      <button type="button" className="action-demo-button primary" onClick={checkLinks}>Check sample links</button>
      {Object.keys(linkResults).length > 0 && <p className="broken-assets-status" role="status" aria-live="polite">Check complete: {Object.values(linkResults).filter((isWorking) => !isWorking).length} broken links found.</p>}
    </SuiteCard>
    <SuiteCard id={533} title="Broken image fallback" description="Load an intentionally missing image and show a clear, accessible replacement when it fails." className="broken-assets-card">
      <div className={`broken-image-preview ${imageFailed ? "image-failed" : ""}`}>
        {imageFailed
          ? <div className="broken-image-message" role="status" aria-live="polite"><span aria-hidden="true">▧</span><b>Image unavailable</b><small>The image could not be loaded. Try again to retry.</small></div>
          : <img src="/media/missing-demo-image.png" alt="Sample image that intentionally does not exist" onError={() => setImageFailed(true)} />}
      </div>
      <div className="suite-actions">
        <button type="button" className="action-demo-button primary" onClick={() => setImageFailed(false)}>Retry image</button>
        {imageFailed && <span className="broken-assets-status" role="status">Image load failed; fallback shown.</span>}
      </div>
    </SuiteCard>
  </div>;
}

export function SectionShowcase({ section, onLogout }: { section: ShowcaseSection; onLogout: () => void }) {
  if (section === "media") return <div className="suite-showcase suite-showcase-media"><MediaWorkbench /></div>;
  if (section === "semantic") return <SemanticWorkbench onLogout={onLogout} />;
  if (section === "loaders") return <LoaderWorkbench />;
  if (section === "broken-assets") return <BrokenAssetsWorkbench />;
  if (section === "tables") return <div className="suite-showcase">
    <SuiteCard id={361} title="Tables & automation actions" description="Two full-width tables cover sorting, filtering, row selection, inline edits, expansion, bulk actions, add, delete, and reset." className="suite-card-wide">
      <TableWorkbench />
    </SuiteCard>
    <SuiteCard id={377} title="Lists & completion tracking" description="Search and filter a task list, add or remove items, check completion, and inspect a definition list.">
      <ListWorkbench />
    </SuiteCard>
    <SuiteCard id={383} title="Cards & layout patterns" description="Switch between metric, product, and article cards; save cards and open their local detail state.">
      <CardWorkbench />
    </SuiteCard>
  </div>;
  return <div className="suite-showcase">
    <SuiteCard id={301} title="Overlays & notifications playground" description="Explore dialog, toast, banner, permission, and confirmation patterns together in one interactive workbench." className="suite-card-wide">
      <AlertWorkbench first={301} last={360} />
    </SuiteCard>
  </div>;
}

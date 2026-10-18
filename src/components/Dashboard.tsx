import { useEffect, useMemo, useState } from "react";
import { allDemoItems, groups } from "../data/demoItems";
import { ComponentCard } from "./FormInputCard";
import { Icon } from "./Icon";
import { SelectionCard } from "./SelectionCard";
import { RangeSliderCard } from "./RangeSliderCard";
import { ActionCard } from "./ActionCard";
import { ExtendedDemoCard } from "./ExtendedDemoCard";
import { SectionShowcase } from "./SectionShowcase";
import { LiveDashboardCard } from "./LiveDashboardCard";

function loadDashboardView() {
  const stored = sessionStorage.getItem("lava-dashboard-view");
  if (!stored) return { activeSection: 1, activeGroup: "All components", query: "" };
  try {
    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object") return { activeSection: 1, activeGroup: "All components", query: "" };
    const view = parsed as Record<string, unknown>;
    const sectionIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return {
      activeSection: typeof view.activeSection === "number" && sectionIds.includes(view.activeSection) ? view.activeSection : 1,
      activeGroup: typeof view.activeGroup === "string" && groups.includes(view.activeGroup) ? view.activeGroup : "All components",
      query: typeof view.query === "string" ? view.query : "",
    };
  } catch {
    return { activeSection: 1, activeGroup: "All components", query: "" };
  }
}

export function Dashboard({ username, onLogout, onPrivacy }: { username: string; onLogout: () => void; onPrivacy: () => void }) {
  const [initialView] = useState(loadDashboardView);
  const [activeGroup, setActiveGroup] = useState(initialView.activeGroup);
  const [activeSection, setActiveSection] = useState(initialView.activeSection);
  const [query, setQuery] = useState(initialView.query);
  const [resetCounter, setResetCounter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    sessionStorage.setItem("lava-dashboard-view", JSON.stringify({ activeSection, activeGroup, query }));
  }, [activeGroup, activeSection, query]);
  const sections = [
    { id: 1, name: "Form inputs", range: "01—60", firstId: 1, lastId: 60 },
    { id: 2, name: "Selection & choices", range: "61—120", firstId: 61, lastId: 120 },
    { id: 3, name: "Value sliders & ranges", range: "121—180", firstId: 121, lastId: 180 },
    { id: 4, name: "Clickable controls & actions", range: "181—240", firstId: 181, lastId: 240 },
    { id: 5, name: "File, media & graphics", range: "241—300", firstId: 241, lastId: 300 },
    { id: 6, name: "Overlays & notifications", range: "301—360", firstId: 301, lastId: 360 },
    { id: 7, name: "Tables, lists & cards", range: "361—420", firstId: 361, lastId: 420 },
    { id: 8, name: "Semantic structure & status", range: "421—515", firstId: 421, lastId: 515 },
    { id: 9, name: "Live charts & dashboards", range: "516—527", firstId: 516, lastId: 527 },
    { id: 10, name: "Loaders & spinners", range: "528—531", firstId: 528, lastId: 531 },
    { id: 11, name: "Broken links & images", range: "532—533", firstId: 532, lastId: 533 },
  ];
  const currentSection = sections.find((section) => section.id === activeSection);
  const filteredItems = useMemo(() => allDemoItems.filter((item) => {
    const matchesSection = activeSection === 0 || (item.id >= (currentSection?.firstId ?? 1) && item.id <= (currentSection?.lastId ?? 515));
    const matchesGroup = activeGroup === "All components" || item.group === activeGroup;
    const matchesQuery = `${item.title} ${item.description} ${item.id}`.toLowerCase().includes(query.toLowerCase());
    return matchesSection && matchesGroup && matchesQuery;
  }), [activeGroup, activeSection, currentSection, query]);
  const sectionName = currentSection?.name ?? "All components";
  const setSection = (section: number) => {
    setActiveSection(section);
    setActiveGroup("All components");
    setQuery("");
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };
  return <div className="dashboard">
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <a className="sidebar-brand" href="#top" aria-label="Lava TestLab home"><span className="brand-mark"><Icon name="flame" size={21} /></span><span>LAVA <b>TESTLAB</b></span></a>
      <div className="sidebar-section-label">WORKSPACE</div>
      <button className="sidebar-link current"><Icon name="grid" size={17} /> Component lab</button>
      <button className={`sidebar-link ${activeSection === 0 ? "selected" : ""}`} onClick={() => { setActiveGroup("All components"); setActiveSection(0); setQuery(""); }}><Icon name="layers" size={17} /> All components</button>
      <div className="sidebar-section-label section-label-spaced">COMPONENTS</div>
      <nav className="group-nav" aria-label="Component categories">
        {groups.slice(1).map((group) => <button key={group} className={`sidebar-link ${activeGroup === group ? "selected" : ""}`} onClick={() => { setActiveGroup(group); setActiveSection(sections.find((section) => section.name === group)?.id ?? 1); setSidebarOpen(false); }}><span className="nav-indicator" />{group}</button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-note"><div className="note-icon"><Icon name="spark" size={16} /></div><b>Built to be tested.</b><p>Every field is interactive. Go ahead and break things.</p></div>
        <div className="profile-button"><span className="profile-avatar"><img src="/profile.jpg" alt="" /></span><span className="profile-copy"><b>{username.split("@")[0]}</b><small>Demo workspace</small></span></div>
        <button className="sidebar-logout-button" type="button" onClick={() => { setSidebarOpen(false); onLogout(); }}><Icon name="logout" size={17} /><span>Log out</span></button>
      </div>
    </aside>
    {sidebarOpen && <button className="sidebar-backdrop" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}
    <main className="main-panel" id="top">
      <header className="topbar">
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setSidebarOpen(true)}><Icon name="menu" /></button>
        <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{sectionName}</strong></div>
        <div className="topbar-right"><a className="store-demo-link" href="/storefront"><Icon name="cart" size={15} /><span>Shopping cart demo</span></a><img className="topbar-avatar topbar-profile-image" src="/profile.jpg" alt="Lava Kumar profile" /></div>
      </header>
      <nav className="section-menu" aria-label="TestLab sections">
        <button type="button" className="section-nav-step" disabled={activeSection === 0 || activeSection === 1} aria-label="Previous section" onClick={() => setSection(activeSection - 1)}>‹</button>
        <label className="section-select-wrap"><span>Section</span><select aria-label="Choose TestLab section" value={activeSection} onChange={(event) => setSection(Number(event.target.value))}>
          <option value={0}>All components</option>
          {sections.map((section) => <option key={section.id} value={section.id}>{section.name}</option>)}
        </select></label>
        <button type="button" className="section-nav-step" disabled={activeSection === 0 || activeSection === sections.length} aria-label="Next section" onClick={() => setSection(activeSection + 1)}>›</button>
        <button type="button" className={`section-menu-all ${activeSection === 0 ? "active" : ""}`} onClick={() => setSection(0)}><Icon name="grid" size={14} /><span>All components</span></button>
      </nav>
      <section className="page-content">
        <div className="hero-row">
          <div>
            <div className="page-eyebrow"><span className="eyebrow-bar" /> {activeSection === 0 ? "COMPONENT LIBRARY" : `${sectionName.toUpperCase()} COMPONENTS`}</div>
            <h1>{activeGroup !== "All components" ? activeGroup : sectionName}<span className="title-period">.</span></h1>
            <p className="page-intro">{activeSection === 0 ? "A hands-on playground for interactive web components." : `A hands-on playground for ${sectionName.toLowerCase()}.`}</p>
          </div>
          <button className="reset-button" onClick={() => { localStorage.removeItem("lava-demo-draft"); setResetCounter((count) => count + 1); }}><span>↻</span> Reset fields</button>
        </div>
        <div className="stats-row">
          <div className="stat-card"><span className="stat-icon stat-icon-orange"><Icon name="flame" size={17} /></span><div><b>{groups.length - 1}</b><span>TEST CATEGORIES</span></div></div>
          <div className="stat-card"><span className="stat-icon stat-icon-green"><Icon name="check" size={17} /></span><div><b>100%</b><span>READY TO EXPLORE</span></div></div>
          <div className="stats-caption"><span className="live-dot" /> All components are running locally</div>
        </div>
        <div className="catalog-toolbar">
          <div className="catalog-heading"><h2>{activeGroup === "All components" ? `Explore ${activeSection === 0 ? "all components" : sectionName.toLowerCase()}` : activeGroup}</h2><p>{activeSection === 1 ? "Enter a value, submit to validate, or reset to start over." : "Try each control and see its state or action update."}</p></div>
          <label className="catalog-search"><Icon name="search" size={17} /><input type="search" placeholder="Find a component…" value={query} onChange={(e) => setQuery(e.target.value)} /><kbd>⌘ K</kbd></label>
        </div>
        {activeSection === 5 && !query.trim() ? <SectionShowcase key={resetCounter} section="media" onLogout={onLogout} /> : activeSection === 6 && !query.trim() ? <SectionShowcase key={resetCounter} section="overlays" onLogout={onLogout} /> : activeSection === 7 && !query.trim() ? <SectionShowcase key={resetCounter} section="tables" onLogout={onLogout} /> : activeSection === 8 && !query.trim() ? <SectionShowcase key={resetCounter} section="semantic" onLogout={onLogout} /> : activeSection === 9 && !query.trim() && filteredItems[0] ? <div className="component-grid"><LiveDashboardCard item={filteredItems[0]} /></div> : (activeSection === 10 || activeSection === 11) && !query.trim() ? <SectionShowcase key={resetCounter} section={activeSection === 10 ? "loaders" : "broken-assets"} onLogout={onLogout} /> : filteredItems.length ? <div className="component-grid">{filteredItems.map((item) => item.id <= 60 ? <ComponentCard item={item} key={`${resetCounter}-${item.id}`} /> : item.id <= 120 ? <SelectionCard item={item} key={`${resetCounter}-${item.id}`} /> : item.id <= 180 ? <RangeSliderCard item={item} key={`${resetCounter}-${item.id}`} /> : item.id <= 240 ? <ActionCard item={item} key={`${resetCounter}-${item.id}`} /> : <ExtendedDemoCard item={item} onLogout={onLogout} key={`${resetCounter}-${item.id}`} />)}</div> : <div className="empty-state"><span><Icon name="search" size={20} /></span><b>No components found</b><p>Try another search or category.</p><button onClick={() => { setQuery(""); setActiveGroup("All components"); }}>Clear filters</button></div>}
        <footer className="page-footer site-footer">
          <div className="footer-brand"><img src="/profile.jpg" alt="Lava Kumar" /><span><b>Lava TestLab</b><small>Developed by Lava Kumar</small></span></div>
          <nav className="footer-links" aria-label="Footer links">
            <button type="button" onClick={onPrivacy}>Privacy policy</button>
            <a href="https://github.com/lavakumartetali" target="_blank" rel="noreferrer">GitHub · Lava Kumar Reddy Tetali</a>
            <a href="https://www.linkedin.com/in/lava-kumar-reddy-tetali-30829b1a1" target="_blank" rel="noreferrer">LinkedIn</a>
          </nav>
          <small className="footer-copyright">© {new Date().getFullYear()}–{new Date().getFullYear() + 1} Lava Kumar. All rights reserved.</small>
        </footer>
      </section>
    </main>
  </div>;
}

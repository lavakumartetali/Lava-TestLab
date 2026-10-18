import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { DemoItem } from "../data/demoItems";

type DashboardRecord = {
  id: number;
  date: string;
  label: string;
  channel: string;
  revenue: number;
  visits: number;
  conversion: number;
};
type NumericField = "revenue" | "visits" | "conversion";

const channels = ["Organic", "Campaigns", "Direct"];
const localDate = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
const initialRecords: DashboardRecord[] = [
  { id: 1, date: localDate(7), label: "Mon", channel: "Organic", revenue: 920, visits: 184, conversion: 2.7 },
  { id: 2, date: localDate(6), label: "Tue", channel: "Campaigns", revenue: 1140, visits: 226, conversion: 3.1 },
  { id: 3, date: localDate(5), label: "Wed", channel: "Direct", revenue: 860, visits: 163, conversion: 2.4 },
  { id: 4, date: localDate(4), label: "Thu", channel: "Organic", revenue: 1370, visits: 249, conversion: 3.6 },
  { id: 5, date: localDate(3), label: "Fri", channel: "Campaigns", revenue: 1220, visits: 218, conversion: 3.2 },
  { id: 6, date: localDate(2), label: "Sat", channel: "Direct", revenue: 1580, visits: 286, conversion: 4.1 },
  { id: 7, date: localDate(1), label: "Sun", channel: "Organic", revenue: 1460, visits: 271, conversion: 3.8 },
  { id: 8, date: localDate(), label: "Today", channel: "Campaigns", revenue: 1710, visits: 312, conversion: 4.4 },
];
const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
const timestamp = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

function makeLinePath(values: number[]) {
  if (!values.length) return "";
  const low = Math.min(...values);
  const high = Math.max(...values);
  const range = Math.max(high - low, 1);
  return values.map((value, index) => {
    const x = values.length === 1 ? 300 : 28 + (index * 544) / (values.length - 1);
    const y = 154 - ((value - low) / range) * 120;
    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");
}

export function LiveDashboardCard({ item }: { item: DemoItem }) {
  const [records, setRecords] = useState(initialRecords);
  const [numericDrafts, setNumericDrafts] = useState<Record<string, string>>({});
  const [period, setPeriod] = useState("7");
  const [channel, setChannel] = useState("All channels");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [label, setLabel] = useState("New campaign");
  const [date, setDate] = useState(localDate());
  const [newChannel, setNewChannel] = useState(channels[0]);
  const [revenue, setRevenue] = useState("1250");
  const [visits, setVisits] = useState("240");
  const [conversion, setConversion] = useState("3.5");
  const [message, setMessage] = useState("Edit a record or add data to update every chart and KPI.");
  const [lastUpdated, setLastUpdated] = useState("Just now");

  const visibleRecords = useMemo(() => {
    const count = Number(period);
    return records.slice(-count)
      .filter((record) => channel === "All channels" || record.channel === channel)
      .sort((first, second) => first.date.localeCompare(second.date));
  }, [channel, period, records]);
  const totals = visibleRecords.reduce((sum, record) => ({
    revenue: sum.revenue + record.revenue,
    visits: sum.visits + record.visits,
    conversionVisits: sum.conversionVisits + record.conversion * record.visits,
  }), { revenue: 0, visits: 0, conversionVisits: 0 });
  const averageConversion = totals.visits ? totals.conversionVisits / totals.visits : 0;
  const revenuePath = makeLinePath(visibleRecords.map((record) => record.revenue));
  const conversionPath = makeLinePath(visibleRecords.map((record) => record.conversion));
  const maxVisits = Math.max(1, ...visibleRecords.map((record) => record.visits));
  const maxRevenue = Math.max(1, ...visibleRecords.map((record) => record.revenue));

  const updateRecord = (id: number, patch: Partial<DashboardRecord>) => {
    setRecords((current) => current.map((record) => record.id === id ? { ...record, ...patch } : record));
    setLastUpdated(timestamp());
    setMessage("Record updated. Dashboard metrics and charts recalculated.");
  };
  const updateNumericField = (record: DashboardRecord, field: NumericField, rawValue: string) => {
    const value = rawValue.replace(/^(-?)0+(?=\d)/, "$1");
    const key = `${record.id}:${field}`;
    setNumericDrafts((current) => ({ ...current, [key]: value }));
    const numericValue = Number(value);
    updateRecord(record.id, {
      [field]: value === "" || !Number.isFinite(numericValue)
        ? 0
        : field === "conversion" ? Math.min(100, Math.max(0, numericValue)) : Math.max(0, numericValue),
    });
  };
  const commitNumericField = (record: DashboardRecord, field: NumericField) => {
    const key = `${record.id}:${field}`;
    setNumericDrafts((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };
  const addRecord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedRevenue = Number(revenue);
    const parsedVisits = Number(visits);
    const parsedConversion = Number(conversion);
    if (!label.trim() || !Number.isFinite(parsedRevenue) || parsedRevenue < 0 ||
      !Number.isInteger(parsedVisits) || parsedVisits < 0 ||
      !Number.isFinite(parsedConversion) || parsedConversion < 0 || parsedConversion > 100) {
      setMessage("Check the fields: name is required, revenue and visits must be non-negative, and conversion must be 0–100%.");
      return;
    }
    const record: DashboardRecord = {
      id: Date.now(),
      date,
      label: label.trim(),
      channel: newChannel,
      revenue: parsedRevenue,
      visits: parsedVisits,
      conversion: parsedConversion,
    };
    setRecords((current) => [...current, record]);
    setChannel("All channels");
    setPeriod("90");
    setLastUpdated(timestamp());
    setMessage(`${record.label} added. KPIs and all charts now include the new data.`);
    setLabel("");
  };
  const addGeneratedRecord = () => {
    setRecords((current) => {
      const index = current.length + 1;
      const next: DashboardRecord = {
        id: Date.now(),
        date: localDate(),
        label: `Update ${index}`,
        channel: channels[index % channels.length],
        revenue: 650 + ((index * 317) % 1900),
        visits: 90 + ((index * 43) % 360),
        conversion: Number((1.5 + ((index * 7) % 38) / 10).toFixed(1)),
      };
      return [...current, next];
    });
    setLastUpdated(timestamp());
    setMessage("A new sample record was added to the dashboard.");
  };
  const addVisibleSample = () => {
    setChannel("All channels");
    setPeriod("90");
    addGeneratedRecord();
  };

  useEffect(() => {
    if (!autoRefresh) return;
    const timer = window.setInterval(addGeneratedRecord, 5000);
    return () => window.clearInterval(timer);
  }, [autoRefresh]);

  const exportCsv = () => {
    const lines = [
      ["Date", "Name", "Channel", "Revenue", "Visits", "Conversion %"].join(","),
      ...visibleRecords.map((record) => [record.date, `"${record.label.replace(/"/g, '""')}"`, record.channel, record.revenue, record.visits, record.conversion].join(",")),
    ];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "lava-dashboard-data.csv";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("The visible dashboard data was exported as CSV.");
  };

  return <article className="component-card live-dashboard-card" id={`component-${item.id}`}>
    <div className="card-topline"><span className="component-number">{item.id}</span><span className="component-status"><span /> LIVE PREVIEW</span></div>
    <div className="live-dashboard-heading"><div><h3>{item.title}</h3><p className="card-description">{item.description}</p></div><span className="dashboard-updated">Updated {lastUpdated}</span></div>

    <div className="dashboard-controls">
      <label>Period<select value={period} onChange={(event) => setPeriod(event.target.value)}><option value="7">Latest 7 records</option><option value="30">Latest 30 records</option><option value="90">Latest 90 records</option></select></label>
      <label>Channel<select value={channel} onChange={(event) => setChannel(event.target.value)}><option>All channels</option>{channels.map((name) => <option key={name}>{name}</option>)}</select></label>
      <button type="button" className="action-demo-button primary" onClick={addVisibleSample}>＋ Add sample data</button>
      <label className="dashboard-auto-refresh"><input type="checkbox" checked={autoRefresh} onChange={(event) => setAutoRefresh(event.target.checked)} /> Auto-refresh</label>
      <button type="button" className="action-demo-button" onClick={exportCsv}>Export CSV</button>
    </div>

    <form className="dashboard-data-form" onSubmit={addRecord}>
      <h4>Add dashboard data</h4>
      <label>Name<input required maxLength={40} value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Campaign or day label" /></label>
      <label>Date<input required type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
      <label>Channel<select value={newChannel} onChange={(event) => setNewChannel(event.target.value)}>{channels.map((name) => <option key={name}>{name}</option>)}</select></label>
      <label>Revenue ($)<input required type="number" min="0" step="0.01" value={revenue} onChange={(event) => setRevenue(event.target.value)} /></label>
      <label>Visits<input required type="number" min="0" step="1" value={visits} onChange={(event) => setVisits(event.target.value)} /></label>
      <label>Conversion (%)<input required type="number" min="0" max="100" step="0.1" value={conversion} onChange={(event) => setConversion(event.target.value)} /></label>
      <button type="submit" className="action-demo-button primary">Add record</button>
    </form>

    <div className="dashboard-metrics">
      <div><span>Revenue</span><b>{formatCurrency(totals.revenue)}</b><small>{visibleRecords.length} records in view</small></div>
      <div><span>Visits</span><b>{totals.visits.toLocaleString()}</b><small>Across selected records</small></div>
      <div><span>Avg. conversion</span><b>{averageConversion.toFixed(1)}%</b><small>Weighted by visits</small></div>
      <div><span>Data records</span><b>{visibleRecords.length}</b><small>{autoRefresh ? "Live updates on" : "Updates on edit"}</small></div>
    </div>

    <div className="dashboard-charts">
      <section className="dashboard-chart-panel dashboard-line-panel">
        <h4>Revenue & conversion trend · {visibleRecords.length} points</h4>
        {visibleRecords.length
          ? <svg viewBox="0 0 600 180" role="img" aria-label="Revenue and conversion trend charts">
            {[30, 70, 110, 150].map((y) => <line className="dashboard-grid-line" key={y} x1="24" x2="576" y1={y} y2={y} />)}
            <path className="dashboard-revenue-line" d={revenuePath} />
            <path className="dashboard-conversion-line" d={conversionPath} />
            {visibleRecords.map((record, index) => {
              const x = visibleRecords.length === 1 ? 300 : 28 + (index * 544) / (visibleRecords.length - 1);
              const low = Math.min(...visibleRecords.map((entry) => entry.revenue));
              const range = Math.max(1, Math.max(...visibleRecords.map((entry) => entry.revenue)) - low);
              const dateLabel = new Date(`${record.date}T00:00:00`).toLocaleDateString([], { month: "short", day: "numeric" });
              return <g key={record.id}><title>{record.label} · {dateLabel} · {formatCurrency(record.revenue)}</title><circle className="dashboard-revenue-point" cx={x} cy={154 - ((record.revenue - low) / range) * 120} r="3.5" /><text x={x} y="174" textAnchor="middle">{dateLabel}</text></g>;
            })}
          </svg>
          : <div className="dashboard-empty-chart">No records match this channel. Choose another filter or add data.</div>}
        <div className="dashboard-chart-legend"><span className="legend-revenue">Revenue (left scale)</span><span className="legend-conversion">Conversion (independently scaled)</span></div>
      </section>
      <section className="dashboard-chart-panel">
        <h4>Visits by record</h4>
        <div className="dashboard-bars">{visibleRecords.length ? visibleRecords.map((record) => <div key={record.id} title={`${record.label}: ${record.visits} visits`}><i style={{ height: `${Math.max(4, (record.visits / maxVisits) * 100)}%` }} /><small>{record.label.slice(0, 8)}</small></div>) : <p className="dashboard-empty-chart">No data</p>}</div>
      </section>
      <section className="dashboard-chart-panel">
        <h4>Revenue by record</h4>
        <div className="dashboard-bars dashboard-revenue-bars">{visibleRecords.length ? visibleRecords.map((record) => <div key={record.id} title={`${record.label}: ${formatCurrency(record.revenue)}`}><i style={{ height: `${Math.max(4, (record.revenue / maxRevenue) * 100)}%` }} /><small>{record.label.slice(0, 8)}</small></div>) : <p className="dashboard-empty-chart">No data</p>}</div>
      </section>
    </div>

    <section className="dashboard-records">
      <div className="dashboard-records-heading"><h4>Dashboard data</h4><span>Edit values or remove a row; charts update immediately.</span></div>
      <div className="dashboard-records-scroll"><table>
        <thead><tr><th scope="col">Name</th><th scope="col">Date</th><th scope="col">Channel</th><th scope="col">Revenue ($)</th><th scope="col">Visits</th><th scope="col">Conversion (%)</th><th scope="col">Action</th></tr></thead>
        <tbody>{visibleRecords.map((record) => <tr key={record.id}>
          <td><input aria-label={`${record.label} name`} value={record.label} maxLength={40} onChange={(event) => updateRecord(record.id, { label: event.target.value })} /></td>
          <td><input aria-label={`${record.label} date`} type="date" value={record.date} onChange={(event) => updateRecord(record.id, { date: event.target.value })} /></td>
          <td><select aria-label={`${record.label} channel`} value={record.channel} onChange={(event) => updateRecord(record.id, { channel: event.target.value })}>{channels.map((name) => <option key={name}>{name}</option>)}</select></td>
          <td><input aria-label={`${record.label} revenue`} type="number" min="0" step="0.01" value={numericDrafts[`${record.id}:revenue`] ?? String(record.revenue)} onChange={(event) => updateNumericField(record, "revenue", event.target.value)} onBlur={() => commitNumericField(record, "revenue")} /></td>
          <td><input aria-label={`${record.label} visits`} type="number" min="0" step="1" value={numericDrafts[`${record.id}:visits`] ?? String(record.visits)} onChange={(event) => updateNumericField(record, "visits", event.target.value)} onBlur={() => commitNumericField(record, "visits")} /></td>
          <td><input aria-label={`${record.label} conversion`} type="number" min="0" max="100" step="0.1" value={numericDrafts[`${record.id}:conversion`] ?? String(record.conversion)} onChange={(event) => updateNumericField(record, "conversion", event.target.value)} onBlur={() => commitNumericField(record, "conversion")} /></td>
          <td><button type="button" className="suite-row-action" onClick={() => { setRecords((current) => current.filter((entry) => entry.id !== record.id)); setLastUpdated(timestamp()); setMessage(`${record.label} removed and all dashboard values recalculated.`); }}>Remove</button></td>
        </tr>)}</tbody>
      </table></div>
      <div className="selection-feedback" role="status" aria-live="polite">{message}</div>
    </section>
  </article>;
}

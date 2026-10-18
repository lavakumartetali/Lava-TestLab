import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { DemoItem } from "../data/demoItems";

const colors = ["#a77cff", "#ff806e", "#64d6a0", "#68b8ff", "#f2bd62"];
const timeSlots = ["09:00", "10:30", "13:00", "15:30"];

export function RangeSliderCard({ item }: { item: DemoItem }) {
  const [value, setValue] = useState(item.id === 121 || item.id === 122 || item.id === 123 || item.id === 124 ? 42 : item.id === 133 ? 65 : item.id === 134 ? 28 : item.id === 135 ? 72 : item.id === 166 || item.id === 178 ? 100 : item.id === 169 ? 50 : item.id === 177 ? 25 : 50);
  const [low, setLow] = useState(25);
  const [high, setHigh] = useState(75);
  const [secondValue, setSecondValue] = useState(50);
  const [thirdValue, setThirdValue] = useState(25);
  const [choice, setChoice] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [monthOffset, setMonthOffset] = useState(0);
  const [message, setMessage] = useState("");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const updateValue = (next: number, label = item.title) => {
    setValue(next);
    setMessage(`${label}: ${next}`);
  };
  useEffect(() => {
    if (!running || seconds <= 0) {
      if (seconds === 0) setRunning(false);
      return;
    }
    const timer = window.setTimeout(() => setSeconds((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [running, seconds]);
  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === previewRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);
  const rangeControl = (initial: number, onChange: (next: number) => void, options: { min?: number; max?: number; step?: number; vertical?: boolean; marks?: boolean; variant?: "standard" | "thumb" | "filled" | "remaining" } = {}) => {
    const current = options.vertical ? secondValue : value;
    const progress = ((current - (options.min ?? 0)) / ((options.max ?? 100) - (options.min ?? 0))) * 100;
    return <div className={`range-control ${options.vertical ? "range-vertical" : ""}`}>
      <input className={`range-input range-input-${options.variant ?? "standard"}`} aria-label={`${item.title} value`} type="range" min={options.min ?? 0} max={options.max ?? 100} step={options.step ?? 1} value={current} style={{ "--range-progress": `${progress}%` } as CSSProperties} onChange={(event) => onChange(Number(event.target.value))} />
      {options.marks && <div className="range-ticks">{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div>}
      <div className="range-scale"><span>{options.min ?? 0}</span><b>{current}{options.max === 10 ? " dB" : ""}</b><span>{options.max ?? 100}</span></div>
      {initial < 0 && <span className="sr-only">Range control</span>}
    </div>;
  };
  const dates = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
  const calendar = <div className="mini-calendar">
    <div className="calendar-header"><button type="button" aria-label="Previous month" onClick={() => setMonthOffset(monthOffset - 1)}>‹</button><b>{new Date(2026, 9 + monthOffset, 1).toLocaleDateString("en", { month: "long", year: "numeric" })}</b><button type="button" aria-label="Next month" onClick={() => setMonthOffset(monthOffset + 1)}>›</button></div>
    <div className="calendar-days">{["S","M","T","W","T","F","S"].map((day,index) => <span className="calendar-weekday" key={`${day}-${index}`}>{day}</span>)}{Array.from({ length: 35 }, (_, index) => {
      const day = index - 2;
      const label = String(day);
      const unavailable = item.id === 153 && day > 0 && day < 6;
      const disabled = day < 1 || day > 31 || unavailable;
      return <button type="button" key={index} disabled={disabled} className={`${choice === label || (item.id === 152 && dateEnd === label) ? "selected" : ""} ${item.id === 154 && day === 17 ? "today" : ""} ${item.id === 152 && choice && dateEnd && day >= Math.min(Number(choice), Number(dateEnd)) && day <= Math.max(Number(choice), Number(dateEnd)) ? "in-range" : ""}`} onClick={() => { if (item.id === 152 && choice) { setDateEnd(label); setMessage(`Date range: October ${choice}–${label}`); } else { setChoice(label); setDateEnd(""); setMessage(`October ${label}, 2026 selected`); } }}>{day > 0 && day <= 31 ? label : ""}</button>;
    })}</div>
  </div>;

  const content: Record<number, ReactNode> = {
    121: rangeControl(0, (next) => updateValue(next)),
    122: <div className="thumb-position-demo">
      <span className="thumb-position-value" style={{ "--thumb-position": `${value}%` } as CSSProperties}>{value}%</span>
      {rangeControl(0, (next) => updateValue(next, "Thumb position"), { variant: "thumb" })}
      <span className="range-end-label">Move the thumb to position the value marker.</span>
    </div>,
    123: <div className="track-fill-demo">
      {rangeControl(0, (next) => updateValue(next, "Filled track"), { variant: "filled" })}
      <div className="track-fill-summary"><span>Filled</span><b>{value}%</b></div>
    </div>,
    124: <div className="track-remaining-demo">
      {rangeControl(0, (next) => updateValue(next, "Remaining track"), { variant: "remaining" })}
      <div className="track-remaining-summary"><span>Remaining</span><b>{100 - value}%</b></div>
    </div>,
    125: <div className="dual-range"><div className="dual-range-track"><span style={{ left: `${low}%`, width: `${high-low}%` }} /></div><input aria-label="Minimum price" type="range" min="0" max="100" value={low} onChange={(event) => { const next = Math.min(Number(event.target.value), high - 1); setLow(next); setMessage(`Price range: $${next}–$${high}`); }} /><input aria-label="Maximum price" type="range" min="0" max="100" value={high} onChange={(event) => { const next = Math.max(Number(event.target.value), low + 1); setHigh(next); setMessage(`Price range: $${low}–$${next}`); }} /><div className="range-scale"><b>${low}</b><b>${high}</b></div></div>,
    126: rangeControl(0, (next) => updateValue(next, "Step value"), { step: 10 }),
    127: rangeControl(0, (next) => updateValue(next, "Value with marks"), { step: 25, marks: true }),
    128: rangeControl(0, (next) => updateValue(next, "Tooltip value")),
    129: <>{rangeControl(0, (next) => updateValue(next))}<span className="range-end-label">Minimum is 0</span></>,
    130: <>{rangeControl(0, (next) => updateValue(next))}<span className="range-end-label">Maximum is 100</span></>,
    131: <div className="vertical-range-wrap"><span>Low</span>{rangeControl(0, (next) => { setSecondValue(next); setMessage(`Vertical level: ${next}`); }, { vertical: true })}<span>High</span></div>,
    132: <div className="dial-control"><input aria-label="Volume dial" type="range" min="0" max="100" value={value} onChange={(event) => updateValue(Number(event.target.value), "Dial")} /><div className="dial-face"><i style={{ transform: `rotate(${-135 + value * 2.7}deg)` }} /><b>{value}</b></div></div>,
    133: <><div className="range-scale"><span>🔈</span><b>{value}%</b><span>🔊</span></div>{rangeControl(0, (next) => updateValue(next, "Volume"))}</>,
    134: <><div className="timeline-preview">▶ <span>Sample video · 01:24</span><button type="button" onClick={() => setMessage("Timeline expanded")}>⛶</button></div>{rangeControl(0, (next) => updateValue(next, "Playback position"))}<div className="range-scale"><span>00:00</span><span>02:45</span></div></>,
    135: <div className="buffer-track"><span style={{ width: `${value}%` }} /><i style={{ left: `${secondValue}%` }} /><input aria-label="Buffer level" type="range" min="0" max="100" value={value} onChange={(event) => updateValue(Number(event.target.value), "Buffered")} /><div className="range-scale"><span>Buffer {value}%</span><span>Playhead {secondValue}%</span></div></div>,
    136: <div className="timeline-preview preview-hover" onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); const preview = Math.round(((event.clientX - rect.left) / rect.width) * 100); setMessage(`Preview at ${preview}% · Scene ${Math.ceil(preview / 20)}`); }}><span>Hover to preview a scene</span><div className="timeline-bar"><span style={{ width: `${value}%` }} /></div><small>{message || "Move along the timeline"}</small></div>,
    137: <div className="range-button-row">{["0.5×","1×","1.5×","2×"].map((speed) => <button type="button" className={choice === speed ? "selected" : ""} key={speed} onClick={() => { setChoice(speed); setMessage(`Playback speed ${speed}`); }}>{speed}</button>)}</div>,
    138: <label className="range-switch"><span>CC · Captions</span><input type="checkbox" checked={choice === "on"} onChange={(event) => { setChoice(event.target.checked ? "on" : "off"); setMessage(`Subtitles ${event.target.checked ? "on" : "off"}`); }} /><i /></label>,
    139: <button type="button" className="range-action" onClick={() => setMessage(choice === "on" ? (setChoice("off"), "Picture-in-picture closed") : (setChoice("on"), "Picture-in-picture preview opened"))}>▣ {choice === "on" ? "Close floating view" : "Picture-in-picture"}</button>,
    140: <div className={`video-preview ${isFullscreen ? "fullscreen-preview" : ""}`} ref={previewRef}><span>▶ Sample player</span><button type="button" onClick={() => { const target = previewRef.current; if (target?.requestFullscreen) void target.requestFullscreen().catch((error: unknown) => { console.error("Could not open fullscreen preview.", error); setMessage("Fullscreen is unavailable in this browser."); }); else setMessage("Fullscreen is unavailable in this browser."); }}>{isFullscreen ? "Exit fullscreen" : "⛶ Fullscreen"}</button></div>,
    141: <input className="range-native-input" type="date" aria-label="Choose a date" onChange={(event) => setMessage(event.target.value ? `Date selected: ${event.target.value}` : "No date selected")} />,
    142: <input className="range-native-input" type="time" aria-label="Choose a time" onChange={(event) => setMessage(event.target.value ? `Time selected: ${event.target.value}` : "No time selected")} />,
    143: <input className="range-native-input" type="datetime-local" aria-label="Choose date and time" onChange={(event) => setMessage(event.target.value ? `Date and time: ${event.target.value}` : "No date or time selected")} />,
    144: <input className="range-native-input" type="month" aria-label="Choose a month" onChange={(event) => setMessage(event.target.value ? `Month selected: ${event.target.value}` : "No month selected")} />,
    145: <input className="range-native-input" type="week" aria-label="Choose a week" onChange={(event) => setMessage(event.target.value ? `Week selected: ${event.target.value}` : "No week selected")} />,
    146: calendar,
    147: <div className="calendar-static"><div className="calendar-days">{["S","M","T","W","T","F","S"].map((day,index) => <span className="calendar-weekday" key={`${day}-${index}`}>{day}</span>)}{dates.map((day) => <button type="button" className={choice === day ? "selected" : ""} key={day} onClick={() => { setChoice(day); setMessage(`October ${day} selected`); }}>{day}</button>)}</div></div>,
    148: <div className="calendar-header standalone"><button type="button" onClick={() => { setMonthOffset(monthOffset - 1); setMessage("Previous month"); }}>‹</button><b>{new Date(2026, 9 + monthOffset, 1).toLocaleDateString("en", { month: "long", year: "numeric" })}</b><button type="button" onClick={() => { setMonthOffset(monthOffset + 1); setMessage("Next month"); }}>›</button></div>,
    149: <select className="demo-select" value={choice || "2026"} aria-label="Select year" onChange={(event) => { setChoice(event.target.value); setMessage(`Year ${event.target.value} selected`); }}>{["2024","2025","2026","2027","2028"].map((year) => <option key={year}>{year}</option>)}</select>,
    150: <div className="date-range-demo"><input className="range-native-input" type="date" aria-label="Start date" onChange={(event) => setMessage(`Start date: ${event.target.value}`)} /><input className="range-native-input" type="date" aria-label="End date" onChange={(event) => setMessage(`End date: ${event.target.value}`)} /></div>,
    151: calendar,
    152: calendar,
    153: calendar,
    154: calendar,
    155: <div className="range-button-grid">{timeSlots.map((slot) => <button type="button" className={choice === slot ? "selected" : ""} key={slot} onClick={() => { setChoice(slot); setMessage(`${slot} selected`); }}>{slot}</button>)}</div>,
    156: <div className="range-button-row">{["AM","PM"].map((period) => <button type="button" className={choice === period ? "selected" : ""} key={period} onClick={() => { setChoice(period); setMessage(`${period} selected`); }}>{period}</button>)}</div>,
    157: <select className="demo-select" value={choice} onChange={(event) => { setChoice(event.target.value); setMessage(`${event.target.selectedOptions[0].text} selected`); }}><option value="">Choose time zone…</option><option value="IST">India Standard Time (UTC+5:30)</option><option value="UTC">Coordinated Universal Time</option><option value="PST">Pacific Time (UTC−8)</option></select>,
    158: <input className="range-color-input" type="color" value={choice || "#a77cff"} aria-label="Choose a color" onChange={(event) => { setChoice(event.target.value); setMessage(`Color ${event.target.value.toUpperCase()}`); }} />,
    159: <div className="spectrum-picker"><input aria-label="Color saturation" type="range" min="0" max="100" value={value} onChange={(event) => updateValue(Number(event.target.value), "Saturation")} /><input aria-label="Color lightness" type="range" min="0" max="100" value={secondValue} onChange={(event) => { setSecondValue(Number(event.target.value)); setMessage(`Lightness: ${event.target.value}%`); }} /></div>,
    160: <><input className="hue-slider" aria-label="Hue" type="range" min="0" max="360" value={value * 3.6} onChange={(event) => updateValue(Number(event.target.value), "Hue")} /><div className="range-scale"><span>0°</span><b>{Math.round(value * 3.6)}°</b><span>360°</span></div></>,
    161: <div className="opacity-control"><input aria-label="Opacity" type="range" min="0" max="100" value={value} onChange={(event) => updateValue(Number(event.target.value), "Opacity")} /><span style={{ opacity: value / 100 }}>Preview</span></div>,
    162: <input className="range-native-input hex-input" value={choice || "#A77CFF"} aria-label="HEX color" maxLength={7} onChange={(event) => { const next = event.target.value.toUpperCase(); setChoice(next); setMessage(/^#[0-9A-F]{6}$/.test(next) ? `Color ${next}` : "Enter a 6-digit HEX color"); }} />,
    163: <div className="rgb-inputs">{["R","G","B"].map((channel,index) => <label key={channel}>{channel}<input aria-label={`${channel} channel`} type="number" min="0" max="255" value={[value,secondValue,thirdValue][index]} onChange={(event) => { const next = Number(event.target.value); (index === 0 ? setValue : index === 1 ? setSecondValue : setThirdValue)(Math.max(0, Math.min(255, next))); setMessage(`${channel}: ${next}`); }} /></label>)}</div>,
    164: <div className="saved-swatches">{colors.map((color) => <button key={color} type="button" aria-label={`Choose ${color}`} style={{ background: color }} onClick={() => { setChoice(color); setMessage(`Swatch ${color} selected`); }} />)}</div>,
    165: <div className="eyedropper-demo"><canvas width="180" height="55" ref={(canvas) => { if (canvas) { const context = canvas.getContext("2d"); if (context) { const gradient = context.createLinearGradient(0,0,180,55); colors.forEach((color,index) => gradient.addColorStop(index / (colors.length - 1), color)); context.fillStyle = gradient; context.fillRect(0,0,180,55); } } }} /><button type="button" onClick={async () => { if (!("EyeDropper" in window)) { setMessage("Eyedropper is not supported; use the local color picker."); return; } try { const eyeDropper = new (window as Window & { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper(); const result = await eyeDropper.open(); setChoice(result.sRGBHex); setMessage(`Sampled ${result.sRGBHex}`); } catch (error) { if (error instanceof Error && error.name !== "AbortError") { console.error("Could not sample a screen color.", error); setMessage("Could not sample a color."); } } }} >Sample color</button><input type="color" aria-label="Sample local color" value={choice || "#a77cff"} onChange={(event) => { setChoice(event.target.value); setMessage(`Sampled ${event.target.value}`); }} /></div>,
    166: <>{rangeControl(0, (next) => updateValue(next, "Zoom"), { min: 50, max: 150 })}<div className="zoom-preview" style={{ transform: `scale(${value / 100})` }}>Preview</div></>,
    167: <><div className="sample-chart">{[25,45,30,70,55,85,42,66].map((height,index) => <i key={index} style={{ height: `${height}%`, opacity: index < value / 12.5 ? 1 : .25 }} />)}</div>{rangeControl(0, (next) => updateValue(next, "Visible range"))}</>,
    168: <div className="coordinate-picker" onClick={(event) => { const rect = event.currentTarget.getBoundingClientRect(); const x = Math.round(((event.clientX - rect.left) / rect.width) * 100); const y = Math.round(((event.clientY - rect.top) / rect.height) * 100); setValue(x); setSecondValue(y); setMessage(`Coordinates: ${x}, ${y}`); }}><i style={{ left: `${value}%`, top: `${secondValue}%` }} /></div>,
    169: <><input className="pitch-slider" aria-label="Pitch" type="range" min="100" max="1000" value={value * 9 + 100} onChange={(event) => updateValue(Math.round((Number(event.target.value) - 100) / 9), "Pitch")} /><span className="range-caption">{100 + value * 9} Hz</span></>,
    170: <div className="fractional-rating"><div>{[1,2,3,4,5].map((star) => <button type="button" key={star} aria-label={`Rate ${star}`} className={star <= Math.floor(value / 20) ? "filled" : ""} onClick={() => { updateValue(star * 20, "Rating"); }}>★</button>)}</div><input aria-label="Fractional rating" type="range" min="0" max="100" value={value} onChange={(event) => updateValue(Number(event.target.value), "Rating")} /><span>{(value / 20).toFixed(1)} stars</span></div>,
    171: <div className="birthday-select"><select className="demo-select" aria-label="Birth month" onChange={(event) => setMessage(`Birthday month: ${event.target.value}`)}><option>Month</option>{Array.from({length:12},(_,index)=><option key={index}>{new Date(2000,index,1).toLocaleDateString("en",{month:"long"})}</option>)}</select><select className="demo-select" aria-label="Birth day" onChange={(event) => setMessage(`Birthday: day ${event.target.value}`)}><option>Day</option>{Array.from({length:31},(_,index)=><option key={index}>{index+1}</option>)}</select><select className="demo-select" aria-label="Birth year" onChange={(event) => setMessage(`Birth year: ${event.target.value}`)}><option>Year</option>{Array.from({length:80},(_,index)=><option key={index}>{2026-index}</option>)}</select></div>,
    172: <div className="dial-control"><input aria-label="Balance dial" type="range" min="0" max="100" value={value} onChange={(event) => updateValue(Number(event.target.value), "Balance")} /><div className="dial-face"><i style={{ transform: `rotate(${-135 + value * 2.7}deg)` }} /><b>{value}%</b></div></div>,
    173: <div className="partition-slider"><input type="range" min="10" max={Math.min(70, 90-secondValue)} value={low} aria-label="First partition" onChange={(event) => { const next = Number(event.target.value); setLow(next); setMessage(`Partitions: ${next}% / ${secondValue}% / ${100-next-secondValue}%`); }} /><input type="range" min="10" max={Math.min(70, 90-low)} value={secondValue} aria-label="Second partition" onChange={(event) => { const next = Number(event.target.value); setSecondValue(next); setMessage(`Partitions: ${low}% / ${next}% / ${100-low-next}%`); }} /><div><span>Core {low}%</span><span>Growth {secondValue}%</span><span>Reserve {100-low-secondValue}%</span></div></div>,
    174: <div className="equalizer">{["60 Hz","250 Hz","1 kHz","4 kHz"].map((band,index)=><label key={band}><span>{band}</span><input type="range" min="0" max="100" value={[value,secondValue,thirdValue,low][index]} onChange={(event)=>{const next=Number(event.target.value);(index===0?setValue:index===1?setSecondValue:index===2?setThirdValue:setLow)(next);setMessage(`${band}: ${next}%`);}}/><b>{[value,secondValue,thirdValue,low][index]}%</b></label>)}</div>,
    175: <div className="timer-fields">{[["Hours",0,23],["Minutes",0,59],["Seconds",0,59]].map(([label,min,max],index)=><label key={label}>{label}<input aria-label={String(label)} type="number" min={Number(min)} max={Number(max)} value={[Math.floor(value/60),value%60,thirdValue][index]} onChange={(event)=>{const next=Number(event.target.value); if(index===0)setValue(next*60+value%60); else if(index===1)setValue(Math.floor(value/60)*60+next); else setThirdValue(next);setMessage(`${label}: ${next}`);}}/></label>)}</div>,
    176: <div className="countdown-control"><strong>{String(Math.floor(seconds/60)).padStart(2,"0")}:{String(seconds%60).padStart(2,"0")}</strong><button type="button" onClick={()=>{if(seconds===0)setSeconds(10);setRunning(!running);setMessage(running?"Countdown paused":"Countdown started");}}>{running?"Pause":"Start"}</button><button type="button" onClick={()=>{setRunning(false);setSeconds(10);setMessage("Countdown reset");}}>Reset</button></div>,
    177: <>{rangeControl(0, (next) => updateValue(next, "Coverage radius"), { max: 50 })}<div className="radius-map"><i style={{ width: `${Math.max(20,value*2)}px`, height: `${Math.max(20,value*2)}px` }} /></div></>,
    178: <>{rangeControl(0, (next) => updateValue(next, "Font size"), { min: 50, max: 150 })}<div className="font-preview" style={{ fontSize: `${Math.max(10, value / 4)}px` }}>Sample text</div></>,
    179: <>{rangeControl(0, (next) => updateValue(next, "Contrast"))}<div className="filter-preview" style={{ filter: `contrast(${value * 2}%)` }}>Contrast preview</div></>,
    180: <>{rangeControl(0, (next) => updateValue(next, "Saturation"))}<div className="filter-preview saturation-preview" style={{ filter: `saturate(${value * 2}%)` }}>Saturation preview</div></>,
  };
  const initialStatus = message || (item.id === 176 ? `Countdown: ${seconds}s` : item.id === 125 ? `Price range: $${low}–$${high}` : item.id === 150 ? "Choose start and end dates" : item.id === 158 ? `Color ${choice || "#A77CFF"}` : item.id === 170 ? `${(value / 20).toFixed(1)} stars` : `Value: ${value}`);
  return <article className="component-card range-card" id={`component-${item.id}`}>
    <div className="card-topline"><span className="component-number">{item.id}</span><span className="component-status"><span /> INTERACTIVE</span></div>
    <h3>{item.title}</h3>
    <p className="card-description">{item.description}</p>
    <div className="range-demo-area">{content[item.id]}</div>
    <div className="selection-feedback" role="status" aria-live="polite">{initialStatus}</div>
  </article>;
}

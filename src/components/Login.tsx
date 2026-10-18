import { useState, type FormEvent } from "react";
import { demoAccounts } from "../data/demoItems";
import { Icon } from "./Icon";

export function Login({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const account = demoAccounts.find((item) => item.username.toLowerCase() === username.trim().toLowerCase() && item.password === password);
    if (!account) {
      setError("Those credentials don’t match a demo account. Try one from the list below.");
      return;
    }
    setBusy(true);
    window.setTimeout(() => onLogin(account.username), 500);
  };
  return (
    <main className="login-screen">
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />
      <div className="login-wrap">
        <div className="login-brand">
          <div className="brand-mark"><Icon name="flame" size={24} /></div>
          <span>LAVA <b>TESTLAB</b></span>
        </div>
        <section className="login-card">
          <div className="login-heading">
            <span className="eyebrow"><span className="live-dot" /> YOUR INPUT PLAYGROUND</span>
            <h1>Welcome <span>back.</span></h1>
            <p>Sign in to explore the interactive component lab.</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address</label>
            <div className="input-shell">
              <Icon name="user" size={18} />
              <input id="login-email" type="email" autoComplete="username" placeholder="you@company.com" value={username} onChange={(event) => setUsername(event.target.value)} required />
            </div>
            <div className="password-label-row">
              <label htmlFor="login-password">Password</label>
              <span>DEMO ACCESS</span>
            </div>
            <div className="input-shell">
              <Icon name="lock" size={18} />
              <input id="login-password" type={visible ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              <button className="icon-button" type="button" aria-label={visible ? "Hide password" : "Show password"} onClick={() => setVisible(!visible)}><Icon name={visible ? "eyeOff" : "eye"} size={18} /></button>
            </div>
            {error && <div className="login-error" role="alert">{error}</div>}
            <button className="sign-in-button" type="submit" disabled={busy}>
              {busy ? <><span className="button-spinner" /> Opening your lab…</> : <>Enter the lab <Icon name="arrow" size={18} /></>}
            </button>
          </form>
          <div className="demo-accounts">
            <div className="demo-title"><span>DEMO CREDENTIALS</span><span>4 ACCOUNTS</span></div>
            <div className="account-list">
              {demoAccounts.map((account) => (
                <button className="account-row" type="button" key={account.username} onClick={() => { setUsername(account.username); setPassword(account.password); setError(""); }}>
                  <span className="account-avatar">{account.role.slice(0, 1)}</span>
                  <span className="account-copy"><b>{account.role}</b><small>{account.username}</small></span>
                  <span className="account-arrow"><Icon name="arrow" size={15} /></span>
                </button>
              ))}
            </div>
            <p className="account-hint">Click any account to autofill its credentials.</p>
          </div>
        </section>
        <div className="login-footer"><span>© {new Date().getFullYear()}–{new Date().getFullYear() + 1} Lava TestLab</span><span><span className="secure-dot" /> LOCAL DEMO ENVIRONMENT</span></div>
      </div>
    </main>
  );
}

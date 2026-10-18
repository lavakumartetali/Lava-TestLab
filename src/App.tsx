import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { EndToEndStore } from "./components/EndToEndStore";
import { Login } from "./components/Login";
import { PrivacyPolicy } from "./components/PrivacyPolicy";

export default function App() {
  const [username, setUsername] = useState(() => sessionStorage.getItem("lava-user") || "");
  const [showPrivacy, setShowPrivacy] = useState(false);
  if (window.location.pathname === "/storefront") return <EndToEndStore />;
  const signIn = (user: string) => {
    sessionStorage.setItem("lava-user", user);
    setUsername(user);
  };
  const signOut = () => {
    sessionStorage.removeItem("lava-user");
    setUsername("");
  };
  if (!username) return <Login onLogin={signIn} />;
  return showPrivacy
    ? <PrivacyPolicy onBack={() => setShowPrivacy(false)} />
    : <Dashboard username={username} onLogout={signOut} onPrivacy={() => setShowPrivacy(true)} />;
}

export function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return <main className="privacy-page">
    <header className="privacy-header">
      <button type="button" className="privacy-back" onClick={onBack}>← Back to Lava TestLab</button>
      <img src="/profile.jpg" alt="Lava Kumar" />
    </header>
    <article className="privacy-card">
      <span className="privacy-eyebrow">LAVA TESTLAB</span>
      <h1>Privacy Policy</h1>
      <p className="privacy-updated">Last updated October 17, 2026</p>
      <h2>About this demo</h2>
      <p>Lava TestLab is a local interactive demonstration. Form entries and demo actions are used only to show component behavior in your current browser session.</p>
      <h2>Local data and files</h2>
      <p>Some demos may save a draft in browser storage. The file, image, audio, and video examples are processed locally in your browser and are not uploaded by this application.</p>
      <h2>External links</h2>
      <p>This site provides links to GitHub, LinkedIn, and other external websites. Those sites have their own privacy practices, which apply when you visit them.</p>
      <h2>Contact</h2>
      <p>Developer: Lava Kumar Reddy Tetali</p>
      <p><a href="https://github.com/lavakumartetali" target="_blank" rel="noreferrer">GitHub</a> · <a href="https://www.linkedin.com/in/lava-kumar-reddy-tetali-30829b1a1" target="_blank" rel="noreferrer">LinkedIn</a></p>
    </article>
    <footer className="privacy-footer">© {new Date().getFullYear()}–{new Date().getFullYear() + 1} Lava Kumar. All rights reserved.</footer>
  </main>;
}

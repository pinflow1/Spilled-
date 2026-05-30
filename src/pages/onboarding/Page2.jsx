import { skipLink } from "./styles";

const FORMATS = [
  { id: "youtube", label: "YouTube" },
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "x", label: "X / Twitter" },
  { id: "newsletter", label: "Newsletter" },
  { id: "podcast", label: "Podcast" },
  { id: "all", label: "All platforms" },
];

export default function Page2({ selected, onToggle, onNext, onSkip }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0a0a0a", padding: "80px 24px 48px", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 500, margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#888", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: 8 }}>YOUR CREATOR STACK</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f5f5f7", marginBottom: 8 }}>Where do you create?</h2>
          <p style={{ fontSize: 15, color: "#888" }}>We'll prioritize trends that work best for your platform.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
          {FORMATS.map(f => {
            const isSelected = selected.includes(f.id);
            return (
              <button key={f.id} onClick={() => onToggle(f.id)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 20px", background: isSelected ? "#ffffff10" : "#0d0d0d",
                border: `1px solid ${isSelected ? "#555" : "#222"}`, borderRadius: 20,
                cursor: "pointer", width: "100%", textAlign: "left",
              }}>
                <span style={{ fontSize: 16, fontWeight: 500, color: isSelected ? "#f5f5f7" : "#aaa" }}>{f.label}</span>
                {isSelected && <span>✓</span>}
              </button>
            );
          })}
        </div>
        <button onClick={onNext} style={{ background: "#f5f5f7", border: "none", borderRadius: 44, padding: "16px 24px", fontSize: 17, fontWeight: 600, color: "#0a0a0a", cursor: "pointer", width: "100%" }}>Build my feed</button>
        {skipLink(onSkip)}
      </div>
    </div>
  );
                }

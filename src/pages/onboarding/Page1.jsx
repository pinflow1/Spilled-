import DrippingS from "../../components/DrippingS";
import { skipLink } from "./styles";

export default function Page1({ onNext, onSkip }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0a0a0a", padding: "80px 24px 48px", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 500, margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#888", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: 12 }}>HOW IT WORKS</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f5f5f7", marginBottom: 12 }}>The Thread, not a headline.</h2>
          <p style={{ fontSize: 16, color: "#aaa", lineHeight: 1.5 }}>We detect accelerating trends before they peak – and stitch the full story from first signal to blow‑up.</p>
        </div>

        {/* Graph */}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 24, padding: 20, marginBottom: 24 }}>
          <svg width="100%" height="80" viewBox="0 0 400 80" preserveAspectRatio="none">
            <path d="M0,70 L40,60 L80,55 L120,40 L160,25 L200,15 L240,20" stroke="#00d4aa" strokeWidth="2" fill="none" />
            <path d="M240,20 L280,40 L320,55 L360,65 L400,70" stroke="#555" strokeWidth="2" fill="none" />
            <path d="M0,70 L40,60 L80,55 L120,40 L160,25 L200,15 L240,20 L280,40 L320,55 L360,65 L400,70 L400,80 L0,80 Z" fill="#00d4aa15" />
            <circle cx="200" cy="15" r="4" fill="#00d4aa" />
            <text x="210" y="10" fontSize="9" fill="#00d4aa" fontFamily="'DM Mono', monospace" fontWeight="bold">Spilled (early)</text>
            <circle cx="280" cy="40" r="4" fill="#888" />
            <text x="290" y="35" fontSize="9" fill="#aaa" fontFamily="'DM Mono', monospace">Others (late)</text>
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "#555", fontFamily: "'DM Mono', monospace" }}>
            <span>Early signal</span><span>Accelerating</span><span>Peak</span><span>Cooling</span>
          </div>
        </div>

        {/* Thread preview */}
        <div style={{ background: "#0d0d0d", border: "1px solid #222", borderRadius: 24, padding: 20, marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, background: "#1a1a1a", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center" }}><DrippingS size={20} color="#888" /></div>
            <div><div style={{ fontSize: 14, fontWeight: 700, color: "#f5f5f7" }}>Spilled</div><div style={{ fontSize: 12, color: "#555" }}>3 hours ago</div></div>
          </div>
          <p style={{ fontSize: 15, color: "#ddd", marginBottom: 16, lineHeight: 1.5 }}>"This startup's viral tweet wasn't luck – here's the breakdown of every step they took to manufacture the hype."</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 11, color: "#555", fontFamily: "'DM Mono', monospace" }}>via Reddit r/marketing</span><span>·</span><span style={{ fontSize: 11, color: "#555" }}>234 comments</span></div>
        </div>

        <button onClick={onNext} style={{ background: "#f5f5f7", border: "none", borderRadius: 44, padding: "16px 24px", fontSize: 17, fontWeight: 600, color: "#0a0a0a", cursor: "pointer", width: "100%" }}>What should I track?</button>
        {skipLink(onSkip)}
      </div>
    </div>
  );
}

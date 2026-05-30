import { useState } from "react";
import DrippingS from "../../components/DrippingS";

export default function Page3({ email, setEmail, onComplete, onSkip }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0a0a0a", padding: "80px 24px 48px", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 500, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div style={{ marginBottom: 20 }}><DrippingS size={48} color="#555" /></div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f5f5f7", marginBottom: 8 }}>You're almost in</h2>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 24 }}>Free account. No card needed.</p>

        <button style={{ width: "100%", background: "#111", border: "1px solid #2a2a2a", borderRadius: 50, padding: "13px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
          <svg width="16" height="16" viewBox="0 0 18 18">...</svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
          <span style={{ fontSize: 11, color: "#333", fontFamily: "'DM Mono', monospace" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
        </div>

        <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", background: "#111", border: `1px solid ${email ? "#666" : "#222"}`, borderRadius: 44, padding: "14px 18px", marginBottom: 12, color: "#f5f5f7" }} />
        <button onClick={onComplete} style={{ width: "100%", background: "#f5f5f7", border: "none", borderRadius: 50, padding: "14px", fontSize: 15, fontWeight: 800, color: "#0a0a0a", cursor: "pointer" }}>Start for free</button>
        <p style={{ fontSize: 12, color: "#333", marginTop: 14 }}>Cancel anytime</p>

        <div style={{ marginTop: 20 }}>
          <button onClick={onSkip} style={{ background: "none", border: "none", color: "#555", fontSize: 13, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>No thanks, take me to the feed</button>
        </div>
      </div>
    </div>
  );
}

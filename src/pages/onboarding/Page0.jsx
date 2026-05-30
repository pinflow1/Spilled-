import DrippingS from "../../components/DrippingS";
import { skipLink } from "./styles";

export default function Page0({ onNext, onSkip }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0a0a0a", padding: "80px 24px 48px", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 500, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div style={{ marginBottom: 32 }}><DrippingS size={64} color="#f5f5f7" /></div>
        <h1 style={{
          fontSize: 48,
          fontWeight: 900,
          marginBottom: 12,
          color: "#f5f5f7",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "-0.04em"
        }}>spilled.</h1>
        <p style={{
          fontSize: 16,
          color: "#888",
          marginBottom: 48,
          maxWidth: 260,
          marginLeft: "auto",
          marginRight: "auto",
          fontFamily: "'DM Sans', sans-serif"
        }}>The internet's messy. We track it before everyone else does.</p>
        
        <button onClick={onNext} style={{
          background: "#f5f5f7",
          border: "none",
          borderRadius: 50,
          padding: "15px 44px",
          fontSize: 16,
          fontWeight: 800,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "-0.01em",
          color: "#0a0a0a",
          cursor: "pointer",
          width: "100%"
        }}>Get the latest spills</button>
        
        <p style={{
          fontSize: 12,
          color: "#333",
          marginTop: 14,
          fontFamily: "'DM Sans', sans-serif"
        }}>No credit card required</p>
        
        {skipLink(onSkip)}
      </div>
    </div>
  );
}

export const pageStyle = {
  position: "relative",
  minHeight: "100vh",
  background: "#0a0a0a",
  padding: "80px 24px 48px",
  display: "flex",
  flexDirection: "column",
};

export const contentStyle = (animIn) => ({
  opacity: animIn ? 1 : 0,
  transform: animIn ? "translateY(0)" : "translateY(10px)",
  transition: "opacity 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
  maxWidth: 500,
  margin: "0 auto",
  width: "100%",
});

export const skipLink = (onSkip) => (
  <div style={{ textAlign: "center", marginTop: 40 }}>
    <button onClick={onSkip} style={{ background: "none", border: "none", color: "#555", fontSize: 13, fontFamily: "'DM Mono', monospace", cursor: "pointer", padding: "8px 16px" }}>
      Skip to feed
    </button>
  </div>
);

const CONFIG = {
  "ACCELERATING": { color: "#f5f5f7", icon: "↗" },
  "RISING":       { color: "#aaaaaa", icon: "↗" },
  "TRENDING":     { color: "#888888", icon: "↗" },
  "EARLY SIGNAL": { color: "#666666", icon: "◎" },
  "COOLING DOWN": { color: "#444444", icon: "↘" },
}

export default function StatusLabel({ status, size = 10 }) {
  const c = CONFIG[status] || CONFIG["TRENDING"]
  return (
    <span style={{
      fontSize: size, fontWeight: 700, color: c.color,
      letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace",
      display: "inline-flex", alignItems: "center", gap: 3,
    }}>
      <span style={{ fontSize: size + 1 }}>{c.icon}</span>
      {status}
    </span>
  )
}

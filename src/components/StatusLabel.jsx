export default function StatusLabel({ status, size = 10 }) {
  const config = {
    ACCELERATING: { color: "#fff", icon: "↗", label: "ACCELERATING" },
    RISING: { color: "#aaa", icon: "↗", label: "RISING" },
    TRENDING: { color: "#aaa", icon: "↗", label: "TRENDING" },
    "EARLY SIGNAL": { color: "#888", icon: "◎", label: "EARLY SIGNAL" },
    "COOLING DOWN": { color: "#555", icon: "↘", label: "COOLING DOWN" },
  };
  const c = config[status] || config.TRENDING;
  return (
    <span
      style={{
        fontSize: size,
        fontWeight: 700,
        color: c.color,
        letterSpacing: "0.08em",
        fontFamily: "'DM Mono', monospace",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <span style={{ fontSize: size + 1 }}>{c.icon}</span> {c.label}
    </span>
  );
    }

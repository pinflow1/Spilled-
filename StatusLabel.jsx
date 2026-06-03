// Maps engine status labels to display config
// Matches exactly what the Python engine outputs
const STATUS = {
  // Engine narrative statuses
  "active":         { color: "#FF4422", label: "BOILING",       dot: true  },
  "emerging":       { color: "#FF6B35", label: "SPICY",         dot: false },

  // Direct status labels from LLM generator
  "BOILING":        { color: "#FF4422", label: "BOILING",       dot: true  },
  "SPICY":          { color: "#FF6B35", label: "SPICY",         dot: false },
  "RISING":         { color: "#FF8C42", label: "RISING",        dot: false },
  "TRENDING":       { color: "#999999", label: "TRENDING",      dot: false },
  "EARLY SIGNAL":   { color: "#9B8FFF", label: "EARLY SIGNAL",  dot: false },
  "COOLING DOWN":   { color: "#555555", label: "COOLING DOWN",  dot: false },
  "cooling":        { color: "#555555", label: "COOLING DOWN",  dot: false },
}

export default function StatusLabel({ status, size = 10 }) {
  const cfg = STATUS[status] || { color: "#666", label: status || "TRENDING", dot: false }

  return (
    <span style={{
      fontSize: size,
      fontWeight: 800,
      color: cfg.color,
      letterSpacing: "0.1em",
      fontFamily: "'DM Mono', monospace",
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
    }}>
      {cfg.dot && (
        <span style={{
          width: size * 0.7,
          height: size * 0.7,
          borderRadius: "50%",
          background: cfg.color,
          display: "inline-block",
          animation: "pulse 1.5s ease-in-out infinite",
          flexShrink: 0,
        }} />
      )}
      {cfg.label}
    </span>
  )
}

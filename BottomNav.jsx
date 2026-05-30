const TABS = [
  {
    id: "feed", label: "Feed",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10.5L10 4l7 6.5" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 9v7h4v-4h2v4h4V9" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "search", label: "Search",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="5.5" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8"/>
        <path d="M13.5 13.5L17 17" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: "alerts", label: "Alerts",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3C7.24 3 5 5.24 5 8v5l-1.5 2h13L15 13V8c0-2.76-2.24-5-5-5z" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M8 16c0 1.1.9 2 2 2s2-.9 2-2" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8"/>
      </svg>
    )
  },
  {
    id: "saved", label: "Saved",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill={a ? "#f5f5f7" : "none"}>
        <path d="M5 3h10v14l-5-3-5 3V3z" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "profile", label: "Profile",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3.5" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8"/>
        <path d="M3 17c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )
  },
]

export default function BottomNav({ active, onChange }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "#0a0a0aF2", backdropFilter: "blur(24px)",
      borderTop: "1px solid #1a1a1a",
      display: "flex", padding: "10px 0 22px",
    }}>
      {TABS.map(tab => {
        const a = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              padding: "4px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
              transform: a ? "scale(1.05)" : "scale(1)",
            }}
          >
            {tab.icon(a)}
            <span style={{
              fontSize: 10, fontWeight: a ? 700 : 500,
              color: a ? "#f5f5f7" : "#444",
              fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.15s ease",
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

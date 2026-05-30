import DrippingS from "../components/DrippingS"
import StatusLabel from "../components/StatusLabel"

const MOCK_ALERTS = [
  { id: 1, status: "ACCELERATING", headline: "People think GPT outputs became less creative overnight", time: "2m ago", read: false },
  { id: 2, status: "RISING", headline: "A startup founder got exposed for faking users", time: "1h ago", read: false },
  { id: 3, status: "TRENDING", headline: "TikTok users are obsessed with obsolete digital cameras", time: "3h ago", read: true },
  { id: 4, status: "EARLY SIGNAL", headline: "A niche productivity app suddenly gained 400k users", time: "5h ago", read: true },
]

export default function AlertsPage() {
  const unread = MOCK_ALERTS.filter(a => !a.read).length

  return (
    <div style={{ padding: "60px 16px 100px", maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
          ALERTS
          {unread > 0 && (
            <span style={{
              marginLeft: 8, background: "#f5f5f7", color: "#0a0a0a",
              borderRadius: 20, padding: "1px 7px", fontSize: 10, fontWeight: 800,
            }}>
              {unread} new
            </span>
          )}
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#444", fontFamily: "'DM Sans', sans-serif" }}>
          Mark all read
        </button>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 4, top: 8, bottom: 0,
          width: 1, background: "linear-gradient(to bottom, #2a2a2a, #111)",
        }} />

        {MOCK_ALERTS.map(alert => (
          <div key={alert.id}>
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              padding: "16px 0", cursor: "pointer",
              opacity: alert.read ? 0.5 : 1,
            }}>
              <div style={{ flexShrink: 0, paddingTop: 4, width: 10, display: "flex", justifyContent: "center" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: alert.read ? "#2a2a2a" : "#f5f5f7",
                  border: `1.5px solid ${alert.read ? "#333" : "#f5f5f7"}`,
                  boxShadow: alert.read ? "none" : "0 0 6px #ffffff60",
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <StatusLabel status={alert.status} size={9} />
                  <span style={{ fontSize: 11, color: "#444", fontFamily: "'DM Mono', monospace" }}>· {alert.time}</span>
                </div>
                <h3 style={{
                  fontSize: 14, fontWeight: alert.read ? 500 : 700,
                  color: "#f5f5f7", lineHeight: 1.4,
                  fontFamily: "'DM Sans', sans-serif", margin: 0,
                  letterSpacing: "-0.01em",
                }}>
                  {alert.headline}
                </h3>
              </div>
            </div>
            <div style={{ height: 1, background: "#141414", marginLeft: 22 }} />
          </div>
        ))}
      </div>

      {/* Upgrade prompt */}
      <div style={{
        marginTop: 28, background: "#111", border: "1px solid #1a1a1a",
        borderRadius: 16, padding: "18px 16px",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#555", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", marginBottom: 8 }}>
          UNLOCK REAL-TIME ALERTS
        </div>
        <p style={{ fontSize: 14, color: "#666", fontFamily: "'DM Sans', sans-serif", margin: "0 0 14px", lineHeight: 1.5 }}>
          Get notified the moment a story starts accelerating — before it hits the mainstream feed.
        </p>
        <button style={{
          background: "#f5f5f7", border: "none", borderRadius: 30,
          padding: "9px 20px", fontSize: 13, fontWeight: 700,
          color: "#0a0a0a", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
        }}>
          Upgrade to Spicy
        </button>
      </div>
    </div>
  )
}

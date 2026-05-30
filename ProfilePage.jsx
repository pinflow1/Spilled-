const TIERS = [
  { name: "Lukewarm", price: "Free",   desc: "3 categories · 6hr refresh · 5 threads/day", current: true  },
  { name: "Spicy",    price: "$6/mo",  desc: "All categories · 1hr refresh · No ads",       current: false },
  { name: "Messy",    price: "$12/mo", desc: "15min refresh · Push alerts · AI angles",      current: false },
  { name: "No Filter",price: "$29/mo", desc: "Live feed · 5 seats · API access",             current: false },
]

export default function ProfilePage() {
  return (
    <div style={{ padding: "60px 16px 100px", maxWidth: 600, margin: "0 auto" }}>

      {/* Profile card */}
      <div style={{
        background: "#111", border: "1px solid #1a1a1a",
        borderRadius: 20, padding: "24px", marginBottom: 28, textAlign: "center",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "#1a1a1a", border: "1px solid #2a2a2a",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 12px",
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="10" r="5" stroke="#555" strokeWidth="1.8"/>
            <path d="M4 24c0-4.42 4.48-8 10-8s10 3.58 10 8" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <h3 style={{
          fontSize: 18, fontWeight: 800, margin: "0 0 6px",
          color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif",
        }}>
          Creator
        </h3>
        <span style={{
          fontSize: 11, color: "#555", background: "#1a1a1a",
          padding: "3px 10px", borderRadius: 20,
          fontFamily: "'DM Mono', monospace",
        }}>
          Lukewarm Plan
        </span>
      </div>

      {/* Upgrade section */}
      <div style={{
        fontSize: 11, fontWeight: 700, color: "#333",
        margin: "0 0 12px", fontFamily: "'DM Mono', monospace",
        letterSpacing: "0.1em",
      }}>
        UPGRADE YOUR PLAN
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        {TIERS.map(t => (
          <div
            key={t.name}
            style={{
              background: t.current ? "#ffffff08" : "#111",
              border: `1px solid ${t.current ? "#333" : "#1a1a1a"}`,
              borderRadius: 14, padding: "14px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{
                fontSize: 14, fontWeight: 800,
                color: t.current ? "#f5f5f7" : "#777",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 2,
              }}>
                {t.name}
              </div>
              <div style={{ fontSize: 11, color: "#444", fontFamily: "'DM Mono', monospace", marginBottom: 2 }}>
                {t.price}
              </div>
              <div style={{ fontSize: 12, color: "#333", fontFamily: "'DM Sans', sans-serif" }}>
                {t.desc}
              </div>
            </div>
            {t.current
              ? <span style={{
                  fontSize: 10, fontWeight: 700, color: "#555",
                  fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em",
                }}>
                  CURRENT
                </span>
              : <button style={{
                  background: "#f5f5f7", border: "none", borderRadius: 30,
                  padding: "7px 16px", fontSize: 12, fontWeight: 700,
                  color: "#0a0a0a", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Upgrade
                </button>
            }
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p style={{
        textAlign: "center", fontSize: 12, color: "#2a2a2a",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        Cancel anytime · Built for Creators
      </p>
    </div>
  )
}

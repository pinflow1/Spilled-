import { useState, useRef } from "react"
import StatusLabel from "./StatusLabel"
import { formatTimeAgo } from "../utils/formatTimeAgo"

export default function SpillRow({ item, onClick, saved, onSave, index }) {
  const [pressed, setPressed] = useState(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchMoved = useRef(false)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchMoved.current = false
    setPressed(true)
  }
  const handleTouchMove = (e) => {
    if (Math.abs(e.touches[0].clientY - touchStartY.current) > 6) {
      touchMoved.current = true; setPressed(false)
    }
  }
  const handleTouchEnd = () => {
    setPressed(false)
    if (!touchMoved.current) onClick(item)
  }

  return (
    <div style={{ animation: `fadeUp 0.3s ease ${index * 0.05}s both` }}>
      <div
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => { setPressed(false); onClick(item) }}
        onMouseLeave={() => setPressed(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          padding: "20px 0", cursor: "pointer",
          borderBottom: "1px solid #0d0d0d",
          background: pressed ? "#0d0d0d" : "transparent",
          transition: "background 0.12s ease",
          display: "flex", alignItems: "flex-start", gap: 14,
        }}
      >
        <div style={{ flexShrink: 0, paddingTop: 5, width: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: item.status === "COOLING DOWN" ? "#181818" : "#2a2a2a",
            border: `1.5px solid ${item.status === "COOLING DOWN" ? "#1e1e1e" : "#333"}`,
          }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <StatusLabel status={item.status} size={9} />
            <span style={{ fontSize: 10, color: "#2e2e2e", fontFamily: "'DM Mono', monospace" }}>
              · {formatTimeAgo(item.created_at || item.timeAgo)}
            </span>
          </div>
          <h3 style={{
            fontSize: 15, fontWeight: 700, color: "#c0c0c0",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.4, letterSpacing: "-0.02em", margin: "0 0 6px",
          }}>
            {item.headline}
          </h3>
          <p style={{ fontSize: 12, color: "#444", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, margin: 0 }}>
            {item.summary}
          </p>
        </div>

        <button
          onClick={e => { e.stopPropagation(); onSave(item.id) }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 0, flexShrink: 0, paddingTop: 2,
            opacity: saved ? 0.8 : 0.15,
            transition: "opacity 0.2s, transform 0.15s",
            transform: saved ? "scale(1.1)" : "scale(1)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill={saved ? "#ccc" : "none"} stroke="#ccc" strokeWidth="1.5">
            <path d="M2 2h10v11l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

import { useState, useRef } from "react"
import StatusLabel from "./StatusLabel"
import formatTimeAgo from "../lib/formatTimeAgo"

export default function HotScoop({ story, rank, isActive, offset, onClick }) {
  const [pressed, setPressed] = useState(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchMoved = useRef(false)

  const elevation = isActive ? 1 : Math.max(0, 1 - Math.abs(offset) * 0.35)
  const tiltY = isActive ? 0 : offset * 2.5
  const scale = isActive ? 1 : 0.94 + elevation * 0.04
  const shadowOpacity = isActive ? 0.18 : 0.06 + elevation * 0.08

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchMoved.current = false
    setPressed(true)
  }

  const handleTouchMove = (e) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current)
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current)
    if (dx > 6 || dy > 6) { touchMoved.current = true; setPressed(false) }
  }

  const handleTouchEnd = () => {
    setPressed(false)
    if (!touchMoved.current) onClick(story)
  }

  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); onClick(story) }}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        width: 200, flexShrink: 0,
        padding: "20px 18px 18px",
        background: "#141414",
        borderRadius: 18, cursor: "pointer",
        transform: `perspective(600px) rotateY(${tiltY}deg) scale(${pressed ? scale * 0.97 : scale})`,
        transition: "transform 0.4s cubic-bezier(0.34,1.1,0.64,1), box-shadow 0.4s ease",
        boxShadow: isActive
          ? `0 0 0 1px rgba(255,255,255,0.07) inset, 0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 60px -10px rgba(255,255,255,${shadowOpacity * 0.3}), 0 40px 80px -20px rgba(0,0,0,0.8)`
          : `0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 0 rgba(255,255,255,0.03) inset, 0 10px 30px -8px rgba(255,255,255,${shadowOpacity * 0.2}), 0 20px 40px -12px rgba(0,0,0,0.6)`,
        minHeight: 210,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}
    >
      {/* Rank + Status */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{
          fontSize: 28, fontWeight: 900,
          color: isActive ? "#2e2e2e" : "#1e1e1e",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1, letterSpacing: "-0.04em",
          transition: "color 0.3s ease",
        }}>
          {String(rank).padStart(2, "0")}
        </span>
        <StatusLabel status={story.status} size={9} />
      </div>

      {/* Headline */}
      <h3 style={{
        fontSize: isActive ? 16 : 13, fontWeight: 800,
        color: isActive ? "#e0e0e0" : "#777",
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.35, letterSpacing: "-0.02em",
        margin: "0 0 10px", flex: 1,
        transition: "font-size 0.3s ease, color 0.3s ease",
      }}>
        {story.headline}
      </h3>

      {/* Teaser */}
      <p style={{
        fontSize: 11,
        color: isActive ? "#444" : "#2e2e2e",
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.5, margin: "0 0 16px",
        transition: "color 0.3s ease",
      }}>
        {story.summary}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: "#333", fontFamily: "'DM Mono', monospace" }}>
          {formatTimeAgo(story.created_at || story.timeAgo)}
        </span>
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: isActive ? 1 : 0.3, transition: "opacity 0.3s ease",
        }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

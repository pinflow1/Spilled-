import { useState } from "react"
import DrippingS from "../components/DrippingS"
import StatusLabel from "../components/StatusLabel"
import Sparkline from "../components/Sparkline"
import PullToRefresh from "../components/PullToRefresh"
import { CATEGORIES, TOP_STORIES, SPILL_FEED } from "../data/mockData"

// ── TOP STORY CARD ─────────────────────────────────────────────────────────
function TopStoryCard({ story, onClick }) {
  const [pressed, setPressed] = useState(false)
  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={() => onClick(story)}
      style={{
        width: 190, flexShrink: 0, padding: "18px 16px",
        background: "#0d0d0d", border: "1px solid #1a1a1a",
        borderRadius: 18, cursor: "pointer",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex", flexDirection: "column", gap: 14, minHeight: 180,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{
          fontSize: 26, fontWeight: 900, color: "#3a3a3a",
          fontFamily: "'DM Sans', sans-serif", lineHeight: 1, letterSpacing: "-0.04em",
        }}>
          {String(story.rank).padStart(2, "0")}
        </span>
        <StatusLabel status={story.status} size={8} />
      </div>

      <p style={{
        fontSize: 13, fontWeight: 700, color: "#aaa",
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.45, letterSpacing: "-0.01em",
        margin: 0, flex: 1,
      }}>
        {story.headline}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#999", fontFamily: "'DM Mono', monospace" }}>
          {story.growth}
        </span>
        <Sparkline data={story.trend} color="#555" w={44} h={18} />
      </div>
    </div>
  )
}

// ── SPILL ROW ──────────────────────────────────────────────────────────────
function SpillRow({ item, onClick, saved, onSave, index }) {
  const [pressed, setPressed] = useState(false)

  return (
    <div style={{ animation: `fadeUp 0.3s ease ${index * 0.04}s both` }}>
      <div
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onClick={() => onClick(item)}
        style={{
          padding: "22px 0", cursor: "pointer",
          borderBottom: "1px solid #111",
          background: pressed ? "#0d0d0d" : "transparent",
          transition: "background 0.12s ease", borderRadius: 4,
        }}
      >
        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StatusLabel status={item.status} size={9} />
            <span style={{ fontSize: 11, color: "#555", fontFamily: "'DM Mono', monospace" }}>
              {item.timeAgo}
            </span>
          </div>
          <button
            onClick={e => { e.stopPropagation(); onSave(item.id) }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              opacity: saved ? 0.9 : 0.2,
              transition: "opacity 0.2s, transform 0.15s",
              transform: saved ? "scale(1.1)" : "scale(1)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill={saved ? "#f5f5f7" : "none"} stroke="#f5f5f7" strokeWidth="1.5">
              <path d="M2 2h10v11l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Headline */}
        <h3 style={{
          fontSize: 15, fontWeight: 700, color: "#ccc",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.45, letterSpacing: "-0.02em", margin: "0 0 7px",
        }}>
          {item.headline}
        </h3>

        {/* Summary */}
        <p style={{
          fontSize: 12, color: "#666",
          fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, margin: "0 0 14px",
        }}>
          {item.summary}
        </p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: item.isPositive ? "#888" : "#444",
            fontFamily: "'DM Mono', monospace",
          }}>
            {item.growth} growth
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M1 1h10v7H7l-3 3V8H1V1z" stroke="#555" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 10, color: "#555", fontFamily: "'DM Mono', monospace" }}>
              {item.comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── FEED PAGE ──────────────────────────────────────────────────────────────
export default function FeedPage({ onOpenStory, savedIds, onSave }) {
  const [activeTab, setActiveTab] = useState("For You")

  return (
    <PullToRefresh onRefresh={() => {}}>
      <div style={{ paddingBottom: 90 }}>

        {/* Header */}
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "#0a0a0a", borderBottom: "1px solid #111",
          padding: "14px 20px 0",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            {/* Wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <DrippingS size={18} color="#ccc" />
              <span style={{
                fontSize: 19, fontWeight: 900, color: "#ccc",
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em",
              }}>
                spilled.
              </span>
            </div>

            {/* Live pill */}
            <div style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "#0d0d0d", border: "1px solid #1a1a1a",
              borderRadius: 30, padding: "4px 9px",
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: "50%", background: "#f5f5f7",
                animation: "pulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: 10, color: "#555", fontFamily: "'DM Mono', monospace" }}>
                17 live
              </span>
            </div>

            {/* Profile */}
            <button style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "#0d0d0d", border: "1px solid #1a1a1a",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="6" r="3" stroke="#444" strokeWidth="1.5"/>
                <path d="M2 14c0-2.76 2.69-5 6-5s6 2.24 6 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Category tabs */}
          <div className="hide-scrollbar" style={{ display: "flex", overflowX: "auto", paddingBottom: 12 }}>
            {CATEGORIES.map(cat => {
              const a = activeTab === cat
              return (
                <button key={cat} onClick={() => setActiveTab(cat)} style={{
                  background: "none", borderRadius: 0,
                  border: "none",
                  borderBottom: `1.5px solid ${a ? "#bbb" : "transparent"}`,
                  padding: "2px 11px 8px",
                  fontSize: 12, fontWeight: a ? 700 : 400,
                  color: a ? "#ccc" : "#555",
                  cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                  transition: "color 0.15s, border-color 0.15s",
                }}>
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ padding: "0 20px", maxWidth: 600, margin: "0 auto" }}>

          {/* Top Stories */}
          <div style={{ marginTop: 24, marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#555", fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em" }}>
                TOP STORIES
              </span>
              <button style={{ background: "none", border: "none", fontSize: 10, color: "#555", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                View all ›
              </button>
            </div>
            <div className="hide-scrollbar" style={{
              display: "flex", gap: 8, overflowX: "auto",
              marginLeft: -20, paddingLeft: 20,
              marginRight: -20, paddingRight: 20,
            }}>
              {TOP_STORIES.map(s => (
                <TopStoryCard key={s.id} story={s} onClick={onOpenStory} />
              ))}
            </div>
          </div>

          {/* The Spill */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#555", fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em" }}>
                THE SPILL
              </span>
              <button style={{
                background: "none", border: "none", fontSize: 10, color: "#555",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: 3,
              }}>
                Filter
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M1 3h10M3 6h6M5 9h2" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {SPILL_FEED.map((item, i) => (
              <SpillRow
                key={item.id}
                item={item}
                index={i}
                onClick={onOpenStory}
                saved={savedIds.includes(item.id)}
                onSave={onSave}
              />
            ))}
          </div>
        </div>
      </div>
    </PullToRefresh>
  )
}

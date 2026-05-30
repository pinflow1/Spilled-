import { useState } from "react"
import DrippingS from "../components/DrippingS"
import StatusLabel from "../components/StatusLabel"
import Sparkline from "../components/Sparkline"
import MiniAvatars from "../components/MiniAvatars"
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
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => { setPressed(false); onClick(story) }}
      onClick={() => onClick(story)}
      style={{
        background: "#111", border: "1px solid #1a1a1a",
        borderRadius: 16, padding: "16px 14px 14px",
        width: 160, flexShrink: 0, cursor: "pointer",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        minHeight: 200,
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#333", fontFamily: "'DM Sans', sans-serif" }}>
            {story.rank}
          </span>
          <StatusLabel status={story.status} size={9} />
        </div>
        <h3 style={{
          fontSize: 14, fontWeight: 800, color: "#f5f5f7", lineHeight: 1.35,
          fontFamily: "'DM Sans', sans-serif", margin: "0 0 12px",
          letterSpacing: "-0.01em",
        }}>
          {story.headline}
        </h3>
      </div>
      <div>
        <div style={{ marginBottom: 10 }}>
          <Sparkline data={story.trend} color="#888" w={60} h={24} />
        </div>
        <div style={{ fontSize: 11, color: "#555", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>
          {story.growth} growth · {story.communities} communities
        </div>
        <MiniAvatars count={story.creators} />
      </div>
    </div>
  )
}

// ── SPILL ROW ──────────────────────────────────────────────────────────────
function SpillRow({ item, onClick, saved, onSave, index }) {
  const [pressed, setPressed] = useState(false)

  return (
    <div style={{
      animation: `fadeUp 0.3s ease ${index * 0.05}s both`,
    }}>
      <div
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => { setPressed(false); onClick(item) }}
        onClick={() => onClick(item)}
        style={{
          display: "flex", alignItems: "flex-start", gap: 12,
          padding: "16px 0", cursor: "pointer",
          background: pressed ? "#ffffff08" : "transparent",
          transition: "background 0.15s ease",
          borderRadius: 8,
        }}
      >
        {/* Timeline dot */}
        <div style={{ flexShrink: 0, paddingTop: 4, width: 10, display: "flex", justifyContent: "center" }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: item.status === "COOLING DOWN" ? "#2a2a2a" : "#444",
            border: `1.5px solid ${item.status === "COOLING DOWN" ? "#2a2a2a" : "#555"}`,
          }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <StatusLabel status={item.status} size={9} />
            <span style={{ fontSize: 11, color: "#444", fontFamily: "'DM Mono', monospace" }}>· {item.timeAgo}</span>
          </div>
          <h3 style={{
            fontSize: 15, fontWeight: 700, color: "#f5f5f7", lineHeight: 1.4,
            fontFamily: "'DM Sans', sans-serif", margin: "0 0 4px",
            letterSpacing: "-0.01em",
          }}>
            {item.headline}
          </h3>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.4, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
            {item.summary}
          </p>
        </div>

        {/* Right stats */}
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Comments */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1h10v7H7l-3 3V8H1V1z" stroke="#444" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: 12, color: "#555", fontFamily: "'DM Mono', monospace" }}>{item.comments}</span>
            </div>
            {/* Bookmark */}
            <button
              onClick={e => { e.stopPropagation(); onSave(item.id) }}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                color: saved ? "#f5f5f7" : "#333",
                transition: "color 0.2s ease, transform 0.15s ease",
                transform: saved ? "scale(1.15)" : "scale(1)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill={saved ? "#f5f5f7" : "none"} stroke={saved ? "#f5f5f7" : "#444"} strokeWidth="1.5">
                <path d="M2 2h10v11l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <span style={{
            fontSize: 13, fontWeight: 700,
            color: item.isPositive ? "#f5f5f7" : "#444",
            fontFamily: "'DM Mono', monospace",
          }}>
            {item.growth}
          </span>
          <span style={{ fontSize: 10, color: "#333", fontFamily: "'DM Sans', sans-serif" }}>growth</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#141414", marginLeft: 22 }} />
    </div>
  )
}

// ── FEED PAGE ──────────────────────────────────────────────────────────────
export default function FeedPage({ onOpenStory, savedIds, onSave }) {
  const [activeTab, setActiveTab] = useState("For You")

  return (
    <PullToRefresh onRefresh={() => {}}>
      <div style={{ paddingBottom: 80 }}>

        {/* Sticky Header */}
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "#0a0a0aF0", backdropFilter: "blur(24px)",
          borderBottom: "1px solid #1a1a1a",
          padding: "14px 16px 0",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            {/* Wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <DrippingS size={22} color="#f5f5f7" />
              <span style={{
                fontSize: 22, fontWeight: 900, color: "#f5f5f7",
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em",
              }}>
                spilled.
              </span>
            </div>

            {/* Live status */}
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#f5f5f7",
                  boxShadow: "0 0 6px #ffffff80",
                  animation: "pulse 2s ease-in-out infinite",
                }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif" }}>
                  17 stories accelerating
                </span>
              </div>
              <div style={{ fontSize: 10, color: "#444", fontFamily: "'DM Mono', monospace" }}>
                Last updated 9:41 AM
              </div>
            </div>

            {/* Profile */}
            <button style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "#111", border: "1px solid #222",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="6" r="3" stroke="#666" strokeWidth="1.5"/>
                <path d="M2 14c0-2.76 2.69-5 6-5s6 2.24 6 5" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="hide-scrollbar" style={{ display: "flex", overflowX: "auto", paddingBottom: 0 }}>
            {CATEGORIES.map(cat => {
              const a = activeTab === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  style={{
                    background: a ? "#f5f5f7" : "transparent",
                    border: "none", borderRadius: 50,
                    padding: "7px 14px", marginRight: 4, marginBottom: 12,
                    fontSize: 13, fontWeight: a ? 700 : 500,
                    color: a ? "#0a0a0a" : "#555",
                    cursor: "pointer", whiteSpace: "nowrap",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.2s cubic-bezier(0.34,1.2,0.64,1)",
                    flexShrink: 0,
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 16px 0", maxWidth: 600, margin: "0 auto" }}>

          {/* Top Stories */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#f5f5f7", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
                  TOP STORIES
                </div>
                <div style={{ fontSize: 12, color: "#444", fontFamily: "'DM Sans', sans-serif" }}>
                  What the internet is talking about right now
                </div>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#555", fontFamily: "'DM Sans', sans-serif" }}>
                View all ›
              </button>
            </div>

            <div className="hide-scrollbar" style={{
              display: "flex", gap: 10, overflowX: "auto",
              marginLeft: -16, paddingLeft: 16,
              marginRight: -16, paddingRight: 16,
              paddingBottom: 4,
            }}>
              {TOP_STORIES.map(story => (
                <TopStoryCard key={story.id} story={story} onClick={onOpenStory} />
              ))}
            </div>
          </div>

          {/* The Spill */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#f5f5f7", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
                  THE SPILL
                </div>
                <div style={{ fontSize: 12, color: "#444", fontFamily: "'DM Sans', sans-serif" }}>
                  Fresh updates and rising discussions
                </div>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#555", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                Filter
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 3h10M3 6h6M5 9h2" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Timeline */}
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", left: 4, top: 8, bottom: 0,
                width: 1, background: "linear-gradient(to bottom, #2a2a2a, #111)",
              }} />
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
      </div>
    </PullToRefresh>
  )
}

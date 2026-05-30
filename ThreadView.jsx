import { useState, useEffect } from "react"
import DrippingS from "../components/DrippingS"
import StatusLabel from "../components/StatusLabel"
import Sparkline from "../components/Sparkline"

function ThreadPostItem({ post, index, isLast }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 90)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div style={{
      display: "flex", gap: 14, marginBottom: isLast ? 0 : 24,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-10px)",
      transition: `opacity 0.3s ease ${index * 0.07}s, transform 0.35s cubic-bezier(0.34,1.2,0.64,1) ${index * 0.07}s`,
    }}>
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          background: "#1a1a1a", border: "1px solid #2a2a2a",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <DrippingS size={14} color="#666" />
        </div>
      </div>
      <div style={{ flex: 1, paddingTop: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif" }}>
            Spilled
          </span>
          <span style={{ fontSize: 11, color: "#444", fontFamily: "'DM Mono', monospace" }}>{post.time}</span>
          {post.isDeveloping && (
            <span style={{
              fontSize: 9, fontWeight: 700, color: "#666",
              background: "#1a1a1a", padding: "1px 6px", borderRadius: 8,
              fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em",
            }}>
              LATEST
            </span>
          )}
        </div>
        <p style={{
          margin: "0 0 8px", fontSize: 14, color: "#ccc",
          lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif",
        }}>
          {post.content}
        </p>
        <span style={{
          fontSize: 10, color: "#333", fontFamily: "'DM Mono', monospace",
          background: "#111", padding: "2px 8px", borderRadius: 8,
          border: "1px solid #1a1a1a",
        }}>
          via {post.source}
        </span>
      </div>
    </div>
  )
}

export default function ThreadView({ story, onBack, saved, onSave }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    window.scrollTo(0, 0)
  }, [])

  const thread = story.thread || []

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(24px)",
      transition: "opacity 0.28s ease, transform 0.32s cubic-bezier(0.34,1.1,0.64,1)",
    }}>
      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "#0a0a0aE8", backdropFilter: "blur(24px)",
        borderBottom: "1px solid #1a1a1a",
        padding: "14px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={onBack} style={{
          background: "#111", border: "1px solid #1a1a1a",
          borderRadius: 50, width: 34, height: 34,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#f5f5f7", fontSize: 15,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          ←
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <DrippingS size={18} color="#f5f5f7" />
          <span style={{
            fontSize: 14, fontWeight: 800, color: "#f5f5f7",
            fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em",
          }}>
            The Thread
          </span>
        </div>

        <button
          onClick={() => onSave(story.id)}
          style={{
            background: saved ? "#ffffff15" : "#111",
            border: `1px solid ${saved ? "#555" : "#1a1a1a"}`,
            borderRadius: 50, width: 34, height: 34,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s ease",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill={saved ? "#fff" : "none"} stroke={saved ? "#fff" : "#666"} strokeWidth="1.5">
            <path d="M2 2h10v11l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div style={{ padding: "20px 16px 100px", maxWidth: 600, margin: "0 auto" }}>
        {/* Story header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
            <StatusLabel status={story.status || "TRENDING"} size={10} />
            {story.communities && (
              <span style={{ fontSize: 11, color: "#555", fontFamily: "'DM Mono', monospace" }}>
                {story.communities} communities · {story.creators} creators
              </span>
            )}
            {story.timeAgo && (
              <span style={{ fontSize: 11, color: "#444", fontFamily: "'DM Mono', monospace" }}>
                {story.timeAgo}
              </span>
            )}
          </div>

          <h1 style={{
            margin: "0 0 16px", fontSize: 22, fontWeight: 900, lineHeight: 1.3,
            color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "-0.02em",
          }}>
            {story.headline}
          </h1>

          {/* Growth stat */}
          {story.growth && (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                background: "#111", border: "1px solid #1a1a1a",
                borderRadius: 10, padding: "8px 14px",
              }}>
                <div style={{ fontSize: 10, color: "#444", fontFamily: "'DM Mono', monospace", marginBottom: 2 }}>
                  GROWTH
                </div>
                <div style={{
                  fontSize: 18, fontWeight: 800, fontFamily: "'DM Mono', monospace",
                  color: story.isPositive === false ? "#444" : "#f5f5f7",
                }}>
                  {story.growth}
                </div>
              </div>
              {story.trend && <Sparkline data={story.trend} color="#888" w={80} h={32} />}
            </div>
          )}
        </div>

        {/* Thread divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
          <span style={{
            fontSize: 10, color: "#333", fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.1em",
          }}>
            THE THREAD
          </span>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
        </div>

        {/* Thread posts */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 13, top: 28, bottom: 0,
            width: 1, background: "linear-gradient(to bottom, #2a2a2a, transparent)",
          }} />
          {thread.map((post, i) => (
            <ThreadPostItem
              key={post.id}
              post={post}
              index={i}
              isLast={i === thread.length - 1}
            />
          ))}
        </div>

        {/* Still developing */}
        {thread.some(p => p.isDeveloping) && (
          <div style={{
            background: "#111", border: "1px solid #1a1a1a",
            borderRadius: 12, padding: "12px 14px",
            display: "flex", alignItems: "center", gap: 10, marginTop: 16,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: "#555",
              animation: "pulse 1.5s ease-in-out infinite",
            }} />
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: "#666",
                fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em",
              }}>
                STILL DEVELOPING
              </div>
              <div style={{ fontSize: 12, color: "#444", fontFamily: "'DM Sans', sans-serif" }}>
                This story is actively updating.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

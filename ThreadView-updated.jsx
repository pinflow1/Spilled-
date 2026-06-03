import { useState, useEffect } from "react"
import StatusLabel from "../components/StatusLabel"
import { useThread } from "../hooks/useFeed"

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
          width: 28, height: 28, borderRadius: "50%",
          background: "#111", border: "1px solid #1c1c1c",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img src="/logo.png" alt="" width={16} height={16} style={{ borderRadius: 4, opacity: 0.5 }} />
        </div>
      </div>
      <div style={{ flex: 1, paddingTop: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#bbb", fontFamily: "'DM Sans', sans-serif" }}>
            Spilled
          </span>
          <span style={{ fontSize: 11, color: "#333", fontFamily: "'DM Mono', monospace" }}>
            {post.post_time || post.time || "recently"}
          </span>
          {(post.is_developing || post.isDeveloping) && (
            <span style={{
              fontSize: 9, fontWeight: 700, color: "#555",
              background: "#111", padding: "1px 6px", borderRadius: 8,
              fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em",
            }}>
              LATEST
            </span>
          )}
        </div>
        <p style={{ margin: "0 0 8px", fontSize: 14, color: "#999", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
          {post.content}
        </p>
        <span style={{
          fontSize: 9, color: "#2a2a2a", fontFamily: "'DM Mono', monospace",
          background: "#0d0d0d", padding: "2px 8px", borderRadius: 8,
          border: "1px solid #141414",
        }}>
          via {post.source || post.sourceName || "Spilled"}
        </span>
      </div>
    </div>
  )
}

function ThreadSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ display: "flex", gap: 14, opacity: 1 - i * 0.25 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#111", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 11, background: "#111", borderRadius: 6, width: "28%", marginBottom: 10 }} />
            <div style={{ height: 13, background: "#111", borderRadius: 6, marginBottom: 6 }} />
            <div style={{ height: 13, background: "#111", borderRadius: 6, width: "80%", marginBottom: 6 }} />
            <div style={{ height: 13, background: "#111", borderRadius: 6, width: "55%" }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function CreatorAngles({ angles }) {
  if (!angles) return null
  const items = Object.entries(angles).filter(([, v]) => v)

  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, height: 1, background: "#141414" }} />
        <span style={{ fontSize: 9, color: "#222", fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em" }}>
          CREATOR ANGLES
        </span>
        <div style={{ flex: 1, height: 1, background: "#141414" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map(([platform, angle]) => (
          <div key={platform} style={{
            background: "#0d0d0d", border: "1px solid #1a1a1a",
            borderRadius: 12, padding: "12px 14px",
          }}>
            <div style={{
              fontSize: 9, fontWeight: 700, color: "#444",
              fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em",
              marginBottom: 5, textTransform: "uppercase",
            }}>
              {platform}
            </div>
            <div style={{ fontSize: 13, color: "#888", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
              {angle}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatTimeAgo(val) {
  if (!val) return "just now"
  if (typeof val === "string" && val.includes("ago")) return val
  const diff = Date.now() - new Date(val).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function ThreadView({ story, onBack, saved, onSave }) {
  const [visible, setVisible] = useState(false)
  const { posts, loading } = useThread(story.id)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    window.scrollTo(0, 0)
  }, [])

  // Support both real DB posts and mock/fallback thread data
  const threadPosts = posts.length > 0 ? posts : (story.thread || [])
  const isDeveloping = threadPosts.some(p => p.is_developing || p.isDeveloping)

  // Creator angles from AI generation
  const creatorAngles = story.creator_angles || null

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
        borderBottom: "1px solid #141414",
        padding: "14px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={onBack} style={{
          background: "#111", border: "1px solid #1c1c1c",
          borderRadius: 50, width: 34, height: 34,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#ccc", fontSize: 16,
        }}>←</button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/logo.png" alt="Spilled" width={18} height={18} style={{ borderRadius: 5 }} />
          <span style={{
            fontSize: 14, fontWeight: 800, color: "#ccc",
            fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em",
          }}>
            The Thread
          </span>
        </div>

        <button onClick={() => onSave(story.id)} style={{
          background: saved ? "#ffffff12" : "#111",
          border: `1px solid ${saved ? "#444" : "#1c1c1c"}`,
          borderRadius: 50, width: 34, height: 34,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.2s ease",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill={saved ? "#ccc" : "none"} stroke={saved ? "#ccc" : "#555"} strokeWidth="1.5">
            <path d="M2 2h10v11l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div style={{ padding: "20px 16px 100px", maxWidth: 600, margin: "0 auto" }}>

        {/* Story header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
            <StatusLabel status={story.status || "emerging"} size={10} />
            {story.source_name && (
              <span style={{ fontSize: 11, color: "#444", fontFamily: "'DM Mono', monospace" }}>
                {story.source_name}
              </span>
            )}
            <span style={{ fontSize: 11, color: "#333", fontFamily: "'DM Mono', monospace" }}>
              {formatTimeAgo(story.first_seen || story.created_at || story.timeAgo)}
            </span>
            {story.subreddit_spread > 1 && (
              <span style={{ fontSize: 11, color: "#333", fontFamily: "'DM Mono', monospace" }}>
                · {story.subreddit_spread} communities
              </span>
            )}
          </div>

          <h1 style={{
            margin: "0 0 12px", fontSize: 20, fontWeight: 800, lineHeight: 1.35,
            color: "#d0d0d0", fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "-0.02em",
          }}>
            {story.headline}
          </h1>

          {story.summary && (
            <p style={{
              fontSize: 14, color: "#555", lineHeight: 1.6,
              fontFamily: "'DM Sans', sans-serif", margin: 0,
            }}>
              {story.summary}
            </p>
          )}
        </div>

        {/* Thread divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: "#141414" }} />
          <span style={{ fontSize: 9, color: "#1e1e1e", fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em" }}>
            THE THREAD
          </span>
          <div style={{ flex: 1, height: 1, background: "#141414" }} />
        </div>

        {/* Thread posts */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 13, top: 28, bottom: 0,
            width: 1, background: "linear-gradient(to bottom, #1e1e1e, transparent)",
          }} />
          {loading
            ? <ThreadSkeleton />
            : threadPosts.map((post, i) => (
                <ThreadPostItem
                  key={post.id || i}
                  post={post}
                  index={i}
                  isLast={i === threadPosts.length - 1}
                />
              ))
          }
        </div>

        {/* Still developing */}
        {isDeveloping && !loading && (
          <div style={{
            background: "#0d0d0d", border: "1px solid #1a1a1a",
            borderRadius: 10, padding: "11px 14px",
            display: "flex", alignItems: "center", gap: 10, marginTop: 20,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%", background: "#333",
              flexShrink: 0, animation: "pulse 1.5s ease-in-out infinite",
            }} />
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#444", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
                STILL DEVELOPING
              </div>
              <div style={{ fontSize: 12, color: "#333", fontFamily: "'DM Sans', sans-serif" }}>
                This story is actively updating.
              </div>
            </div>
          </div>
        )}

        {/* Creator angles from AI */}
        <CreatorAngles angles={creatorAngles} />
      </div>
    </div>
  )
}

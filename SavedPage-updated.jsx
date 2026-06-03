import { useState, useEffect } from "react"
import StatusLabel from "../components/StatusLabel"
import supabase from "../lib/supabase"
import formatTimeAgo from "../lib/formatTimeAgo"

function SavedRow({ story, onClick, onUnsave }) {
  const [pressed, setPressed] = useState(false)
  return (
    <div style={{ animation: "fadeUp 0.3s ease both" }}>
      <div
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => { setPressed(false); onClick(story) }}
        onMouseLeave={() => setPressed(false)}
        onClick={() => onClick(story)}
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
            background: "#2a2a2a", border: "1.5px solid #333",
          }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <StatusLabel status={story.status} size={9} />
            <span style={{ fontSize: 10, color: "#2e2e2e", fontFamily: "'DM Mono', monospace" }}>
              · {formatTimeAgo(story.first_seen || story.created_at)}
            </span>
          </div>
          <h3 style={{
            fontSize: 15, fontWeight: 700, color: "#c0c0c0",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.4, letterSpacing: "-0.02em", margin: "0 0 6px",
          }}>
            {story.headline}
          </h3>
          {story.summary && (
            <p style={{ fontSize: 12, color: "#444", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, margin: 0 }}>
              {story.summary}
            </p>
          )}
        </div>

        {/* Unsave button */}
        <button
          onClick={e => { e.stopPropagation(); onUnsave(story.id) }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 0, flexShrink: 0, paddingTop: 2, opacity: 0.6,
            transition: "opacity 0.2s",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="#ccc" stroke="#ccc" strokeWidth="1.5">
            <path d="M2 2h10v11l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{ padding: "80px 0", textAlign: "center" }}>
      <img src="/logo.png" alt="" width={36} height={36} style={{ borderRadius: 10, opacity: 0.1, margin: "0 auto 16px", display: "block" }} />
      <p style={{ fontSize: 14, color: "#2a2a2a", fontFamily: "'DM Sans', sans-serif" }}>
        Nothing saved yet.
      </p>
      <p style={{ fontSize: 12, color: "#222", fontFamily: "'DM Sans', sans-serif", marginTop: 6 }}>
        Bookmark stories to read later.
      </p>
    </div>
  )
}

export default function SavedPage({ savedIds, onOpenStory, onSave }) {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSaved() {
      if (!savedIds || savedIds.length === 0) {
        setStories([])
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("narratives")
          .select("*")
          .in("id", savedIds)
          .order("narrative_score", { ascending: false })

        if (!error) setStories(data || [])
      } catch (err) {
        console.error("[SavedPage]", err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSaved()
  }, [savedIds])

  return (
    <div style={{ padding: "60px 20px 100px", maxWidth: 600, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontSize: 9, fontWeight: 700, color: "#333",
          fontFamily: "'DM Mono', monospace", letterSpacing: "0.16em",
          marginBottom: 2,
        }}>
          SAVED · {stories.length}
        </div>
        <div style={{ fontSize: 11, color: "#222", fontFamily: "'DM Sans', sans-serif" }}>
          Stories you bookmarked
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ padding: "20px 0", borderBottom: "1px solid #0d0d0d" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <div style={{ height: 9, background: "#111", borderRadius: 4, width: 70 }} />
                <div style={{ height: 9, background: "#111", borderRadius: 4, width: 40 }} />
              </div>
              <div style={{ height: 14, background: "#111", borderRadius: 6, marginBottom: 6 }} />
              <div style={{ height: 14, background: "#111", borderRadius: 6, width: "75%" }} />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && stories.length === 0 && <EmptyState />}

      {/* Stories */}
      {!loading && stories.length > 0 && (
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 3, top: 10, bottom: 0,
            width: 1, background: "linear-gradient(to bottom, #1e1e1e, transparent)",
          }} />
          {stories.map(story => (
            <SavedRow
              key={story.id}
              story={story}
              onClick={onOpenStory}
              onUnsave={onSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}

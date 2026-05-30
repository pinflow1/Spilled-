import DrippingS from "../components/DrippingS"
import StatusLabel from "../components/StatusLabel"
import { SPILL_FEED, TOP_STORIES } from "../data/mockData"

function SavedRow({ item, onClick, onSave }) {
  return (
    <div>
      <div
        onClick={() => onClick(item)}
        style={{
          display: "flex", alignItems: "flex-start", gap: 12,
          padding: "16px 0", cursor: "pointer",
        }}
      >
        <div style={{ flexShrink: 0, paddingTop: 4, width: 10, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#444", border: "1.5px solid #555" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <StatusLabel status={item.status || "TRENDING"} size={9} />
            {item.timeAgo && (
              <span style={{ fontSize: 11, color: "#444", fontFamily: "'DM Mono', monospace" }}>· {item.timeAgo}</span>
            )}
          </div>
          <h3 style={{
            fontSize: 15, fontWeight: 700, color: "#f5f5f7", lineHeight: 1.4,
            fontFamily: "'DM Sans', sans-serif", margin: 0,
            letterSpacing: "-0.01em",
          }}>
            {item.headline}
          </h3>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onSave(item.id) }}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="#f5f5f7" stroke="#f5f5f7" strokeWidth="1.5">
            <path d="M2 2h10v11l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div style={{ height: 1, background: "#141414", marginLeft: 22 }} />
    </div>
  )
}

export default function SavedPage({ savedIds, onOpenStory, onSave }) {
  const allStories = [...TOP_STORIES, ...SPILL_FEED]
  const saved = allStories.filter(s => savedIds.includes(s.id))

  return (
    <div style={{ padding: "60px 16px 100px", maxWidth: 600, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
          SAVED · {saved.length}
        </div>
      </div>

      {saved.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, opacity: 0.2 }}>
            <DrippingS size={40} color="#f5f5f7" />
          </div>
          <p style={{ fontSize: 15, color: "#444", fontFamily: "'DM Sans', sans-serif" }}>
            Nothing saved yet.
          </p>
          <p style={{ fontSize: 13, color: "#333", fontFamily: "'DM Sans', sans-serif", marginTop: 6 }}>
            Bookmark stories from the feed to read later.
          </p>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 4, top: 8, bottom: 0,
            width: 1, background: "linear-gradient(to bottom, #2a2a2a, #111)",
          }} />
          {saved.map(item => (
            <SavedRow
              key={item.id}
              item={item}
              onClick={onOpenStory}
              onSave={onSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}

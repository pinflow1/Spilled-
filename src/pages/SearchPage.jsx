import { useState } from "react"
import StatusLabel from "../components/StatusLabel"
import { TOP_STORIES, SPILL_FEED } from "../data/mockData"

const ALL = [...TOP_STORIES, ...SPILL_FEED]

export default function SearchPage({ onOpenStory }) {
  const [query, setQuery] = useState("")

  const results = query.length > 1
    ? ALL.filter(s => s.headline.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div style={{ padding: "60px 16px 100px", maxWidth: 600, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: 14 }}>
          SEARCH
        </div>
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="#444" strokeWidth="1.5"/>
            <path d="M11 11L14 14" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search stories..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            style={{
              width: "100%", background: "#111", border: "1px solid #222",
              borderRadius: 12, padding: "13px 14px 13px 40px",
              fontSize: 14, color: "#f5f5f7",
              fontFamily: "'DM Sans', sans-serif",
              outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s ease",
            }}
            onFocus={e => e.target.style.borderColor = "#333"}
            onBlur={e => e.target.style.borderColor = "#222"}
          />
        </div>
      </div>

      {query.length > 1 && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontSize: 15, color: "#444", fontFamily: "'DM Sans', sans-serif" }}>No results for "{query}"</p>
        </div>
      )}

      {results.length > 0 && (
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 4, top: 8, bottom: 0,
            width: 1, background: "linear-gradient(to bottom, #2a2a2a, #111)",
          }} />
          {results.map(item => (
            <div key={item.id}>
              <div
                onClick={() => onOpenStory(item)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "16px 0", cursor: "pointer",
                }}
              >
                <div style={{ flexShrink: 0, paddingTop: 4, width: 10, display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#444", border: "1.5px solid #555" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: 4 }}>
                    <StatusLabel status={item.status || "TRENDING"} size={9} />
                  </div>
                  <h3 style={{
                    fontSize: 15, fontWeight: 700, color: "#f5f5f7",
                    fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                  }}>
                    {item.headline}
                  </h3>
                </div>
              </div>
              <div style={{ height: 1, background: "#141414", marginLeft: 22 }} />
            </div>
          ))}
        </div>
      )}

      {query.length === 0 && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: 12 }}>
            TRENDING SEARCHES
          </div>
          {["AI creativity", "startup drama", "viral trends", "creator beef", "platform changes"].map(term => (
            <div
              key={term}
              onClick={() => setQuery(term)}
              style={{
                padding: "12px 0", cursor: "pointer", borderBottom: "1px solid #141414",
                fontSize: 14, color: "#666", fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v5l3 3" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="6" cy="6" r="5" stroke="#333" strokeWidth="1.2"/>
              </svg>
              {term}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

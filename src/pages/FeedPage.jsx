import { useState, useEffect } from "react"
import PullToRefresh from "../components/PullToRefresh"
import SpilledLogo from "../components/SpilledLogo"
import HotScoopsCarousel from "../components/HotScoopsCarousel"
import SpillRow from "../components/SpillRow"
import { RowSkeleton } from "../components/Skeleton"
import { CATEGORIES } from "../data/mockData"

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export default function FeedPage({ onOpenStory, savedIds, onSave }) {
  const [activeTab, setActiveTab] = useState("For You")
  const [stories, setStories] = useState([])
  const [topStories, setTopStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [debugInfo, setDebugInfo] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Show debug info on screen
        setDebugInfo({
          url: SUPABASE_URL ? "SET ✓" : "MISSING ✗",
          key: SUPABASE_KEY ? "SET ✓" : "MISSING ✗",
        })

        if (!SUPABASE_URL || !SUPABASE_KEY) {
          throw new Error("Supabase env vars missing")
        }

        // Direct fetch — no SDK
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/narratives?select=*&status=in.(emerging,active)&order=narrative_score.desc&limit=30`,
          {
            headers: {
              "apikey": SUPABASE_KEY,
              "Authorization": `Bearer ${SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (!res.ok) {
          const text = await res.text()
          throw new Error(`HTTP ${res.status}: ${text}`)
        }

        const data = await res.json()
        setTopStories(data.slice(0, 4))
        setStories(data.slice(4))
        setError(null)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  return (
    <PullToRefresh onRefresh={() => {}}>
      <div style={{ paddingBottom: 90 }}>

        {/* Header */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#0a0a0a", borderBottom: "1px solid #0d0d0d", padding: "14px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <SpilledLogo size={28} />
              <span style={{ fontSize: 20, fontWeight: 900, color: "#c8c8c8", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em" }}>spilled.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={{ width: 32, height: 32, borderRadius: "50%", background: "#111", border: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="#444" strokeWidth="1.5"/><path d="M2 14c0-2.76 2.69-5 6-5s6 2.24 6 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>

          <div className="hide-scrollbar" style={{ display: "flex", overflowX: "auto", paddingBottom: 12 }}>
            {CATEGORIES.map(cat => {
              const a = activeTab === cat
              return (
                <button key={cat} onClick={() => setActiveTab(cat)} style={{ background: "none", border: "none", borderRadius: 0, borderBottom: `1.5px solid ${a ? "#777" : "transparent"}`, padding: "2px 12px 8px", fontSize: 12, fontWeight: a ? 700 : 400, color: a ? "#c0c0c0" : "#333", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "color 0.15s" }}>
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Debug info — shows on screen */}
        {debugInfo && (
          <div style={{ margin: "12px 20px", padding: "10px 14px", background: "#111", border: "1px solid #222", borderRadius: 10 }}>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>DEBUG</div>
            <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace" }}>
              URL: {debugInfo.url}
            </div>
            <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace" }}>
              KEY: {debugInfo.key}
            </div>
            {error && (
              <div style={{ fontSize: 11, color: "#ff4422", fontFamily: "'DM Mono', monospace", marginTop: 6, wordBreak: "break-all" }}>
                ERR: {error}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "0 20px" }}>

          {/* Top Stories */}
          <div style={{ marginTop: 16, marginBottom: 28 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.16em", marginBottom: 14 }}>HOT SCOOPS</div>
            {topStories.length > 0 ? (
              <HotScoopsCarousel stories={topStories} onOpenStory={onOpenStory} />
            ) : (
              <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
                {[1,2].map(i => <div key={i} style={{ width: 190, height: 180, background: "#111", borderRadius: 18, flexShrink: 0 }} />)}
              </div>
            )}
          </div>

          {/* The Spill */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.16em", marginBottom: 4 }}>THE SPILL</div>

            {loading && [1,2,3].map(i => <RowSkeleton key={i} index={i} />)}

            {!loading && stories.length === 0 && !error && (
              <div style={{ padding: "40px 0", textAlign: "center" }}>
                <p style={{ fontSize: 13, color: "#333", fontFamily: "'DM Sans', sans-serif" }}>No stories yet.</p>
              </div>
            )}

            {!loading && stories.map((item, i) => (
              <SpillRow key={item.id} item={item} index={i} onClick={onOpenStory} saved={savedIds.includes(item.id)} onSave={onSave} />
            ))}
          </div>
        </div>
      </div>
    </PullToRefresh>
  )
    }
            

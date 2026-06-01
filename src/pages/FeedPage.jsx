import { useState } from "react"
import PullToRefresh from "../components/PullToRefresh"
import SpilledLogo from "../components/SpilledLogo"
import HotScoopsCarousel from "../components/HotScoopsCarousel"
import SpillRow from "../components/SpillRow"
import { RowSkeleton } from "../components/Skeleton"
import { useFeed, useTopStories } from "../hooks/useFeed"
import { CATEGORIES } from "../data/mockData"

function EmptyState() {
  return (
    <div style={{ padding: "60px 0", textAlign: "center" }}>
      <img src="/logo.png" alt="" width={36} height={36} style={{ borderRadius: 10, opacity: 0.15, margin: "0 auto 16px" }} />
      <p style={{ fontSize: 13, color: "#2a2a2a", fontFamily: "'DM Sans', sans-serif" }}>
        No stories yet. Check back soon.
      </p>
    </div>
  )
}

function ErrorState({ onRetry }) {
  return (
    <div style={{ padding: "60px 0", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: "#333", fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }}>
        Failed to load stories.
      </p>
      <button onClick={onRetry} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 30, padding: "8px 20px", fontSize: 11, color: "#666", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
        Try again
      </button>
    </div>
  )
}

export default function FeedPage({ onOpenStory, savedIds, onSave }) {
  const [activeTab, setActiveTab] = useState("For You")
  const { stories, loading, error, refreshing, refresh } = useFeed(activeTab)
  const { stories: topStories, loading: topLoading } = useTopStories()

  return (
    <PullToRefresh onRefresh={refresh} refreshing={refreshing}>
      <div style={{ paddingBottom: 90 }}>

        {/* Header */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#0a0a0a", borderBottom: "1px solid #0d0d0d", padding: "14px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <SpilledLogo size={28} />
              <span style={{ fontSize: 20, fontWeight: 900, color: "#c8c8c8", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em" }}>
                spilled.
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={{ width: 32, height: 32, borderRadius: "50%", background: "#111", border: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="#444" strokeWidth="1.5"/><path d="M10.5 10.5L14 14" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <button style={{ width: 32, height: 32, borderRadius: "50%", background: "#111", border: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="#444" strokeWidth="1.5"/><path d="M2 14c0-2.76 2.69-5 6-5s6 2.24 6 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="hide-scrollbar" style={{ display: "flex", overflowX: "auto", paddingBottom: 12 }}>
            {CATEGORIES.map(cat => {
              const a = activeTab === cat
              return (
                <button key={cat} onClick={() => setActiveTab(cat)} style={{
                  background: "none", border: "none", borderRadius: 0,
                  borderBottom: `1.5px solid ${a ? "#777" : "transparent"}`,
                  padding: "2px 12px 8px",
                  fontSize: 12, fontWeight: a ? 700 : 400,
                  color: a ? "#c0c0c0" : "#333",
                  cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                  transition: "color 0.15s, border-color 0.15s",
                }}>
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Hot Scoops */}
        <div style={{ marginTop: 24, marginBottom: 28 }}>
          <HotScoopsCarousel
            stories={topLoading ? [] : topStories}
            onOpenStory={onOpenStory}
          />
        </div>

        {/* The Spill */}
        <div style={{ padding: "0 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.16em", marginBottom: 2 }}>THE SPILL</div>
              <div style={{ fontSize: 11, color: "#2a2a2a", fontFamily: "'DM Sans', sans-serif" }}>Fresh updates and rising discussions</div>
            </div>
            <button style={{ background: "none", border: "none", fontSize: 10, color: "#2a2a2a", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 3 }}>
              Filter
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 3h10M3 6h6M5 9h2" stroke="#2a2a2a" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </button>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 3, top: 10, bottom: 0, width: 1, background: "linear-gradient(to bottom, #1e1e1e, transparent)" }} />
            {error && <ErrorState onRetry={refresh} />}
            {loading && !error && [1,2,3,4,5].map(i => <RowSkeleton key={i} index={i} />)}
            {!loading && !error && stories.length === 0 && <EmptyState />}
            {!loading && !error && stories.map((item, i) => (
              <SpillRow key={item.id} item={item} index={i} onClick={onOpenStory} saved={savedIds.includes(item.id)} onSave={onSave} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </PullToRefresh>
  )
}

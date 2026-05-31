import { useState } from "react"
import PullToRefresh from "../../components/PullToRefresh"
import { useFeed, useTopStories } from "../../hooks/useFeed"
import HotScoopsCarousel from "../../components/HotScoopsCarousel"
import SpillRow from "../../components/SpillRow"
import { RowSkeleton } from "../../components/Skeleton"
import FeedHeader from "./Header"
import EmptyState from "./EmptyState"

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

  const feedStories = stories.slice(0, 20)

  return (
    <PullToRefresh onRefresh={refresh} refreshing={refreshing}>
      <div style={{ paddingBottom: 90 }}>
        <FeedHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div style={{ marginTop: 24, marginBottom: 28 }}>
          <HotScoopsCarousel
            stories={topLoading ? [] : topStories}
            onOpenStory={onOpenStory}
          />
        </div>

        <div style={{ padding: "0 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.16em", marginBottom: 2 }}>THE SPILL</div>
              <div style={{ fontSize: 11, color: "#2a2a2a", fontFamily: "'DM Sans', sans-serif" }}>Fresh updates and rising discussions</div>
            </div>
            <button style={{ background: "none", border: "none", fontSize: 10, color: "#2a2a2a", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 3 }}>
              Filter
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M1 3h10M3 6h6M5 9h2" stroke="#2a2a2a" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 3, top: 10, bottom: 0, width: 1, background: "linear-gradient(to bottom, #1e1e1e, transparent)" }} />

            {error && <ErrorState onRetry={refresh} />}
            {loading && !error && [1,2,3,4,5].map(i => <RowSkeleton key={i} index={i} />)}
            {!loading && !error && feedStories.length === 0 && <EmptyState />}
            {!loading && !error && feedStories.map((item, i) => (
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

      <style>{`
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </PullToRefresh>
  )
}

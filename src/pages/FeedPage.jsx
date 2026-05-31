import { useState, useRef, useEffect, useCallback } from "react"
import PullToRefresh from "../components/PullToRefresh"
import StatusLabel from "../components/StatusLabel"
import { useFeed, useTopStories } from "../hooks/useFeed"
import { CATEGORIES } from "../data/mockData"

// ── STATIC LOGO ────────────────────────────────────────────────────────────
// Uses real PNG for all non-animated instances
function SpilledLogo({ size = 24 }) {
  return (
    <img
      src="/logo.png"
      alt="Spilled"
      width={size}
      height={size}
      style={{ borderRadius: size * 0.22, objectFit: "cover", display: "block" }}
    />
  )
}

// ── SKELETON ───────────────────────────────────────────────────────────────
function Skeleton({ w = "100%", h = 12, r = 6, mb = 0 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r, marginBottom: mb,
      background: "linear-gradient(90deg, #111 25%, #161616 50%, #111 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.6s infinite",
    }} />
  )
}

function CardSkeleton() {
  return (
    <div style={{ width: 200, flexShrink: 0, padding: "20px 18px", background: "#141414", borderRadius: 18, minHeight: 210, display: "flex", flexDirection: "column", gap: 12 }}>
      <Skeleton w={80} h={9} r={3} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <Skeleton h={14} />
        <Skeleton h={14} w="85%" />
        <Skeleton h={14} w="65%" />
      </div>
      <Skeleton h={11} w="60%" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Skeleton w={50} h={10} r={3} />
        <Skeleton w={28} h={28} r={14} />
      </div>
    </div>
  )
}

function RowSkeleton({ index }) {
  return (
    <div style={{ padding: "20px 0", borderBottom: "1px solid #0d0d0d", animation: `fadeUp 0.3s ease ${index * 0.06}s both`, display: "flex", gap: 14 }}>
      <div style={{ width: 8, paddingTop: 6, flexShrink: 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1a1a1a" }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <Skeleton w={70} h={9} r={3} />
          <Skeleton w={30} h={9} r={3} />
        </div>
        <Skeleton h={14} mb={6} />
        <Skeleton h={14} w="80%" mb={10} />
        <Skeleton h={11} w="65%" />
      </div>
    </div>
  )
}

// ── PHYSICAL CARD ──────────────────────────────────────────────────────────
function HotScoop({ story, rank, isActive, offset, onClick }) {
  const [pressed, setPressed] = useState(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchMoved = useRef(false)

  const elevation = isActive ? 1 : Math.max(0, 1 - Math.abs(offset) * 0.35)
  const tiltY = isActive ? 0 : offset * 2.5
  const scale = isActive ? 1 : 0.94 + elevation * 0.04
  const shadowOpacity = isActive ? 0.18 : 0.06 + elevation * 0.08

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchMoved.current = false
    setPressed(true)
  }
  const handleTouchMove = (e) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current)
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current)
    if (dx > 6 || dy > 6) { touchMoved.current = true; setPressed(false) }
  }
  const handleTouchEnd = () => {
    setPressed(false)
    if (!touchMoved.current) onClick(story)
  }

  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); onClick(story) }}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        width: 200, flexShrink: 0,
        padding: "20px 18px 18px",
        background: "#141414",
        borderRadius: 18, cursor: "pointer",
        transform: `perspective(600px) rotateY(${tiltY}deg) scale(${pressed ? scale * 0.97 : scale})`,
        transition: "transform 0.4s cubic-bezier(0.34,1.1,0.64,1), box-shadow 0.4s ease",
        boxShadow: isActive
          ? `0 0 0 1px rgba(255,255,255,0.07) inset, 0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 60px -10px rgba(255,255,255,${shadowOpacity * 0.3}), 0 40px 80px -20px rgba(0,0,0,0.8)`
          : `0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 0 rgba(255,255,255,0.03) inset, 0 10px 30px -8px rgba(255,255,255,${shadowOpacity * 0.2}), 0 20px 40px -12px rgba(0,0,0,0.6)`,
        minHeight: 210, display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}
    >
      {/* Rank + Status row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{
          fontSize: 28, fontWeight: 900,
          color: isActive ? "#2e2e2e" : "#1e1e1e",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1, letterSpacing: "-0.04em",
          transition: "color 0.3s ease",
        }}>
          {String(rank).padStart(2, "0")}
        </span>
        <StatusLabel status={story.status} size={9} />
      </div>

      <h3 style={{
        fontSize: isActive ? 16 : 13, fontWeight: 800,
        color: isActive ? "#e0e0e0" : "#777",
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.35, letterSpacing: "-0.02em",
        margin: "0 0 10px", flex: 1,
        transition: "font-size 0.3s ease, color 0.3s ease",
      }}>
        {story.headline}
      </h3>

      <p style={{
        fontSize: 11, color: isActive ? "#444" : "#2e2e2e",
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.5, margin: "0 0 16px",
        transition: "color 0.3s ease",
      }}>
        {story.summary}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: "#333", fontFamily: "'DM Mono', monospace" }}>
          {formatTimeAgo(story.created_at || story.timeAgo)}
        </span>
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: isActive ? 1 : 0.3, transition: "opacity 0.3s ease",
        }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

// ── HOT SCOOPS CAROUSEL ────────────────────────────────────────────────────
function HotScoopsCarousel({ stories, onOpenStory }) {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const CARD_WIDTH = 200
  const CARD_GAP = 12
  const CARD_STEP = CARD_WIDTH + CARD_GAP

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const index = Math.round(scrollRef.current.scrollLeft / CARD_STEP)
    setActiveIndex(Math.max(0, Math.min(index, stories.length - 1)))
  }, [stories.length, CARD_STEP])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  if (!stories.length) return (
    <div style={{ padding: "0 20px" }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.16em", marginBottom: 16 }}>HOT SCOOPS</div>
      <div style={{ display: "flex", gap: 12 }}>
        {[1,2,3].map(i => <CardSkeleton key={i} />)}
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, padding: "0 20px" }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.16em" }}>HOT SCOOPS</span>
        <span style={{ fontSize: 9, color: "#2a2a2a", fontFamily: "'DM Mono', monospace" }}>{activeIndex + 1} / {stories.length}</span>
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar"
        style={{
          display: "flex", gap: CARD_GAP,
          overflowX: "auto",
          paddingLeft: 20, paddingRight: 20,
          paddingBottom: 24, paddingTop: 10,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          marginTop: -10,
        }}
      >
        {stories.map((story, i) => (
          <div key={story.id} style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
            <HotScoop
              story={story}
              rank={i + 1}
              isActive={i === activeIndex}
              offset={i - activeIndex}
              onClick={onOpenStory}
            />
          </div>
        ))}
        <div style={{ width: 1, flexShrink: 0 }} />
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: -12, marginBottom: 4 }}>
        {stories.map((_, i) => (
          <div key={i} style={{
            width: i === activeIndex ? 16 : 4, height: 4, borderRadius: 2,
            background: i === activeIndex ? "#444" : "#1e1e1e",
            transition: "width 0.3s cubic-bezier(0.34,1.2,0.64,1), background 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  )
}

// ── SPILL ROW ──────────────────────────────────────────────────────────────
function SpillRow({ item, onClick, saved, onSave, index }) {
  const [pressed, setPressed] = useState(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchMoved = useRef(false)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchMoved.current = false
    setPressed(true)
  }
  const handleTouchMove = (e) => {
    if (Math.abs(e.touches[0].clientY - touchStartY.current) > 6) {
      touchMoved.current = true; setPressed(false)
    }
  }
  const handleTouchEnd = () => {
    setPressed(false)
    if (!touchMoved.current) onClick(item)
  }

  return (
    <div style={{ animation: `fadeUp 0.3s ease ${index * 0.05}s both` }}>
      <div
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => { setPressed(false); onClick(item) }}
        onMouseLeave={() => setPressed(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          padding: "20px 0", cursor: "pointer",
          borderBottom: "1px solid #0d0d0d",
          background: pressed ? "#0d0d0d" : "transparent",
          transition: "background 0.12s ease",
          display: "flex", alignItems: "flex-start", gap: 14,
        }}
      >
        {/* Timeline dot */}
        <div style={{ flexShrink: 0, paddingTop: 5, width: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: item.status === "COOLING DOWN" ? "#181818" : "#2a2a2a",
            border: `1.5px solid ${item.status === "COOLING DOWN" ? "#1e1e1e" : "#333"}`,
          }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <StatusLabel status={item.status} size={9} />
            <span style={{ fontSize: 10, color: "#2e2e2e", fontFamily: "'DM Mono', monospace" }}>
              · {formatTimeAgo(item.created_at || item.timeAgo)}
            </span>
          </div>
          <h3 style={{
            fontSize: 15, fontWeight: 700, color: "#c0c0c0",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.4, letterSpacing: "-0.02em", margin: "0 0 6px",
          }}>
            {item.headline}
          </h3>
          <p style={{ fontSize: 12, color: "#444", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, margin: 0 }}>
            {item.summary}
          </p>
        </div>

        {/* Bookmark */}
        <button
          onClick={e => { e.stopPropagation(); onSave(item.id) }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 0, flexShrink: 0, paddingTop: 2,
            opacity: saved ? 0.8 : 0.15,
            transition: "opacity 0.2s, transform 0.15s",
            transform: saved ? "scale(1.1)" : "scale(1)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill={saved ? "#ccc" : "none"} stroke="#ccc" strokeWidth="1.5">
            <path d="M2 2h10v11l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ── HELPERS ────────────────────────────────────────────────────────────────
function formatTimeAgo(val) {
  if (!val) return "just now"
  // If it's already a string like "2h ago" just return it
  if (typeof val === "string" && val.includes("ago")) return val
  const diff = Date.now() - new Date(val).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

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

// ── FEED PAGE ──────────────────────────────────────────────────────────────
export default function FeedPage({ onOpenStory, savedIds, onSave }) {
  const [activeTab, setActiveTab] = useState("For You")
  const { stories, loading, error, refreshing, refresh } = useFeed(activeTab)
  const { stories: topStories, loading: topLoading } = useTopStories()

  const feedStories = stories.slice(0, 20)

  return (
    <PullToRefresh onRefresh={refresh} refreshing={refreshing}>
      <div style={{ paddingBottom: 90 }}>

        {/* ── HEADER ── */}
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "#0a0a0a",
          borderBottom: "1px solid #0d0d0d",
          padding: "14px 20px 0",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>

            {/* Static logo + wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <SpilledLogo size={28} />
              <span style={{
                fontSize: 20, fontWeight: 900, color: "#c8c8c8",
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em",
              }}>
                spilled.
              </span>
            </div>

            {/* Right icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={{ width: 32, height: 32, borderRadius: "50%", background: "#111", border: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="4.5" stroke="#444" strokeWidth="1.5"/>
                  <path d="M10.5 10.5L14 14" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <button style={{ width: 32, height: 32, borderRadius: "50%", background: "#111", border: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="6" r="3" stroke="#444" strokeWidth="1.5"/>
                  <path d="M2 14c0-2.76 2.69-5 6-5s6 2.24 6 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
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

        {/* ── HOT SCOOPS ── */}
        <div style={{ marginTop: 24, marginBottom: 28 }}>
          <HotScoopsCarousel
            stories={topLoading ? [] : topStories}
            onOpenStory={onOpenStory}
          />
        </div>

        {/* ── THE SPILL ── */}
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

          {/* Timeline */}
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
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1

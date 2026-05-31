import { useRef, useState, useEffect, useCallback } from "react"
import HotScoop from "./HotScoop"
import { CardSkeleton } from "./Skeleton"

export default function HotScoopsCarousel({ stories, onOpenStory }) {
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

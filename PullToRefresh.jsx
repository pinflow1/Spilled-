import { useState, useRef } from "react"
import DrippingS from "./DrippingS"

export default function PullToRefresh({ onRefresh, children }) {
  const [pullY, setPullY] = useState(0)
  const [pulling, setPulling] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef(0)
  const THRESHOLD = 72

  const onTouchStart = (e) => { startY.current = e.touches[0].clientY }

  const onTouchMove = (e) => {
    const dy = e.touches[0].clientY - startY.current
    if (dy > 0 && window.scrollY === 0) {
      setPulling(true)
      setPullY(Math.min(dy * 0.5, THRESHOLD + 20))
    }
  }

  const onTouchEnd = () => {
    if (pullY >= THRESHOLD) {
      setRefreshing(true)
      setPullY(THRESHOLD)
      setTimeout(() => {
        onRefresh && onRefresh()
        setRefreshing(false)
        setPulling(false)
        setPullY(0)
      }, 1400)
    } else {
      setPulling(false)
      setPullY(0)
    }
  }

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{ position: "relative" }}>
      {/* Pull indicator */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", justifyContent: "center", alignItems: "center",
        height: pullY, overflow: "hidden", pointerEvents: "none",
        transition: pulling && pullY < THRESHOLD ? "none" : "height 0.4s cubic-bezier(0.34,1.2,0.64,1)",
      }}>
        {(pulling || refreshing) && pullY > 10 && (
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: "#1a1a1a", border: "1px solid #2a2a2a",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: Math.min(pullY / THRESHOLD, 1),
          }}>
            <DrippingS size={24} animating={refreshing} color="#f5f5f7" />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{
        transform: `translateY(${pullY}px)`,
        transition: pulling ? "none" : "transform 0.4s cubic-bezier(0.34,1.2,0.64,1)",
      }}>
        {children}
      </div>
    </div>
  )
}

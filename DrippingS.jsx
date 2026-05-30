import { useRef, useState, useEffect } from "react"

const S_PATH = "M140 140 H340 C390 140 390 220 340 220 H180 C130 220 130 300 180 300 H340 C390 300 390 380 340 380 H190 C155 380 145 398 145 425 C145 445 150 455 155 465"
const DROP_PATH = "M155 465 C135 480 135 510 155 525 C175 540 205 532 212 505 C218 482 195 465 175 458 C168 456 162 458 155 465 Z"

export default function DrippingS({ size = 32, animating = false, color = "#f5f5f7" }) {
  const strokeRef = useRef(null)
  const rafRef = useRef(null)
  const [pathLen, setPathLen] = useState(0)
  const [dashOffset, setDashOffset] = useState(0)
  const [dropOpacity, setDropOpacity] = useState(1)

  // Measure path length on mount
  useEffect(() => {
    if (strokeRef.current) {
      const len = strokeRef.current.getTotalLength()
      setPathLen(len)
    }
  }, [])

  // Reset to fully visible when not animating
  useEffect(() => {
    if (!animating) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setDashOffset(0)
      setDropOpacity(1)
    }
  }, [animating])

  // Animate drip: S draws top → bottom, drop fades in at end
  useEffect(() => {
    if (!animating || !pathLen) return

    setDashOffset(pathLen)
    setDropOpacity(0)

    let start = null
    const strokeDuration = 1000
    const dropDelay = 900

    const step = (ts) => {
      if (!start) start = ts
      const elapsed = ts - start

      // Draw S stroke
      const strokeProgress = Math.min(elapsed / strokeDuration, 1)
      const eased = 1 - Math.pow(1 - strokeProgress, 2.8)
      setDashOffset(pathLen * (1 - eased))

      // Fade in drop near end
      const dropProgress = Math.max(0, (elapsed - dropDelay) / 250)
      setDropOpacity(Math.min(dropProgress, 1))

      if (elapsed < strokeDuration + 300) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [animating, pathLen])

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ghost path — faint guide */}
      <path
        d={S_PATH}
        stroke={`${color}18`}
        strokeWidth="40"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Animated stroke */}
      <path
        ref={strokeRef}
        d={S_PATH}
        stroke={color}
        strokeWidth="40"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray={pathLen || 9999}
        strokeDashoffset={dashOffset}
      />
      {/* Drip drop */}
      <path
        d={DROP_PATH}
        fill={color}
        opacity={dropOpacity}
      />
    </svg>
  )
}

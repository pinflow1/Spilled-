import { useState, useEffect, useRef } from "react";

const TABS = [
  {
    id: "feed", label: "Feed",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10.5L10 4l7 6.5" stroke={a ? "#f5f5f7" : "#888"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 9v7h4v-4h2v4h4V9" stroke={a ? "#f5f5f7" : "#888"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  // ... other tabs exactly as you defined them
];

export default function BottomNav({ active, onChange }) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [scrollOpacity, setScrollOpacity] = useState(0.85);
  const tabRefs = useRef({});

  useEffect(() => {
    const activeTabElement = tabRefs.current[active];
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [active]);

  // Optional: dynamic opacity based on scroll (iOS-like)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.min(0.95, 0.7 + scrollY * 0.002);
      setScrollOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 16,
          right: 16,
          zIndex: 100,
          // Liquid glass core
          background: `rgba(20, 20, 25, ${scrollOpacity})`,
          backdropFilter: "blur(32px)",
          borderRadius: 60,
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          // Glossy overlay (white gradient)
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glossy reflection layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0))",
            pointerEvents: "none",
            borderRadius: "60px 60px 0 0",
          }}
        />

        {/* Sliding indicator – liquid glass pill */}
        <div
          style={{
            position: "absolute",
            top: 6,
            bottom: 6,
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            background: "rgba(255, 255, 255, 0.12)",
            borderRadius: 50,
            transition: "left 0.35s cubic-bezier(0.34, 1.2, 0.64, 1), width 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)",
            pointerEvents: "none",
            backdropFilter: "blur(4px)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), 0 0 12px rgba(0,0,0,0.2)",
          }}
        />

        {/* Buttons */}
        <div style={{ display: "flex", padding: "6px 8px", gap: 2 }}>
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[tab.id] = el)}
                onClick={() => onChange(tab.id)}
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 4px",
                  borderRadius: 50,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                  zIndex: 2,
                }}
              >
                {tab.icon(isActive)}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#f5f5f7" : "#999",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.15s ease",
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional: extra bottom padding for safe area */}
      <div style={{ height: 80 }} />
    </>
  );
        }

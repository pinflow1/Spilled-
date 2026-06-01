import { useState, useEffect, useRef } from "react";

const TABS = [
  {
    id: "feed", label: "Feed",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10.5L10 4l7 6.5" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 9v7h4v-4h2v4h4V9" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "search", label: "Search",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="5.5" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8"/>
        <path d="M13.5 13.5L17 17" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: "alerts", label: "Alerts",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3C7.24 3 5 5.24 5 8v5l-1.5 2h13L15 13V8c0-2.76-2.24-5-5-5z" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M8 16c0 1.1.9 2 2 2s2-.9 2-2" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8"/>
      </svg>
    )
  },
  {
    id: "saved", label: "Saved",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill={a ? "#f5f5f7" : "none"}>
        <path d="M5 3h10v14l-5-3-5 3V3z" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "profile", label: "Profile",
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3.5" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8"/>
        <path d="M3 17c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke={a ? "#f5f5f7" : "#444"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )
  },
];

export default function BottomNav({ active, onChange }) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef({});

  useEffect(() => {
    const activeTabElement = tabRefs.current[active];
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [active]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          right: 16,
          zIndex: 100,
          position: "relative", // 👈 makes absolute child position relative to this container
          background: "rgba(10, 10, 10, 0.75)",
          backdropFilter: "blur(28px)",
          borderRadius: 100,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          padding: "6px 8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          WebkitTapHighlightColor: "transparent", // 👈 kill blue flash on container
        }}
      >
        {/* Sliding indicator */}
        <div
          style={{
            position: "absolute",
            top: 6,
            bottom: 6,
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            background: "rgba(255, 255, 255, 0.12)",
            borderRadius: 100,
            transition: "left 0.35s cubic-bezier(0.34, 1.2, 0.64, 1), width 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)",
            pointerEvents: "none",
            backdropFilter: "blur(8px)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15), 0 0 12px rgba(255,255,255,0.05)",
          }}
        />

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
                borderRadius: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: isActive ? "scale(1.05)" : "scale(1)",
                zIndex: 2,
                WebkitTapHighlightColor: "transparent", // 👈 kill blue flash on each button
              }}
            >
              {tab.icon(isActive)}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#f5f5f7" : "#444",
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

      {/* Safe area */}
      <style>{`
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          body {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </>
  );
}

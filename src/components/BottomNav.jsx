import { useState, useEffect, useRef } from "react";

const TABS = [ /* your tabs – exactly as you had them, unchanged */ ];

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
          // Only change: remove blue flash on container taps
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {/* Sliding indicator – unchanged */}
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
                // Only change: remove blue flash on each button
                WebkitTapHighlightColor: "transparent",
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

import SpilledLogo from "../../components/SpilledLogo";
import { CATEGORIES } from "../../data/mockData";

export default function FeedHeader({ activeTab, onTabChange }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#0a0a0a",
        borderBottom: "1px solid #0d0d0d",
        padding: "14px 20px 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <SpilledLogo size={28} />
          <span
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#c8c8c8",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            spilled.
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#111",
              border: "1px solid #1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="#444" strokeWidth="1.5" />
              <path d="M10.5 10.5L14 14" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#111",
              border: "1px solid #1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="6" r="3" stroke="#444" strokeWidth="1.5" />
              <path d="M2 14c0-2.76 2.69-5 6-5s6 2.24 6 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="hide-scrollbar" style={{ display: "flex", overflowX: "auto", paddingBottom: 12 }}>
        {CATEGORIES.map((cat) => {
          const a = activeTab === cat;
          return (
            <button
              key={cat}
              onClick={() => onTabChange(cat)}
              style={{
                background: "none",
                border: "none",
                borderRadius: 0,
                borderBottom: `1.5px solid ${a ? "#777" : "transparent"}`,
                padding: "2px 12px 8px",
                fontSize: 12,
                fontWeight: a ? 700 : 400,
                color: a ? "#c0c0c0" : "#333",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "color 0.15s, border-color 0.15s",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

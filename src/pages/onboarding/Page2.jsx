import { skipLink } from "./styles";

const NICHES = [
  { id: "celebrity",   label: "Celebrity & Drama",      desc: "Tea, beef, gossip" },
  { id: "tech",        label: "Tech & Startups",         desc: "Founders, products, drama" },
  { id: "creators",    label: "Creators & Influencers",  desc: "YouTube, TikTok, beef" },
  { id: "sports",      label: "Sports",                  desc: "Athletes, transfers, tea" },
  { id: "gaming",      label: "Gaming",                  desc: "Drops, drama, culture" },
  { id: "finance",     label: "Finance & Business",      desc: "Markets, scandals, moves" },
  { id: "politics",    label: "Politics & News",         desc: "Power, receipts, takes" },
  { id: "beauty",      label: "Beauty & Fashion",        desc: "Drops, drama, trends" },
  { id: "truecrime",   label: "True Crime",              desc: "Cases, updates, threads" },
  { id: "all",         label: "All of the above",        desc: "Give me everything" },
];

export default function Page2({ selected, onToggle, onNext, onSkip }) {
  const hasSelection = selected.length > 0;

  return (
    <div style={{
      position: "relative", minHeight: "100vh", background: "#0a0a0a",
      padding: "80px 24px 48px", display: "flex", flexDirection: "column",
    }}>
      <div style={{ maxWidth: 500, margin: "0 auto", width: "100%" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: "#444",
            fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", marginBottom: 10,
          }}>
            YOUR VIBE
          </div>
          <h2 style={{
            fontSize: 26, fontWeight: 800, color: "#f0f0f0", marginBottom: 8,
            fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em",
          }}>
            What's your niche?
          </h2>
          <p style={{ fontSize: 14, color: "#555", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
            We'll push you stories that hit hardest in your space.
          </p>
        </div>

        {/* Niche list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 36 }}>
          {NICHES.map(n => {
            const isSelected = selected.includes(n.id);
            return (
              <button
                key={n.id}
                onClick={() => onToggle(n.id)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 18px",
                  background: isSelected ? "#ffffff08" : "#0d0d0d",
                  border: `1px solid ${isSelected ? "#444" : "#1a1a1a"}`,
                  borderRadius: 16, cursor: "pointer", width: "100%", textAlign: "left",
                  transition: "all 0.18s cubic-bezier(0.34,1.2,0.64,1)",
                  transform: isSelected ? "scale(1.01)" : "scale(1)",
                }}
              >
                <div>
                  <div style={{
                    fontSize: 14, fontWeight: 700,
                    color: isSelected ? "#e0e0e0" : "#888",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 2,
                    transition: "color 0.15s ease",
                  }}>
                    {n.label}
                  </div>
                  <div style={{
                    fontSize: 11, color: isSelected ? "#555" : "#333",
                    fontFamily: "'DM Mono', monospace",
                    transition: "color 0.15s ease",
                  }}>
                    {n.desc}
                  </div>
                </div>
                {/* Checkmark */}
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: isSelected ? "#f0f0f0" : "transparent",
                  border: `1px solid ${isSelected ? "#f0f0f0" : "#2a2a2a"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}>
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          onClick={onNext}
          disabled={!hasSelection}
          style={{
            background: hasSelection ? "#f0f0f0" : "#111",
            border: `1px solid ${hasSelection ? "transparent" : "#1a1a1a"}`,
            borderRadius: 44, padding: "15px 24px",
            fontSize: 15, fontWeight: 700,
            color: hasSelection ? "#0a0a0a" : "#333",
            cursor: hasSelection ? "pointer" : "not-allowed",
            width: "100%", fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.25s ease",
          }}
        >
          {hasSelection
            ? `Build my feed — ${selected.length} niche${selected.length > 1 ? "s" : ""}`
            : "Pick at least one"
          }
        </button>

        {skipLink(onSkip)}
      </div>
    </div>
  );
            }

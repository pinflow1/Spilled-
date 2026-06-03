import { useState } from "react";
import { skipLink } from "./styles";

// Expanded niche list – you can move this to mockData.js later
const ALL_NICHES = [
  { id: "celebrity",   label: "Celebrity & Drama",      desc: "Tea, beef, gossip" },
  { id: "tech",        label: "Tech & Startups",         desc: "Founders, products, drama" },
  { id: "creators",    label: "Creators & Influencers",  desc: "YouTube, TikTok, beef" },
  { id: "sports",      label: "Sports",                  desc: "Athletes, transfers, tea" },
  { id: "gaming",      label: "Gaming",                  desc: "Drops, drama, culture" },
  { id: "finance",     label: "Finance & Business",      desc: "Markets, scandals, moves" },
  { id: "politics",    label: "Politics & News",         desc: "Power, receipts, takes" },
  { id: "beauty",      label: "Beauty & Fashion",        desc: "Drops, drama, trends" },
  { id: "truecrime",   label: "True Crime",              desc: "Cases, updates, threads" },
  { id: "ai",          label: "AI & Tools",              desc: "GPT, models, weird demos" },
  { id: "indiehack",   label: "Indie Hacking",           desc: "Solo devs, launches, wins" },
  { id: "saasdrama",   label: "SaaS Drama",              desc: "Pricing, competitors, roast" },
  { id: "memes",       label: "Memes & Virality",        desc: "Formats, early signals" },
  { id: "marketing",   label: "Growth Marketing",        desc: "Tactics, case studies" },
  { id: "podcast",     label: "Podcasting",              desc: "Clips, controversies" },
  { id: "newsletter",  label: "Newsletters",             desc: "Growth, monetization" },
  { id: "all",         label: "All of the above",        desc: "Give me everything" },
];

export default function Page2({ selected, onToggle, onNext, onSkip }) {
  const [search, setSearch] = useState("");
  const hasSelection = selected.length > 0;

  const filteredNiches = ALL_NICHES.filter(n =>
    n.label.toLowerCase().includes(search.toLowerCase()) ||
    n.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      position: "relative", minHeight: "100vh", background: "#0a0a0a",
      padding: "80px 24px 48px", display: "flex", flexDirection: "column",
    }}>
      <div style={{ maxWidth: 500, margin: "0 auto", width: "100%" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
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
          <p style={{ fontSize: 14, color: "#555", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, marginBottom: 24 }}>
            We'll push you stories that hit hardest in your space.
          </p>
        </div>

        {/* Search bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            background: "#0d0d0d",
            border: "1px solid #1a1a1a",
            borderRadius: 40,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="#555" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="search"
              placeholder="Search niches…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "#f0f0f0",
                fontFamily: "'DM Sans', sans-serif",
                width: "100%",
              }}
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Niche list – filtered */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 36, maxHeight: "50vh", overflowY: "auto", paddingRight: 4 }}>
          {filteredNiches.length === 0 && (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#444", fontSize: 13 }}>
              No niches match "{search}"
            </div>
          )}
          {filteredNiches.map(n => {
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
                  }}>
                    {n.label}
                  </div>
                  <div style={{
                    fontSize: 11, color: isSelected ? "#555" : "#333",
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    {n.desc}
                  </div>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: isSelected ? "#f0f0f0" : "transparent",
                  border: `1px solid ${isSelected ? "#f0f0f0" : "#2a2a2a"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
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

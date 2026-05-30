import { useState, useEffect, useRef } from "react";
import DrippingS from "../components/DrippingS";

const CONTENT_FORMATS = [
  { id: "youtube", label: "YouTube" },
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "x", label: "X / Twitter" },
  { id: "newsletter", label: "Newsletter" },
  { id: "podcast", label: "Podcast" },
  { id: "all", label: "All platforms" },
];

export default function Onboarding({ onComplete, onSkip }) {
  const [page, setPage] = useState(0);
  const [formats, setFormats] = useState([]);
  const [email, setEmail] = useState("");
  const [animIn, setAnimIn] = useState(true);
  const containerRef = useRef(null);

  const nextPage = () => {
    setAnimIn(false);
    setTimeout(() => {
      setPage(p => p + 1);
      setAnimIn(true);
      if (containerRef.current) containerRef.current.scrollTop = 0;
    }, 220);
  };

  const skipToFeed = () => {
    if (onSkip) onSkip();
    else onComplete({ skipped: true });
  };

  const completeOnboarding = () => {
    onComplete({ formats, email, skipped: false });
  };

  const toggleFormat = (id) => {
    if (id === "all") {
      setFormats(formats.includes("all") ? [] : ["all"]);
    } else {
      setFormats(prev =>
        prev.includes(id) ? prev.filter(f => f !== id) : [...prev.filter(f => f !== "all"), id]
      );
    }
  };

  const pageStyle = {
    position: "relative",
    minHeight: "100vh",
    background: "#0a0a0a",
    padding: "80px 24px 48px",
    display: "flex",
    flexDirection: "column",
  };

  const contentStyle = {
    opacity: animIn ? 1 : 0,
    transform: animIn ? "translateY(0)" : "translateY(10px)",
    transition: "opacity 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
    maxWidth: 500,
    margin: "0 auto",
    width: "100%",
  };

  const skipLink = (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <button
        onClick={skipToFeed}
        style={{
          background: "none",
          border: "none",
          color: "#555",
          fontSize: 13,
          fontFamily: "'DM Mono', monospace",
          cursor: "pointer",
          padding: "8px 16px",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#888"}
        onMouseLeave={e => e.currentTarget.style.color = "#555"}
      >
        Skip to feed
      </button>
    </div>
  );

  // Page 0 – The Problem
  if (page === 0) {
    return (
      <div style={pageStyle} ref={containerRef}>
        <div style={contentStyle}>
          <div style={{ marginBottom: 40, display: "flex", justifyContent: "center" }}>
            <DrippingS size={56} color="#f5f5f7" />
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#888",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.2em",
              marginBottom: 12,
              textAlign: "center",
            }}>
              THE CREATOR'S DILEMMA
            </div>
            <h1 style={{
              fontSize: 34,
              fontWeight: 800,
              color: "#f5f5f7",
              lineHeight: 1.2,
              fontFamily: "'DM Sans', sans-serif",
              textAlign: "center",
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}>
              Most creators find trends after they peak.
            </h1>
            <p style={{
              fontSize: 16,
              color: "#aaa",
              textAlign: "center",
              lineHeight: 1.5,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              By the time you see it, your window is gone.
            </p>
          </div>

          <div style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: 28,
            padding: 24,
            margin: "32px 0",
          }}>
            <div style={{ display: "flex", alignItems: "flex-end", height: 80, gap: 6, marginBottom: 16 }}>
              {[8, 18, 32, 58, 78, 100, 94, 82, 68, 52, 38, 28].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h * 0.7}px`,
                    background: i < 4 ? "#00d4aa" : "#333",
                    borderRadius: 8,
                    transition: "height 0.2s ease",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555" }}>
              <span style={{ borderLeft: "2px solid #00d4aa", paddingLeft: 6 }}>Spilled finds you here</span>
              <span style={{ borderLeft: "2px solid #333", paddingLeft: 6 }}>Everyone else</span>
            </div>
          </div>

          <button
            onClick={nextPage}
            style={{
              background: "#f5f5f7",
              border: "none",
              borderRadius: 44,
              padding: "16px 24px",
              fontSize: 17,
              fontWeight: 600,
              color: "#0a0a0a",
              cursor: "pointer",
              width: "100%",
              fontFamily: "'DM Sans', sans-serif",
              transition: "transform 0.15s cubic-bezier(0.2, 1.3, 0.4, 1)",
            }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Show me the difference
          </button>
          {skipLink}
        </div>
      </div>
    );
  }

  // Page 1 – How it works (Thread format)
  if (page === 1) {
    return (
      <div style={pageStyle} ref={containerRef}>
        <div style={contentStyle}>
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#888",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.1em",
              marginBottom: 12,
            }}>
              HOW IT WORKS
            </div>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#f5f5f7",
              marginBottom: 12,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.02em",
            }}>
              The Thread, not a headline.
            </h2>
            <p style={{
              fontSize: 16,
              color: "#aaa",
              lineHeight: 1.5,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              We stitch together posts, comments, and sources so you see the full arc of a story – from first signal to blow‑up.
            </p>
          </div>

          <div style={{
            background: "#0d0d0d",
            border: "1px solid #222",
            borderRadius: 24,
            padding: 20,
            marginBottom: 32,
          }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 36,
                height: 36,
                background: "#1a1a1a",
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <DrippingS size={20} color="#888" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f5f5f7" }}>Spilled</div>
                <div style={{ fontSize: 12, color: "#555" }}>3 hours ago</div>
              </div>
            </div>
            <p style={{
              fontSize: 15,
              color: "#ddd",
              marginBottom: 16,
              lineHeight: 1.5,
            }}>
              "This startup's viral tweet wasn't luck – here's the breakdown of every step they took to manufacture the hype."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, color: "#555", fontFamily: "'DM Mono', monospace" }}>via Reddit r/marketing</span>
              <span style={{ fontSize: 11, color: "#555" }}>·</span>
              <span style={{ fontSize: 11, color: "#555" }}>234 comments</span>
            </div>
          </div>

          <button
            onClick={nextPage}
            style={{
              background: "#f5f5f7",
              border: "none",
              borderRadius: 44,
              padding: "16px 24px",
              fontSize: 17,
              fontWeight: 600,
              color: "#0a0a0a",
              cursor: "pointer",
              width: "100%",
              fontFamily: "'DM Sans', sans-serif",
              transition: "transform 0.15s cubic-bezier(0.2, 1.3, 0.4, 1)",
            }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            What should I track?
          </button>
          {skipLink}
        </div>
      </div>
    );
  }

  // Page 2 – Your creator stack (no emojis, clean list)
  if (page === 2) {
    return (
      <div style={pageStyle} ref={containerRef}>
        <div style={contentStyle}>
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#888",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}>
              YOUR CREATOR STACK
            </div>
            <h2 style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#f5f5f7",
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Where do you create?
            </h2>
            <p style={{
              fontSize: 15,
              color: "#888",
              lineHeight: 1.4,
            }}>
              We'll prioritize trends that work best for your platform.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
            {CONTENT_FORMATS.map(format => {
              const isSelected = formats.includes(format.id);
              return (
                <button
                  key={format.id}
                  onClick={() => toggleFormat(format.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    background: isSelected ? "#ffffff10" : "#0d0d0d",
                    border: `1px solid ${isSelected ? "#555" : "#222"}`,
                    borderRadius: 20,
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    transition: "all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                    transform: isSelected ? "scale(1.01)" : "scale(1)",
                  }}
                >
                  <span style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: isSelected ? "#f5f5f7" : "#aaa",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {format.label}
                  </span>
                  {isSelected && (
                    <span style={{ fontSize: 14, color: "#f5f5f7" }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={nextPage}
            style={{
              background: "#f5f5f7",
              border: "none",
              borderRadius: 44,
              padding: "16px 24px",
              fontSize: 17,
              fontWeight: 600,
              color: "#0a0a0a",
              cursor: "pointer",
              width: "100%",
              fontFamily: "'DM Sans', sans-serif",
              transition: "transform 0.15s cubic-bezier(0.2, 1.3, 0.4, 1)",
            }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Build my feed
          </button>
          {skipLink}
        </div>
      </div>
    );
  }

  // Page 3 – Email capture (free tier)
  return (
    <div style={pageStyle} ref={containerRef}>
      <div style={contentStyle}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
            <DrippingS size={48} color="#555" />
          </div>
          <h2 style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#f5f5f7",
            marginBottom: 8,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            You're in.
          </h2>
          <p style={{
            fontSize: 16,
            color: "#aaa",
            lineHeight: 1.4,
            marginBottom: 8,
          }}>
            We'll send you a daily brief – or check the app anytime.
          </p>
          <p style={{
            fontSize: 14,
            color: "#555",
            fontFamily: "'DM Mono', monospace",
          }}>
            First 30 days: full access. No card.
          </p>
        </div>

        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            background: "#111",
            border: `1px solid ${email ? "#666" : "#222"}`,
            borderRadius: 44,
            padding: "16px 20px",
            fontSize: 16,
            color: "#f5f5f7",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 16,
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={e => e.currentTarget.style.borderColor = "#888"}
          onBlur={e => e.currentTarget.style.borderColor = email ? "#666" : "#222"}
        />

        <button
          onClick={completeOnboarding}
          style={{
            background: "#f5f5f7",
            border: "none",
            borderRadius: 44,
            padding: "16px 24px",
            fontSize: 17,
            fontWeight: 600,
            color: "#0a0a0a",
            cursor: "pointer",
            width: "100%",
            fontFamily: "'DM Sans', sans-serif",
            transition: "transform 0.15s cubic-bezier(0.2, 1.3, 0.4, 1)",
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Start my briefing
        </button>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            onClick={skipToFeed}
            style={{
              background: "none",
              border: "none",
              color: "#555",
              fontSize: 13,
              fontFamily: "'DM Mono', monospace",
              cursor: "pointer",
              padding: "8px 16px",
            }}
          >
            No thanks, take me to the feed
          </button>
        </div>
      </div>
    </div>
  );
}

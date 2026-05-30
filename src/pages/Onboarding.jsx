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

  // Page 0 – Original brand intro
  if (page === 0) {
    return (
      <div style={pageStyle} ref={containerRef}>
        <div style={contentStyle}>
          <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
            <DrippingS size={64} color="#f5f5f7" />
          </div>
          <h1 style={{
            fontSize: 48,
            fontWeight: 900,
            margin: "0 0 12px",
            color: "#f5f5f7",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "-0.04em",
            textAlign: "center",
          }}>
            spilled.
          </h1>
          <p style={{
            fontSize: 16,
            color: "#888",
            margin: "0 0 48px",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: 260,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            The internet's messy. We track it before everyone else does.
          </p>
          <button
            onClick={nextPage}
            style={{
              background: "#f5f5f7",
              border: "none",
              borderRadius: 50,
              padding: "15px 44px",
              fontSize: 16,
              fontWeight: 800,
              color: "#0a0a0a",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.01em",
              width: "100%",
              transition: "transform 0.15s cubic-bezier(0.2, 1.3, 0.4, 1)",
            }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Get early access
          </button>
          <p style={{
            fontSize: 12,
            color: "#333",
            marginTop: 14,
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            No credit card required
          </p>
          {skipLink}
        </div>
      </div>
    );
  }

  // Page 1 – The Thread format + line chart
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
              We detect accelerating trends before they peak – and stitch the full story from first signal to blow‑up.
            </p>
          </div>

          {/* Line chart showing trend detection */}
          <div style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: 24,
            padding: 20,
            marginBottom: 24,
          }}>
            <svg width="100%" height="80" viewBox="0 0 400 80" preserveAspectRatio="none">
              <path
                d="M0,70 L40,60 L80,55 L120,40 L160,25 L200,15 L240,20 L280,40 L320,55 L360,65 L400,70"
                stroke="#00d4aa"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Shaded area under curve */}
              <path
                d="M0,70 L40,60 L80,55 L120,40 L160,25 L200,15 L240,20 L280,40 L320,55 L360,65 L400,70 L400,80 L0,80 Z"
                fill="#00d4aa20"
              />
              {/* Marker for "Spilled finds you here" */}
              <circle cx="200" cy="15" r="4" fill="#00d4aa" />
              <text x="210" y="10" fontSize="8" fill="#00d4aa" fontFamily="'DM Mono', monospace">Spilled</text>
              {/* Marker for peak */}
              <circle cx="280" cy="40" r="3" fill="#555" />
              <text x="285" y="44" fontSize="8" fill="#555" fontFamily="'DM Mono', monospace">Everyone else</text>
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "#555" }}>
              <span>Early signal</span>
              <span>Accelerating</span>
              <span>Peak</span>
              <span>Cooling</span>
            </div>
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

  // Page 2 – Where do you create? (content formats)
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

  // Page 3 – Original email capture (with Google button)
  return (
    <div style={pageStyle} ref={containerRef}>
      <div style={contentStyle}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
            <DrippingS size={48} color="#555" />
          </div>
          <h2 style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#f5f5f7",
            marginBottom: 8,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "-0.02em",
          }}>
            You're almost in
          </h2>
          <p style={{
            fontSize: 14,
            color: "#888",
            marginBottom: 24,
          }}>
            Free account. No card needed.
          </p>
        </div>

        <button
          style={{
            width: "100%",
            background: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: 50,
            padding: "13px",
            fontSize: 14,
            fontWeight: 700,
            color: "#f5f5f7",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
          <span style={{ fontSize: 11, color: "#333", fontFamily: "'DM Mono', monospace" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
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
            padding: "14px 18px",
            fontSize: 15,
            color: "#f5f5f7",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 12,
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={e => e.currentTarget.style.borderColor = "#888"}
          onBlur={e => e.currentTarget.style.borderColor = email ? "#666" : "#222"}
        />

        <button
          onClick={completeOnboarding}
          style={{
            width: "100%",
            background: "#f5f5f7",
            border: "none",
            borderRadius: 50,
            padding: "14px",
            fontSize: 15,
            fontWeight: 800,
            color: "#0a0a0a",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "transform 0.15s cubic-bezier(0.2, 1.3, 0.4, 1)",
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Start for free
        </button>

        <p style={{
          textAlign: "center",
          fontSize: 12,
          color: "#333",
          marginTop: 14,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Cancel anytime
        </p>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            onClick={skipToFeed}
            style={{
              background: "none",
              border: "none",
              color: "#555",
              fontSize: 13,
              fontFamily: "'DM Mono', monospace",
              cursor: "pointer",
            }}
          >
            No thanks, take me to the feed
          </button>
        </div>
      </div>
    </div>
  );
        }

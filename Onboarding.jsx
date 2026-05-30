import { useState } from "react"
import DrippingS from "../components/DrippingS"
import { CATEGORIES } from "../data/mockData"

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState([])
  const [email, setEmail] = useState("")
  const [animIn, setAnimIn] = useState(true)

  const goNext = () => {
    setAnimIn(false)
    setTimeout(() => { setStep(s => s + 1); setAnimIn(true) }, 220)
  }

  const toggle = (cat) =>
    setSelected(s => s.includes(cat) ? s.filter(x => x !== cat) : [...s, cat])

  const pageStyle = {
    opacity: animIn ? 1 : 0,
    transform: animIn ? "translateY(0)" : "translateY(16px)",
    transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.2,0.64,1)",
    minHeight: "100vh",
    background: "#0a0a0a",
  }

  // ── SPLASH ──
  if (step === 0) return (
    <div style={{
      ...pageStyle,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 32, textAlign: "center",
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 24,
        background: "#111", border: "1px solid #222",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 28, boxShadow: "0 0 40px #ffffff10",
      }}>
        <DrippingS size={48} color="#f5f5f7" />
      </div>

      <h1 style={{
        fontSize: 48, fontWeight: 900, margin: "0 0 8px",
        color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "-0.04em",
      }}>
        spilled.
      </h1>

      <p style={{
        fontSize: 16, color: "#555", margin: "0 0 52px",
        fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, maxWidth: 260,
      }}>
        The internet's messy. We track it before everyone else does.
      </p>

      <button
        onClick={goNext}
        onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        style={{
          background: "#f5f5f7", border: "none", borderRadius: 50,
          padding: "15px 44px", fontSize: 16, fontWeight: 800,
          color: "#0a0a0a", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em",
          transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        Get early access
      </button>

      <p style={{ fontSize: 12, color: "#333", marginTop: 14, fontFamily: "'DM Sans', sans-serif" }}>
        No credit card required
      </p>
    </div>
  )

  // ── INTERESTS ──
  if (step === 1) return (
    <div style={{ ...pageStyle, padding: "60px 20px 100px" }}>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <p style={{
          fontSize: 11, color: "#444", fontWeight: 700, margin: "0 0 10px",
          fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em",
        }}>
          01 / 02
        </p>
        <h2 style={{
          fontSize: 26, fontWeight: 900, margin: "0 0 6px",
          color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em",
        }}>
          What do you cover?
        </h2>
        <p style={{ fontSize: 14, color: "#555", margin: "0 0 28px", fontFamily: "'DM Sans', sans-serif" }}>
          Pick your beats. We'll build your feed around them.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 32 }}>
          {CATEGORIES.map((cat, i) => {
            const on = selected.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => toggle(cat)}
                style={{
                  background: on ? "#f5f5f7" : "#111",
                  border: `1px solid ${on ? "#f5f5f7" : "#222"}`,
                  borderRadius: 12, padding: "13px 14px",
                  cursor: "pointer", textAlign: "left",
                  transition: "all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: on ? "scale(1.02)" : "scale(1)",
                  animation: `fadeUp 0.3s ease ${i * 0.04}s both`,
                }}
              >
                <div style={{
                  fontSize: 13, fontWeight: 700,
                  color: on ? "#0a0a0a" : "#888",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {cat}
                </div>
              </button>
            )
          })}
        </div>

        <button
          onClick={() => { if (selected.length > 0) goNext() }}
          style={{
            width: "100%",
            background: selected.length > 0 ? "#f5f5f7" : "#111",
            border: `1px solid ${selected.length > 0 ? "transparent" : "#222"}`,
            borderRadius: 50, padding: "15px",
            fontSize: 15, fontWeight: 800,
            color: selected.length > 0 ? "#0a0a0a" : "#333",
            cursor: selected.length > 0 ? "pointer" : "not-allowed",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.25s ease",
          }}
        >
          {selected.length === 0 ? "Pick at least one" : `Continue — ${selected.length} selected`}
        </button>
      </div>
    </div>
  )

  // ── AUTH ──
  if (step === 2) return (
    <div style={{
      ...pageStyle,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: 28,
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <p style={{
          fontSize: 11, color: "#444", fontWeight: 700, margin: "0 0 20px",
          fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", textAlign: "center",
        }}>
          02 / 02
        </p>
        <h2 style={{
          fontSize: 26, fontWeight: 900, margin: "0 0 6px",
          color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "-0.02em", textAlign: "center",
        }}>
          You're almost in
        </h2>
        <p style={{
          fontSize: 14, color: "#555", margin: "0 0 32px",
          fontFamily: "'DM Sans', sans-serif", textAlign: "center",
        }}>
          Free account. No card needed.
        </p>

        {/* Google */}
        <button style={{
          width: "100%", background: "#111", border: "1px solid #2a2a2a",
          borderRadius: 50, padding: "13px", fontSize: 14, fontWeight: 700,
          color: "#f5f5f7", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          marginBottom: 12,
        }}>
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
          onChange={e => setEmail(e.target.value)}
          style={{
            width: "100%", background: "#111",
            border: `1px solid ${email ? "#444" : "#222"}`,
            borderRadius: 12, padding: "13px 14px",
            fontSize: 14, color: "#f5f5f7",
            fontFamily: "'DM Sans', sans-serif",
            outline: "none", boxSizing: "border-box",
            marginBottom: 10, transition: "border-color 0.2s ease",
          }}
        />

        <button
          onClick={onComplete}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          style={{
            width: "100%", background: "#f5f5f7", border: "none",
            borderRadius: 50, padding: "14px",
            fontSize: 15, fontWeight: 800, color: "#0a0a0a",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          Start for free
        </button>

        <p style={{
          textAlign: "center", fontSize: 12, color: "#333",
          marginTop: 14, fontFamily: "'DM Sans', sans-serif",
        }}>
          Cancel anytime
        </p>
      </div>
    </div>
  )

  return null
}

import { useState } from "react";
import DrippingS from "../../components/DrippingS";

export default function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email && password;

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "48px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>

        {/* Back */}
        <button
          onClick={onBack}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#555", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
            marginBottom: 32, display: "flex", alignItems: "center", gap: 6, padding: 0,
          }}
        >
          ← Back
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
            <DrippingS size={44} color="#555" />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f5f5f7", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}>
            Welcome back
          </h2>
          <p style={{ fontSize: 14, color: "#555", fontFamily: "'DM Sans', sans-serif" }}>
            Log in to your Spilled account
          </p>
        </div>

        {/* Google */}
        <button style={{
          width: "100%", background: "#111", border: "1px solid #2a2a2a",
          borderRadius: 50, padding: "13px", fontSize: 14, fontWeight: 600,
          color: "#f5f5f7", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          marginBottom: 16,
        }}>
          <svg width="16" height="16" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
          <span style={{ fontSize: 11, color: "#333", fontFamily: "'DM Mono', monospace" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: "100%", background: "#111",
            border: `1px solid ${email ? "#666" : "#222"}`,
            borderRadius: 44, padding: "14px 18px",
            fontSize: 15, color: "#f5f5f7",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 12, outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s ease",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: "100%", background: "#111",
            border: `1px solid ${password ? "#666" : "#222"}`,
            borderRadius: 44, padding: "14px 18px",
            fontSize: 15, color: "#f5f5f7",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 8, outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s ease",
          }}
        />

        {/* Forgot password */}
        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <button style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 12, color: "#555", fontFamily: "'DM Sans', sans-serif",
          }}>
            Forgot password?
          </button>
        </div>

        {/* Login button */}
        <button
          onClick={() => isValid && onLogin()}
          disabled={!isValid}
          style={{
            width: "100%",
            background: isValid ? "#f5f5f7" : "#1a1a1a",
            border: "none", borderRadius: 50, padding: "14px",
            fontSize: 16, fontWeight: 700,
            color: isValid ? "#0a0a0a" : "#555",
            cursor: isValid ? "pointer" : "not-allowed",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          Log in
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: "#333", marginTop: 24, fontFamily: "'DM Sans', sans-serif" }}>
          Cancel anytime · No commitment
        </p>
      </div>
    </div>
  );
}

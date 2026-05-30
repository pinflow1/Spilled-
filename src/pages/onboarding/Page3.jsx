import { useState, useEffect } from "react";
import DrippingS from "../../components/DrippingS";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Spain", "Italy", "Netherlands",
  "Brazil", "Mexico", "India", "Japan", "South Korea",
  "Nigeria", "South Africa", "Other"
];

export default function Page3({ onComplete, onSkip, onLogin, onUserData }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [agree, setAgree] = useState(false);

  const isValid = fullName && username && email && country && agree;

  // Send data to parent whenever fields change
  useEffect(() => {
    if (onUserData) {
      onUserData({ fullName, username, email, country });
    }
  }, [fullName, username, email, country, onUserData]);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0a0a0a", padding: "80px 24px 48px", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 500, margin: "0 auto", width: "100%" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ marginBottom: 20 }}><DrippingS size={48} color="#555" /></div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f5f5f7", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Create your account</h2>
          <p style={{ fontSize: 14, color: "#888", fontFamily: "'DM Sans', sans-serif" }}>Join the spill. No card needed.</p>
        </div>

        {/* Google Sign Up */}
        <button style={{
          width: "100%",
          background: "#111",
          border: "1px solid #2a2a2a",
          borderRadius: 50,
          padding: "13px",
          fontSize: 14,
          fontWeight: 600,
          color: "#f5f5f7",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginBottom: 16,
        }}>
          <svg width="16" height="16" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
          </svg>
          Sign up with Google
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
          <span style={{ fontSize: 11, color: "#333", fontFamily: "'DM Mono', monospace" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
        </div>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{
            width: "100%",
            background: "#111",
            border: `1px solid ${fullName ? "#666" : "#222"}`,
            borderRadius: 44,
            padding: "14px 18px",
            fontSize: 15,
            color: "#f5f5f7",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 12,
            outline: "none",
          }}
        />

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            background: "#111",
            border: `1px solid ${username ? "#666" : "#222"}`,
            borderRadius: 44,
            padding: "14px 18px",
            fontSize: 15,
            color: "#f5f5f7",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 12,
            outline: "none",
          }}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
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
          }}
        />

        {/* Country Dropdown */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{
            width: "100%",
            background: "#111",
            border: `1px solid ${country ? "#666" : "#222"}`,
            borderRadius: 44,
            padding: "14px 18px",
            fontSize: 15,
            color: country ? "#f5f5f7" : "#666",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 16,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="" disabled>Select country</option>
          {COUNTRIES.map(c => (
            <option key={c} value={c} style={{ background: "#111", color: "#f5f5f7" }}>{c}</option>
          ))}
        </select>

        {/* Terms Agreement */}
        <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#f5f5f7" }}
          />
          <span style={{ fontSize: 12, color: "#888", fontFamily: "'DM Sans', sans-serif" }}>
            I agree to the <a href="#" style={{ color: "#f5f5f7", textDecoration: "none" }}>Terms of Service</a> and <a href="#" style={{ color: "#f5f5f7", textDecoration: "none" }}>Privacy Policy</a>
          </span>
        </label>

        {/* Sign Up Button */}
        <button
          onClick={onComplete}
          disabled={!isValid}
          style={{
            width: "100%",
            background: isValid ? "#f5f5f7" : "#1a1a1a",
            border: "none",
            borderRadius: 50,
            padding: "14px",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            color: isValid ? "#0a0a0a" : "#555",
            cursor: isValid ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          Start spilling
        </button>

        {/* Login Link */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span style={{ fontSize: 13, color: "#666", fontFamily: "'DM Sans', sans-serif" }}>
            Already have an account?{" "}
            <button
              onClick={onLogin}
              style={{
                background: "none",
                border: "none",
                color: "#f5f5f7",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Log in
            </button>
          </span>
        </div>

        {/* Terms & Privacy inline */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <a href="#" style={{ color: "#444", fontSize: 11, textDecoration: "none", marginRight: 16, fontFamily: "'DM Sans', sans-serif" }}>Terms</a>
          <a href="#" style={{ color: "#444", fontSize: 11, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Privacy</a>
        </div>

        {/* Skip Link */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            onClick={onSkip}
            style={{
              background: "none",
              border: "none",
              color: "#555",
              fontSize: 12,
              fontFamily: "'DM Mono', monospace",
              cursor: "pointer",
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
            }

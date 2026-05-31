import { useState, useRef } from "react";
import Page0 from "./Page0";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import LoginPage from "./LoginPage";
import TermsPage from "./TermsPage";
import PrivacyPage from "./PrivacyPage";

const EXIT_DURATION = 220;
const ENTER_DURATION = 320;

export default function Onboarding({ onComplete, onSkip, onLogin }) {
  const [page, setPage] = useState(0);
  const [displayPage, setDisplayPage] = useState(0);
  const [formats, setFormats] = useState([]);
  const [userData, setUserData] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [overlay, setOverlay] = useState(null); // "login" | "terms" | "privacy" | null
  const [overlayPhase, setOverlayPhase] = useState("idle");
  const containerRef = useRef(null);

  // ── Page transition ──────────────────────────────────────────────────────
  const nextPage = () => {
    if (isTransitioning) return;
    if (containerRef.current) containerRef.current.scrollTop = 0;
    setIsTransitioning(true);
    setPhase("exit");
    setTimeout(() => {
      setDisplayPage(p => p + 1);
      setPhase("enter");
      setTimeout(() => {
        setPhase("idle");
        setIsTransitioning(false);
      }, ENTER_DURATION);
    }, EXIT_DURATION);
  };

  // ── Overlay open/close ───────────────────────────────────────────────────
  const openOverlay = (name) => {
    setOverlay(name);
    setOverlayPhase("enter");
  };

  const closeOverlay = () => {
    setOverlayPhase("exit");
    setTimeout(() => {
      setOverlay(null);
      setOverlayPhase("idle");
    }, EXIT_DURATION);
  };

  // ── Handlers ─────────────────────────────────────────────────────────────
  const skipToFeed = () => onSkip ? onSkip() : onComplete({ skipped: true });
  const completeSignup = () => onComplete({ formats, ...userData, skipped: false });
  const handleUserData = (data) => setUserData(data);
  const toggleFormat = (id) => {
    if (id === "all") setFormats(formats.includes("all") ? [] : ["all"]);
    else setFormats(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev.filter(f => f !== "all"), id]
    );
  };

  // ── Pages ────────────────────────────────────────────────────────────────
  const pages = [
    <Page0 key={0} onNext={nextPage} onSkip={skipToFeed} />,
    <Page1 key={1} onNext={nextPage} onSkip={skipToFeed} />,
    <Page2 key={2} selected={formats} onToggle={toggleFormat} onNext={nextPage} onSkip={skipToFeed} />,
    <Page3
      key={3}
      onComplete={completeSignup}
      onSkip={skipToFeed}
      onLogin={() => openOverlay("login")}
      onTerms={() => openOverlay("terms")}
      onPrivacy={() => openOverlay("privacy")}
      onUserData={handleUserData}
    />,
  ];

  // ── Page transition style ────────────────────────────────────────────────
  const getPageStyle = () => {
    if (phase === "exit") return {
      transform: "translateX(-24px)", opacity: 0,
      transition: `transform ${EXIT_DURATION}ms cubic-bezier(0.4,0,1,1), opacity ${EXIT_DURATION}ms ease`,
    };
    if (phase === "enter") return {
      animation: `pageEnter ${ENTER_DURATION}ms cubic-bezier(0.34,1.1,0.64,1) forwards`,
    };
    return { transform: "translateX(0)", opacity: 1 };
  };

  // ── Overlay transition style ─────────────────────────────────────────────
  const getOverlayStyle = () => {
    if (overlayPhase === "enter") return {
      animation: `overlayEnter ${ENTER_DURATION}ms cubic-bezier(0.34,1.1,0.64,1) forwards`,
    };
    if (overlayPhase === "exit") return {
      transform: "translateX(100%)", opacity: 0,
      transition: `transform ${EXIT_DURATION}ms cubic-bezier(0.4,0,1,1), opacity ${EXIT_DURATION}ms ease`,
    };
    return { transform: "translateX(0)", opacity: 1 };
  };

  return (
    <div ref={containerRef} style={{ position: "relative", overflow: "hidden", minHeight: "100vh", background: "#0a0a0a" }}>
      <style>{`
        @keyframes pageEnter {
          from { transform: translateX(40px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes overlayEnter {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>

      {/* Main onboarding pages */}
      <div style={{ ...getPageStyle(), willChange: "transform, opacity" }}>
        {pages[displayPage]}
      </div>

      {/* Overlay pages — slide in from right */}
      {overlay && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 50,
          background: "#0a0a0a", overflowY: "auto",
          ...getOverlayStyle(),
          willChange: "transform, opacity",
        }}>
          {overlay === "login" && (
            <LoginPage
              onBack={closeOverlay}
              onLogin={() => { closeOverlay(); onLogin && onLogin(); }}
            />
          )}
          {overlay === "terms" && <TermsPage onBack={closeOverlay} />}
          {overlay === "privacy" && <PrivacyPage onBack={closeOverlay} />}
        </div>
      )}
    </div>
  );
}

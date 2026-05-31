import { useState, useRef, useEffect } from "react";
import Page0 from "./Page0";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

export default function Onboarding({ onComplete, onSkip, onLogin }) {
  const [page, setPage] = useState(0);
  const [formats, setFormats] = useState([]);
  const [userData, setUserData] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState(0); // what's actually shown
  const [phase, setPhase] = useState("idle"); // "idle" | "exit" | "enter"
  const containerRef = useRef(null);

  const EXIT_DURATION = 220;
  const ENTER_DURATION = 320;

  const nextPage = () => {
    if (isTransitioning) return;
    if (containerRef.current) containerRef.current.scrollTop = 0;

    setIsTransitioning(true);
    setPhase("exit");

    // After exit animation completes, swap page and start enter
    setTimeout(() => {
      setDisplayPage(p => p + 1);
      setPhase("enter");

      // After enter animation, reset to idle
      setTimeout(() => {
        setPhase("idle");
        setIsTransitioning(false);
      }, ENTER_DURATION);
    }, EXIT_DURATION);
  };

  const skipToFeed = () => onSkip ? onSkip() : onComplete({ skipped: true });

  const completeSignup = () => {
    onComplete({ formats, ...userData, skipped: false });
  };

  const handleUserData = (data) => setUserData(data);

  const toggleFormat = (id) => {
    if (id === "all") setFormats(formats.includes("all") ? [] : ["all"]);
    else setFormats(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev.filter(f => f !== "all"), id]
    );
  };

  const pages = [
    <Page0 key={0} onNext={nextPage} onSkip={skipToFeed} />,
    <Page1 key={1} onNext={nextPage} onSkip={skipToFeed} />,
    <Page2 key={2} selected={formats} onToggle={toggleFormat} onNext={nextPage} onSkip={skipToFeed} />,
    <Page3 key={3} onComplete={completeSignup} onSkip={skipToFeed} onLogin={onLogin} onUserData={handleUserData} />,
  ];

  // Exit: slides left + fades out
  // Enter: slides in from right + fades in
  const getPageStyle = () => {
    if (phase === "exit") return {
      transform: "translateX(-24px)",
      opacity: 0,
      transition: `transform ${EXIT_DURATION}ms cubic-bezier(0.4,0,1,1), opacity ${EXIT_DURATION}ms ease`,
    };
    if (phase === "enter") return {
      transform: "translateX(0)",
      opacity: 1,
      transition: `transform ${ENTER_DURATION}ms cubic-bezier(0.34,1.1,0.64,1), opacity ${ENTER_DURATION}ms ease`,
      // Start from right
      animation: `pageEnter ${ENTER_DURATION}ms cubic-bezier(0.34,1.1,0.64,1) forwards`,
    };
    return {
      transform: "translateX(0)",
      opacity: 1,
    };
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        background: "#0a0a0a",
      }}
    >
      <style>{`
        @keyframes pageEnter {
          from { transform: translateX(40px); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>

      <div style={{
        ...getPageStyle(),
        willChange: "transform, opacity",
      }}>
        {pages[displayPage]}
      </div>
    </div>
  );
      }

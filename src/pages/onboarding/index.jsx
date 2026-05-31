import { useState, useRef } from "react";
import Page0 from "./Page0";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

export default function Onboarding({ onComplete, onSkip, onLogin }) {
  const [page, setPage] = useState(0);
  const [formats, setFormats] = useState([]);
  const [userData, setUserData] = useState({});
  const [transitionState, setTransitionState] = useState("idle");
  const [direction, setDirection] = useState("next");
  const containerRef = useRef(null);

  const nextPage = () => {
    if (transitionState !== "idle") return;
    setDirection("next");
    setTransitionState("sliding");
    setTimeout(() => {
      setPage(p => p + 1);
      setTransitionState("idle");
      if (containerRef.current) containerRef.current.scrollTop = 0;
    }, 500); // slower: 500ms
  };

  const skipToFeed = () => onSkip ? onSkip() : onComplete({ skipped: true });
  
  const completeSignup = () => {
    onComplete({ formats, ...userData, skipped: false });
  };

  const handleUserData = (data) => {
    setUserData(data);
  };

  const toggleFormat = (id) => {
    if (id === "all") setFormats(formats.includes("all") ? [] : ["all"]);
    else setFormats(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev.filter(f => f !== "all"), id]);
  };

  const pages = [
    <Page0 key={0} onNext={nextPage} onSkip={skipToFeed} />,
    <Page1 key={1} onNext={nextPage} onSkip={skipToFeed} />,
    <Page2 key={2} selected={formats} onToggle={toggleFormat} onNext={nextPage} onSkip={skipToFeed} />,
    <Page3 key={3} onComplete={completeSignup} onSkip={skipToFeed} onLogin={onLogin} onUserData={handleUserData} />
  ];

  const currentPage = pages[page];
  const nextPageContent = direction === "next" && transitionState === "sliding" ? pages[page + 1] : null;

  // Buttery easing curve with slight overshoot
  const springEasing = "cubic-bezier(0.34, 1.2, 0.64, 1)";
  const transitionDuration = "500ms";

  return (
    <div ref={containerRef} style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      {/* Current page slides out left and fades */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: transitionState === "sliding" ? "translateX(-30px)" : "translateX(0)",
          opacity: transitionState === "sliding" ? 0 : 1,
          transition: `transform ${transitionDuration} ${springEasing}, opacity ${transitionDuration} ease`,
          pointerEvents: transitionState === "sliding" ? "none" : "auto",
        }}
      >
        {currentPage}
      </div>

      {/* Next page slides in from right */}
      {nextPageContent && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: "translateX(60px)",
            opacity: 0,
            animation: `slideIn ${transitionDuration} ${springEasing} forwards`,
          }}
        >
          {nextPageContent}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          0% { transform: translateX(60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

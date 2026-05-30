import { useState, useRef } from "react";
import Page0 from "./Page0";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

export default function Onboarding({ onComplete, onSkip, onLogin }) {
  const [page, setPage] = useState(0);
  const [formats, setFormats] = useState([]);
  const [userData, setUserData] = useState({});
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

  if (page === 0) return <Page0 onNext={nextPage} onSkip={skipToFeed} />;
  if (page === 1) return <Page1 onNext={nextPage} onSkip={skipToFeed} />;
  if (page === 2) return <Page2 selected={formats} onToggle={toggleFormat} onNext={nextPage} onSkip={skipToFeed} />;
  return <Page3 onComplete={completeSignup} onSkip={skipToFeed} onLogin={onLogin} />;
}

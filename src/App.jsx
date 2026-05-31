import { useState, useEffect } from "react";
import DrippingS from "./components/DrippingS";
import BottomNav from "./components/BottomNav";
import Onboarding from "./pages/onboarding";
import FeedPage from "./pages/FeedPage";
import ThreadView from "./pages/ThreadView";
import SearchPage from "./pages/SearchPage";
import AlertsPage from "./pages/AlertsPage";
import SavedPage from "./pages/SavedPage";
import ProfilePage from "./pages/ProfilePage";

// ── PAGE WRAPPER — handles enter animation ─────────────────────────────────
function PageWrapper({ children, animKey, direction = "up" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, [animKey]);

  const transforms = {
    up:    { from: "translateY(16px)", to: "translateY(0)" },
    right: { from: "translateX(100%)", to: "translateX(0)" },
    fade:  { from: "translateY(8px)",  to: "translateY(0)" },
  };

  const t = transforms[direction] || transforms.fade;

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      opacity: visible ? 1 : 0,
      transform: visible ? t.to : t.from,
      transition: "opacity 0.28s ease, transform 0.32s cubic-bezier(0.34,1.1,0.64,1)",
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    }}>
      {children}
    </div>
  );
}

// ── LOADING SCREEN ─────────────────────────────────────────────────────────
function LoadingScreen({ animDrip }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 300, background: "#0a0a0a",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 20,
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s ease",
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: 22,
        background: "#111", border: "1px solid #1a1a1a",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <DrippingS size={44} animating={animDrip} color="#f5f5f7" />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em", marginBottom: 6 }}>
          spilled.
        </div>
        <div style={{ fontSize: 13, color: "#444", fontFamily: "'DM Mono', monospace" }}>
          Brewing your feed...
        </div>
      </div>
    </div>
  );
}

// ── APP ────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("onboarding");
  const [tab, setTab] = useState("feed");
  const [prevTab, setPrevTab] = useState(null);
  const [openStory, setOpenStory] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animDrip, setAnimDrip] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);
  const [tabKey, setTabKey] = useState(0);

  const handleOnboardingComplete = (data) => {
    if (data && !data.skipped) {
      setUserPreferences({
        formats: data.formats,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        country: data.country,
      });
    }
    setLoading(true);
    setAnimDrip(true);
    setTimeout(() => {
      setLoading(false);
      setAnimDrip(false);
      setScreen("app");
    }, 1800);
  };

  const handleSave = (id) =>
    setSavedIds((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  const handleTabChange = (t) => {
    if (t === tab && !openStory) return;
    setOpenStory(null);
    setPrevTab(tab);
    setTab(t);
    setTabKey(k => k + 1);
  };

  const handleOpenStory = (story) => {
    setOpenStory(story);
  };

  const handleCloseStory = () => {
    setOpenStory(null);
  };

  // Onboarding
  if (screen === "onboarding" && !loading) {
    return (
      <Onboarding
        onComplete={handleOnboardingComplete}
        onSkip={() => handleOnboardingComplete({ skipped: true })}
        onLogin={() => setScreen("app")}
      />
    );
  }

  // Loading
  if (loading) return <LoadingScreen animDrip={animDrip} />;

  // Main app
  return (
    <div style={{ minHeight: "100vh", height: "100vh", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>

      {/* Tab pages — render all, show active */}
      <div style={{ position: "absolute", inset: 0, bottom: 56 }}>

        {/* Thread view slides in from right over everything */}
        {openStory && (
          <PageWrapper animKey={openStory.id} direction="right">
            <ThreadView
              story={openStory}
              onBack={handleCloseStory}
              saved={savedIds.includes(openStory.id)}
              onSave={handleSave}
            />
          </PageWrapper>
        )}

        {/* Tab pages — fade up on switch */}
        {!openStory && (
          <PageWrapper animKey={tabKey} direction="fade">
            {tab === "feed" && (
              <FeedPage
                onOpenStory={handleOpenStory}
                savedIds={savedIds}
                onSave={handleSave}
              />
            )}
            {tab === "search" && <SearchPage onOpenStory={handleOpenStory} />}
            {tab === "alerts" && <AlertsPage />}
            {tab === "saved" && (
              <SavedPage
                savedIds={savedIds}
                onOpenStory={handleOpenStory}
                onSave={handleSave}
              />
            )}
            {tab === "profile" && <ProfilePage />}
          </PageWrapper>
        )}
      </div>

      {/* Bottom nav — always on top */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 100 }}>
        <BottomNav active={tab} onChange={handleTabChange} />
      </div>
    </div>
  );
      }
          

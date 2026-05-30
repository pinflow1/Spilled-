import { useState } from "react";
import DrippingS from "./components/DrippingS";
import BottomNav from "./components/BottomNav";
import Onboarding from "./pages/Onboarding";
import FeedPage from "./pages/FeedPage";
import ThreadView from "./pages/ThreadView";
import SearchPage from "./pages/SearchPage";
import AlertsPage from "./pages/AlertsPage";
import SavedPage from "./pages/SavedPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const [screen, setScreen] = useState("onboarding"); // "onboarding" | "app"
  const [tab, setTab] = useState("feed");
  const [openStory, setOpenStory] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animDrip, setAnimDrip] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null); // optional: store onboarding data

  const handleOnboardingComplete = (data) => {
    // Save user preferences if needed
    if (data && !data.skipped) {
      setUserPreferences({ formats: data.formats, email: data.email });
      console.log("Onboarding completed with:", data);
    } else {
      console.log("Onboarding skipped");
    }

    setLoading(true);
    setAnimDrip(true);
    setTimeout(() => {
      setLoading(false);
      setAnimDrip(false);
      setScreen("app");
    }, 1800);
  };

  const handleOnboardingSkip = () => {
    // Called when user clicks "Skip to feed" on any page
    handleOnboardingComplete({ skipped: true });
  };

  const handleSave = (id) =>
    setSavedIds((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

  const handleTabChange = (t) => {
    setOpenStory(null);
    setTab(t);
  };

  const handleOpenStory = (story) => {
    setOpenStory(story);
  };

  // ── ONBOARDING ──
  if (screen === "onboarding" && !loading) {
    return <Onboarding onComplete={handleOnboardingComplete} onSkip={handleOnboardingSkip} />;
  }

  // ── LOADING / DRIP ANIMATION ──
  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 300,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            background: "#111",
            border: "1px solid #1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DrippingS size={44} animating={animDrip} color="#f5f5f7" />
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#f5f5f7",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.03em",
              marginBottom: 6,
            }}
          >
            spilled.
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#444",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Building your feed...
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN APP ──
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Thread view overlays everything */}
      {openStory ? (
        <ThreadView
          story={openStory}
          onBack={() => setOpenStory(null)}
          saved={savedIds.includes(openStory.id)}
          onSave={handleSave}
        />
      ) : (
        <>
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
        </>
      )}

      <BottomNav active={tab} onChange={handleTabChange} />
    </div>
  );
              }

import DrippingS from "../../components/DrippingS";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using Spilled, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service. We may update these terms from time to time and will notify you of any material changes.`,
  },
  {
    title: "2. Description of Service",
    body: `Spilled is a content discovery and trend tracking platform designed for online content creators. We aggregate publicly available information from various sources to help creators identify trending topics and stories. Spilled does not create original news content.`,
  },
  {
    title: "3. User Accounts",
    body: `You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information when creating your account and to keep it up to date. You may not share your account with others or use another person's account without permission.`,
  },
  {
    title: "4. Acceptable Use",
    body: `You agree not to use Spilled for any unlawful purpose or in any way that could harm, disable, or impair the service. You may not attempt to gain unauthorized access to any part of the platform, scrape or copy content in bulk, or use the service to harass or harm others.`,
  },
  {
    title: "5. Subscription and Payments",
    body: `Spilled offers both free and paid subscription tiers. Paid subscriptions are billed on a monthly or annual basis. You may cancel your subscription at any time and will retain access until the end of your billing period. We do not offer refunds for partial billing periods.`,
  },
  {
    title: "6. Intellectual Property",
    body: `All content, design, and technology within Spilled is the intellectual property of Spilled and its licensors. You may not reproduce, distribute, or create derivative works from our platform without explicit written permission.`,
  },
  {
    title: "7. Third Party Content",
    body: `Spilled aggregates content from third party sources. We do not endorse or take responsibility for the accuracy of third party content. Links to external sources are provided for informational purposes only.`,
  },
  {
    title: "8. Disclaimer of Warranties",
    body: `Spilled is provided on an as-is and as-available basis. We make no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the service. Use of Spilled is at your own risk.`,
  },
  {
    title: "9. Limitation of Liability",
    body: `To the fullest extent permitted by law, Spilled shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability to you for any claims shall not exceed the amount you paid us in the past 12 months.`,
  },
  {
    title: "10. Contact",
    body: `If you have any questions about these Terms of Service, please contact us at legal@spilled.click`,
  },
];

export default function TermsPage({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", padding: "0 0 60px" }}>

      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "#0a0a0aEE", backdropFilter: "blur(20px)",
        borderBottom: "1px solid #141414",
        padding: "14px 20px",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <button
          onClick={onBack}
          style={{
            background: "#111", border: "1px solid #1c1c1c",
            borderRadius: 50, width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#f5f5f7", fontSize: 14, flexShrink: 0,
          }}
        >
          ←
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <DrippingS size={16} color="#555" />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}>
            Terms of Service
          </span>
        </div>
      </div>

      <div style={{ padding: "28px 24px", maxWidth: 600, margin: "0 auto" }}>

        {/* Intro */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 12, color: "#444", fontFamily: "'DM Mono', monospace" }}>
            Last updated: June 2025
          </p>
        </div>

        <p style={{ fontSize: 14, color: "#666", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, marginBottom: 32 }}>
          Please read these terms carefully before using Spilled. These terms govern your use of our platform and services.
        </p>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {SECTIONS.map((s, i) => (
            <div key={i}>
              <h3 style={{
                fontSize: 13, fontWeight: 700, color: "#f5f5f7",
                fontFamily: "'DM Sans', sans-serif", marginBottom: 10,
                letterSpacing: "-0.01em",
              }}>
                {s.title}
              </h3>
              <p style={{
                fontSize: 13, color: "#555", fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.7, margin: 0,
              }}>
                {s.body}
              </p>
              <div style={{ height: 1, background: "#111", marginTop: 28 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

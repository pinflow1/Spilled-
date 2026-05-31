import DrippingS from "../../components/DrippingS";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly when creating an account, including your name, username, email address, and country. We also collect usage data such as which stories you view, save, and interact with, as well as device information and IP address for security and analytics purposes.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use your information to provide and improve the Spilled service, personalize your feed based on your interests, send you relevant notifications and updates, process payments for paid subscriptions, and comply with legal obligations. We do not sell your personal data to third parties.`,
  },
  {
    title: "3. Data Storage and Security",
    body: `Your data is stored securely using industry-standard encryption. We use Supabase for database management, which provides enterprise-grade security. While we take reasonable precautions to protect your data, no system is completely secure and we cannot guarantee absolute security.`,
  },
  {
    title: "4. Cookies and Tracking",
    body: `We use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze usage patterns. You can control cookie settings through your browser, though disabling cookies may affect the functionality of the service.`,
  },
  {
    title: "5. Third Party Services",
    body: `Spilled integrates with third party services including Google for authentication, Stripe for payment processing, and various content sources for aggregation. These services have their own privacy policies and we encourage you to review them. We are not responsible for the data practices of third party services.`,
  },
  {
    title: "6. Data Sharing",
    body: `We do not sell or rent your personal information. We may share data with service providers who assist in operating our platform, with law enforcement when required by law, or in connection with a business transaction such as a merger or acquisition. Any such parties are bound by confidentiality obligations.`,
  },
  {
    title: "7. Your Rights",
    body: `You have the right to access, correct, or delete your personal data at any time. You can update your account information from your profile settings or contact us to request deletion of your account and associated data. We will respond to all requests within 30 days.`,
  },
  {
    title: "8. Children's Privacy",
    body: `Spilled is not intended for users under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child under 13, we will delete it immediately.`,
  },
  {
    title: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or a prominent notice within the app. Your continued use of Spilled after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    title: "10. Contact Us",
    body: `If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at privacy@spilled.click`,
  },
];

export default function PrivacyPage({ onBack }) {
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
            Privacy Policy
          </span>
        </div>
      </div>

      <div style={{ padding: "28px 24px", maxWidth: 600, margin: "0 auto" }}>

        {/* Intro */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#f5f5f7", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 12, color: "#444", fontFamily: "'DM Mono', monospace" }}>
            Last updated: June 2025
          </p>
        </div>

        <p style={{ fontSize: 14, color: "#666", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, marginBottom: 32 }}>
          Your privacy matters to us. This policy explains what data we collect, how we use it, and the choices you have.
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

import SpilledLogo from "../../components/SpilledLogo";

export default function EmptyState() {
  return (
    <div style={{ padding: "60px 0", textAlign: "center" }}>
      <div style={{ opacity: 0.15, marginBottom: 16 }}>
        <SpilledLogo size={36} />
      </div>
      <p style={{ fontSize: 13, color: "#2a2a2a", fontFamily: "'DM Sans', sans-serif" }}>
        No stories yet. Check back soon.
      </p>
    </div>
  );
}

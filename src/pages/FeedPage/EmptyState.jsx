import SpilledLogo from "../../components/SpilledLogo"

export default function EmptyState() {
  return (
    <div style={{ padding: "60px 0", textAlign: "center" }}>
      <SpilledLogo size={36} style={{ borderRadius: 10, opacity: 0.15, margin: "0 auto 16px" }} />
      <p style={{ fontSize: 13, color: "#2a2a2a", fontFamily: "'DM Sans', sans-serif" }}>
        No stories yet. Check back soon.
      </p>
    </div>
  )
}

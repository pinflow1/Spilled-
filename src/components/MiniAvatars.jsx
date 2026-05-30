export default function MiniAvatars({ count }) {
  const colors = ["#555", "#666", "#444"]
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex" }}>
        {colors.map((c, i) => (
          <div key={i} style={{
            width: 18, height: 18, borderRadius: "50%",
            background: c, border: "1.5px solid #111",
            marginLeft: i > 0 ? -6 : 0,
          }} />
        ))}
      </div>
      <span style={{
        fontSize: 11, color: "#666",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        +{count} creators
      </span>
    </div>
  )
}

export function Skeleton({ w = "100%", h = 12, r = 6, mb = 0 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r, marginBottom: mb,
      background: "linear-gradient(90deg, #111 25%, #161616 50%, #111 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.6s infinite",
    }} />
  )
}

export function CardSkeleton() {
  return (
    <div style={{ width: 200, flexShrink: 0, padding: "20px 18px", background: "#141414", borderRadius: 18, minHeight: 210, display: "flex", flexDirection: "column", gap: 12 }}>
      <Skeleton w={80} h={9} r={3} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <Skeleton h={14} />
        <Skeleton h={14} w="85%" />
        <Skeleton h={14} w="65%" />
      </div>
      <Skeleton h={11} w="60%" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Skeleton w={50} h={10} r={3} />
        <Skeleton w={28} h={28} r={14} />
      </div>
    </div>
  )
}

export function RowSkeleton({ index }) {
  return (
    <div style={{ padding: "20px 0", borderBottom: "1px solid #0d0d0d", animation: `fadeUp 0.3s ease ${index * 0.06}s both`, display: "flex", gap: 14 }}>
      <div style={{ width: 8, paddingTop: 6, flexShrink: 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1a1a1a" }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <Skeleton w={70} h={9} r={3} />
          <Skeleton w={30} h={9} r={3} />
        </div>
        <Skeleton h={14} mb={6} />
        <Skeleton h={14} w="80%" mb={10} />
        <Skeleton h={11} w="65%" />
      </div>
    </div>
  )
}

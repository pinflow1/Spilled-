export default function ErrorState({ onRetry }) {
  return (
    <div style={{ padding: "60px 0", textAlign: "center" }}>
      <p
        style={{
          fontSize: 13,
          color: "#333",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: 14,
        }}
      >
        Failed to load stories.
      </p>
      <button
        onClick={onRetry}
        style={{
          background: "#111",
          border: "1px solid #1a1a1a",
          borderRadius: 30,
          padding: "8px 20px",
          fontSize: 11,
          color: "#666",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Try again
      </button>
    </div>
  );
}

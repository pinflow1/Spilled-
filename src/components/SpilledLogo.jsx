export default function SpilledLogo({ size = 24 }) {
  return (
    <img
      src="/logo.png"
      alt="Spilled"
      width={size}
      height={size}
      style={{ borderRadius: size * 0.22, objectFit: "cover", display: "block" }}
    />
  );
}

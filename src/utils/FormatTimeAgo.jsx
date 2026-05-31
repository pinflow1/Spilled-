export function formatTimeAgo(val) {
  if (!val) return "just now"
  if (typeof val === "string" && val.includes("ago")) return val
  const diff = Date.now() - new Date(val).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

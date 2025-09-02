export const formatDate = (dateString) => {
  const now = new Date();
  const end = new Date(dateString);
  const diffMs = end - now;

  if (diffMs <= 0) {
    return "Ended";
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
  } else {
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
  }
};
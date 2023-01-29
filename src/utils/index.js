function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));

  if (diffDays > 0) {
    return `${diffDays}d`;
  } if (diffHours > 0) {
    return `${diffHours}h`;
  } if (diffMinutes > 0) {
    return `${diffMinutes}m`;
  }
  return 'Just now';
}

export { postedAt };

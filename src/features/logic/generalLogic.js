

export function formatTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
    const options = { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true };
    return date.toLocaleString("en-US", options);
  }

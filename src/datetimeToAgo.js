export default function datetimeToAgo(datetime) {
  const timeAgo = new Date().getTime() - datetime;

  const phrase = (value, dateType) => {
    if (value === 1) {
      return `a ${dateType} ago`;
    }
    return `${value} ${dateType}s ago`;
  };

  if (timeAgo > 3.154e10) return phrase(Math.floor(timeAgo / 3.154e10), "year");
  else if (timeAgo > 2.628e9)
    return phrase(Math.floor(timeAgo / 2.628e9), "month");
  else if (timeAgo > 6.048e8)
    return phrase(Math.floor(timeAgo / 6.048e8), "week");
  else if (timeAgo > 8.64e7) return phrase(Math.floor(timeAgo / 8.64e7), "day");
  else if (timeAgo > 3.6e6) return phrase(Math.floor(timeAgo / 3.6e6), "hour");
  else if (timeAgo > 60000)
    return phrase(Math.floor(timeAgo / 60000), "minute");
  else return "Now";
}

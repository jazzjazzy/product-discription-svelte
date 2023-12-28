import "fs";
import "axios";
import "path";
function convertBigIntToDate(data) {
  return JSON.stringify(data, (_, value) => {
    if (typeof value === "bigint") {
      const timestamp = Number(value);
      const now = Date.now();
      let diff = timestamp - now;
      const isFuture = diff > 0;
      diff = Math.abs(diff) / 1e3;
      const days = Math.floor(diff / (3600 * 24));
      diff -= days * 3600 * 24;
      const hours = Math.floor(diff / 3600);
      diff -= hours * 3600;
      const minutes = Math.floor(diff / 60);
      diff -= minutes * 60;
      const seconds = Math.floor(diff);
      let durationStr = "";
      if (days > 0) {
        durationStr += `${days}d `;
      }
      durationStr += `${hours}h ${minutes}m ${seconds}s`;
      return (isFuture ? "" : "-") + durationStr;
    }
    return value;
  });
}
function stringToBoolean(str) {
  if (str === void 0)
    return false;
  switch (str.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(str);
  }
}
export {
  convertBigIntToDate as c,
  stringToBoolean as s
};

export default function getTime(): string {
  const time: number = new Date().getHours();
  if (time >= 6 && time <= 11) {
    return "早上好";
  } else if (time > 11 && time < 14) {
    return "中午好";
  } else if (time >= 14 && time <= 19) {
    return "下午好";
  } else {
    return "晚上好";
  }
}

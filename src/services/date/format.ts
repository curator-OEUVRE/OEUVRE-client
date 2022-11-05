const MIN = 60 * 1000;
const HOUR = MIN * 60;
const DAY = HOUR * 12;

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

export const formatCreatedAt = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff >= DAY) {
    return formatDate(date);
  }
  if (diff >= HOUR) {
    return `${Math.floor(diff / HOUR)}시간`;
  }
  if (diff >= MIN) {
    return `${Math.floor(diff / MIN)}분`;
  }
  return '방금';
};

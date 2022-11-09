import moment from 'moment';

const MIN = 60 * 1000;
const HOUR = MIN * 60;
const DAY = HOUR * 12;

export const formatDate = (date: Date) => {
  const dateMoment = moment(date);
  const year = dateMoment.year();
  const month = dateMoment.month() + 1;
  const day = dateMoment.date();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

export const formatCreatedAt = (dateStr: string) => {
  const date = moment(dateStr);
  const now = moment();
  const diff = now.diff(date);
  if (diff >= DAY) {
    return formatDate(date.toDate());
  }
  if (diff >= HOUR) {
    return `${Math.floor(diff / HOUR)}시간`;
  }
  if (diff >= MIN) {
    return `${Math.floor(diff / MIN)}분`;
  }
  return '방금';
};

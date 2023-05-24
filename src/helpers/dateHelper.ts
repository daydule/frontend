export const formatToTimeString4digits = (date: Date) =>
  ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2);

export const formatToYYYY_MM_DD = (date: Date) =>
  date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

export const formatToDate = (TimeString4digits: string) => {
  const date = new Date();
  date.setHours(Number(TimeString4digits.slice(0, 2)));
  date.setMinutes(Number(TimeString4digits.slice(2)));
  return date;
};

export const timeString4digitsDiffMin = (startTime: string, endTime: string) => {
  const diffHour = parseInt(endTime.slice(0, 2), 10) - parseInt(startTime.slice(0, 2), 10);
  const diffMinute = parseInt(endTime.slice(-2), 10) - parseInt(startTime.slice(-2), 10);
  return diffHour * 60 + diffMinute;
};

export const formatToTime = (TimeString4digits: string) =>
  TimeString4digits.slice(0, 2) + ':' + TimeString4digits.slice(2);

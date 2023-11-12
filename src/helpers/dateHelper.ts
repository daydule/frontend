export const formatDateToTimeString4digits = (date: Date) =>
  ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2);

export const formatHourMinuteToTimeString4digits = (hour: number, minute: number) =>
  ('0' + hour).slice(-2) + ('0' + minute).slice(-2);

export const formatToYYYY_MM_DD = (date: Date) =>
  date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

export const formatToDate = (timeString4digits: string) => {
  const date = new Date();
  date.setHours(Number(timeString4digits.slice(0, 2)));
  date.setMinutes(Number(timeString4digits.slice(2)));
  return date;
};

export const formatToDisplayString = (timeString4digits: string) =>
  timeString4digits.slice(0, 2) + ':' + timeString4digits.slice(2);

export const convertToHourMinute = (timeString4digits: string) => {
  const timeInt = parseInt(timeString4digits, 10);
  return { hour: Math.floor(timeInt / 100), minute: timeInt % 100 };
};

export const roundTimeString4digitsToQuarterHour = (timeString4digits: string) => {
  const { hour, minute } = convertToHourMinute(timeString4digits);
  const roundedMinute = Math.round(minute / 15) * 15;
  const isHourIncrement = roundedMinute === 60;
  const incrementedHour = hour + (isHourIncrement ? 1 : 0);
  const normalizedHour = incrementedHour >= 24 ? incrementedHour - 24 : incrementedHour;
  const resultMinute = isHourIncrement ? 0 : roundedMinute;
  const resultHour = normalizedHour;

  return ('0' + resultHour).slice(-2) + ('0' + resultMinute).slice(-2);
};

export const getTimeString4digitsDiffMin = (startTime: string, endTime: string) => {
  const startTimeHour = parseInt(startTime.slice(0, 2), 10);
  const endTimeHour = parseInt(endTime.slice(0, 2), 10);
  const adjustedEndTimeHour = endTimeHour < startTimeHour ? endTimeHour + 24 : endTimeHour;
  const diffHour = adjustedEndTimeHour - startTimeHour;

  const diffMinute = parseInt(endTime.slice(-2), 10) - parseInt(startTime.slice(-2), 10);
  return diffHour * 60 + diffMinute;
};

import { getTimeString4digitsDiffMin } from './dateHelper';

export const getHeightPercent = (startTime: string, endTime: string, oneMinuteHeightPercent: number) => {
  return getTimeString4digitsDiffMin(startTime, endTime) * oneMinuteHeightPercent;
};

export const getPositionPercent = (
  startTime: string,
  oneMinuteHeightPercent: number,
  scheduleStartTimeHour: number,
) => {
  const startHour = parseInt(startTime.slice(0, 2), 10) - scheduleStartTimeHour;
  const startMinute = parseInt(startTime.slice(-2), 10);
  return Math.round((startHour * 60 + startMinute) * oneMinuteHeightPercent * 100) / 100;
};

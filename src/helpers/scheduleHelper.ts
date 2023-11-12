import {
  formatHourMinuteToTimeString4digits,
  getTimeString4digitsDiffMin,
  roundTimeString4digitsToQuarterHour,
} from './dateHelper';
import { CONSTANT } from '@/constant/default';
import { Plan } from '@/redux/types';

export const getHeight = (startTime: string, endTime: string, oneMinuteHeight: number) => {
  return getTimeString4digitsDiffMin(startTime, endTime) * oneMinuteHeight;
};

export const getPosition = (startTime4digitsString: string, oneMinuteHeight: number) => {
  const startHour = parseInt(startTime4digitsString.slice(0, 2), 10);
  const startMinute = parseInt(startTime4digitsString.slice(-2), 10);
  return (startHour * 60 + startMinute) * oneMinuteHeight;
};

export const getTimeString4digits = (top: number, oneMinuteHeight: number) => {
  const minute = top / oneMinuteHeight;
  const startHour = Math.floor(minute / 60);
  const startMinute = Math.floor(minute % 60);
  return formatHourMinuteToTimeString4digits(startHour, startMinute);
};

export const getNewTimeString4digits = (position: number, oneMinuteHeight: number) => {
  const notRoundedTime = getTimeString4digits(position, oneMinuteHeight);
  return roundTimeString4digitsToQuarterHour(notRoundedTime);
};

export const getNewTimeAfterDropped = (plan: Plan, deltaY: number, oneMinuteHeight: number) => {
  const previousTopPosition = getPosition(plan.startTime, oneMinuteHeight);
  const notRoundedNewTopPosition = previousTopPosition + deltaY;
  const processTime = getTimeString4digitsDiffMin(plan.startTime, plan.endTime);

  let newTopPosition = notRoundedNewTopPosition > 0 ? notRoundedNewTopPosition : 0;
  let newStartTime = getNewTimeString4digits(newTopPosition, oneMinuteHeight);

  const newBottomPosition = newTopPosition + processTime * oneMinuteHeight;
  let newEndTime = getNewTimeString4digits(newBottomPosition, oneMinuteHeight);

  if (newBottomPosition > CONSTANT.MINUTES_IN_DAY * oneMinuteHeight) {
    newEndTime = '0000';
    newTopPosition = getPosition('2400', oneMinuteHeight) - processTime * oneMinuteHeight;
    newStartTime = getNewTimeString4digits(newTopPosition, oneMinuteHeight);
  }
  return { newStartTime, newEndTime };
};

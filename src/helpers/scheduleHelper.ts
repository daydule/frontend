import {
  convertHourMinuteToTimeString4digits,
  getTimeString4digitsDiffMin,
  roundTimeString4digitsToQuarterHour,
} from './dateHelper';
import { CONSTANT } from '@/constant/default';
import { Plan } from '@/redux/types';

/**
 * 現在時刻を基に、トップ位置を計算します
 * @param {number} oneMinuteHeight - 1分あたりの高さ
 * @returns {number} - 現在時刻に対応するトップ位置
 */
export const getNowTop = (oneMinuteHeight: number) => {
  const now = new Date();

  return (now.getHours() * 60 + now.getMinutes()) * oneMinuteHeight;
};

/**
 * 開始時間と終了時間から要素の高さを計算します
 * @param {string} startTime - 開始時間（「HHMM」形式）
 * @param {string} endTime - 終了時間（「HHMM」形式）
 * @param {number} oneMinuteHeight - 1分あたりの高さ
 * @returns {number} - 要素の高さ
 */
const getHeight = (startTime: string, endTime: string, oneMinuteHeight: number) => {
  return getTimeString4digitsDiffMin(startTime, endTime) * oneMinuteHeight;
};

/**
 * 指定された時間に対応するトップ位置を計算します
 * @param {string} startTime4digitsString - 開始時間（「HHMM」形式）
 * @param {number} oneMinuteHeight - 1分あたりの高さ
 * @returns {number} - トップ位置
 */
const getTop = (startTime4digitsString: string, oneMinuteHeight: number) => {
  const startHour = parseInt(startTime4digitsString.slice(0, 2), 10);
  const startMinute = parseInt(startTime4digitsString.slice(-2), 10);
  return (startHour * 60 + startMinute) * oneMinuteHeight;
};

/**
 * 開始時間と終了時間からトップ位置と高さを計算します
 * @param {string} startTime - 開始時間（「HHMM」形式）
 * @param {string} endTime - 終了時間（「HHMM」形式）
 * @param {number} oneMinuteHeight - 1分あたりの高さ
 * @returns {{top: number, height: number}} - トップ位置と高さのオブジェクト
 */
export const getTopAndHeight = (startTime: string, endTime: string, oneMinuteHeight: number) => {
  return {
    top: getTop(startTime, oneMinuteHeight),
    height: getHeight(startTime, endTime, oneMinuteHeight),
  };
};

/**
 * トップ位置から「HHMM」形式の時間文字列を生成します
 * @param {number} top - トップ位置
 * @param {number} oneMinuteHeight - 1分あたりの高さ
 * @returns {string} - 「HHMM」形式の時間文字列
 */
export const getTimeString4digits = (top: number, oneMinuteHeight: number) => {
  const minute = top / oneMinuteHeight;
  const startHour = Math.floor(minute / 60);
  const startMinute = Math.floor(minute % 60);
  return convertHourMinuteToTimeString4digits(startHour, startMinute);
};

/**
 * 位置から15分単位に丸められた「HHMM」形式の時間文字列を生成します
 * @param {number} position - 位置
 * @param {number} oneMinuteHeight - 1分あたりの高さ
 * @returns {string} - 丸められた「HHMM」形式の時間文字列
 */
export const getNewTimeString4digits = (position: number, oneMinuteHeight: number) => {
  const notRoundedTime = getTimeString4digits(position, oneMinuteHeight);
  return roundTimeString4digitsToQuarterHour(notRoundedTime);
};

/**
 * ドロップ後の新しい開始時間と終了時間を計算します
 * @param {Plan} plan - 予定オブジェクト
 * @param {number} deltaY - Y軸の変化量
 * @param {number} oneMinuteHeight - 1分あたりの高さ
 * @returns {{newStartTime: string, newEndTime: string}} - 新しい開始時間と終了時間
 */
export const getNewTimeAfterDropped = (plan: Plan, deltaY: number, oneMinuteHeight: number) => {
  const previousTopPosition = getTop(plan.startTime, oneMinuteHeight);
  const notRoundedNewTopPosition = previousTopPosition + deltaY;
  const processTime = getTimeString4digitsDiffMin(plan.startTime, plan.endTime);

  let newTopPosition = notRoundedNewTopPosition > 0 ? notRoundedNewTopPosition : 0;
  let newStartTime = getNewTimeString4digits(newTopPosition, oneMinuteHeight);

  const newBottomPosition = newTopPosition + processTime * oneMinuteHeight;
  let newEndTime = getNewTimeString4digits(newBottomPosition, oneMinuteHeight);

  if (newBottomPosition > CONSTANT.MINUTES_IN_DAY * oneMinuteHeight) {
    newEndTime = '0000';
    newTopPosition = getTop('2400', oneMinuteHeight) - processTime * oneMinuteHeight;
    newStartTime = getNewTimeString4digits(newTopPosition, oneMinuteHeight);
  }
  return { newStartTime, newEndTime };
};

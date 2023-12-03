/**
 * 指定された日付から「HHMM」形式の文字列を生成します
 * @param {Date} date - 変換する日付
 * @returns {string} - 「HHMM」形式の時間文字列
 */
export const convertDateToTimeString4digits = (date: Date) =>
  ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2);

/**
 * 時間と分から「HHMM」形式の文字列を生成します
 * @param {number} hour - 時間
 * @param {number} minute - 分
 * @returns {string} - 「HHMM」形式の時間文字列
 */
export const convertHourMinuteToTimeString4digits = (hour: number, minute: number) =>
  ('0' + hour).slice(-2) + ('0' + minute).slice(-2);

/**
 * 日付を「YYYY-MM-DD」形式の文字列に変換します
 * @param {Date} date - 変換する日付
 * @returns {string} - 「YYYY-MM-DD」形式の日付文字列
 */
export const convertToYYYY_MM_DD = (date: Date) =>
  date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

/**
 * 「HHMM」形式の文字列からDateオブジェクトを生成します
 * @param {string} timeString4digits - 「HHMM」形式の時間文字列
 * @returns {Date} - 生成されたDateオブジェクト
 */
export const convertToDate = (timeString4digits: string) => {
  const date = new Date();
  date.setHours(Number(timeString4digits.slice(0, 2)));
  date.setMinutes(Number(timeString4digits.slice(2)));
  return date;
};

/**
 * 「HHMM」形式の文字列を「HH:MM」形式に変換します
 * @param {string} timeString4digits - 「HHMM」形式の時間文字列
 * @returns {string} - 「HH:MM」形式の時間文字列
 */
export const convertToColonSeparatedTime = (timeString4digits: string) =>
  timeString4digits.slice(0, 2) + ':' + timeString4digits.slice(2);

/**
 * 「HHMM」形式の文字列を時間と分に分割します
 * @param {string} timeString4digits - 「HHMM」形式の時間文字列
 * @returns {{hour: number, minute: number}} - 時間と分のオブジェクト
 */
export const convertToHourMinute = (timeString4digits: string) => {
  const timeInt = parseInt(timeString4digits, 10);
  return { hour: Math.floor(timeInt / 100), minute: timeInt % 100 };
};

/**
 * 「HHMM」形式の時間文字列を最も近い15分単位に丸めます
 * @param {string} timeString4digits - 「HHMM」形式の時間文字列
 * @returns {string} - 丸められた時間文字列
 */
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

/**
 * 開始時間と終了時間の差（分単位）を計算します
 * @param {string} startTime - 開始時間（「HHMM」形式）
 * @param {string} endTime - 終了時間（「HHMM」形式）
 * @returns {number} - 分単位での時間差
 */
export const getTimeString4digitsDiffMin = (startTime: string, endTime: string) => {
  const startTimeHour = parseInt(startTime.slice(0, 2), 10);
  const endTimeHour = parseInt(endTime.slice(0, 2), 10);
  const adjustedEndTimeHour = endTimeHour < startTimeHour ? endTimeHour + 24 : endTimeHour;
  const diffHour = adjustedEndTimeHour - startTimeHour;

  const diffMinute = parseInt(endTime.slice(-2), 10) - parseInt(startTime.slice(-2), 10);
  return diffHour * 60 + diffMinute;
};

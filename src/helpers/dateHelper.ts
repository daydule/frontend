export const formatToTimeString4digits = (date: Date) =>
  ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2);

export const formatToYYYY_MM_DD = (date: Date) =>
  date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

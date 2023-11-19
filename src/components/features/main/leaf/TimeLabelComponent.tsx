import { formatHourMinuteToTimeString4digits, formatToDisplayString } from '@/helpers/dateHelper';

type Props = {
  hour: number;
  minute: number;
};

export const TimeLabelComponent = ({ hour, minute }: Props) => {
  const timeString4digits = formatHourMinuteToTimeString4digits(hour, minute);
  const displayString = formatToDisplayString(timeString4digits);

  return <div>{displayString}</div>;
};

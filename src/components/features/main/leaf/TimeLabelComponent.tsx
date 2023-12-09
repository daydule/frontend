import { convertHourMinuteToTimeString4digits, convertToColonSeparatedTime } from '@/helpers/dateHelper';

type Props = {
  hour: number;
  minute: number;
};

export const TimeLabelComponent = ({ hour, minute }: Props) => {
  const timeString4digits = convertHourMinuteToTimeString4digits(hour, minute);
  const displayString = convertToColonSeparatedTime(timeString4digits);

  return <div>{displayString}</div>;
};

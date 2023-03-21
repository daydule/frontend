import { ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  id: string;
  name: string;
  header: string;
  value: Date;
  extraClassName?: string | undefined;
  setter: React.Dispatch<React.SetStateAction<Date>>;
};

export const TimePickerComponent = (props: Props) => {
  return (
    <DatePicker
      selected={props.value}
      onChange={(date: Date) => props.setter(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption={props.header}
      dateFormat='hh:mm aa'
      className={props.extraClassName + ' ' + 'w-full border border-gray-100 shadow-sm text-base block p-1 h-12'}
    />
  );
};

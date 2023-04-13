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
  onChange?: (date: Date) => void;
};

export const TimePickerComponent = (props: Props) => {
  const onChange = (date: Date) => {
    props.setter(date);
    props.onChange && props.onChange(date);
  };

  return (
    <DatePicker
      selected={props.value}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption={props.header}
      dateFormat='hh:mm aa'
      className={props.extraClassName + ' ' + 'w-full border border-gray-200 shadow-md text-base block p-1 h-12'}
    />
  );
};

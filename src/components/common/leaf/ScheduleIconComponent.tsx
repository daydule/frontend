import React from 'react';
import { IconContext } from 'react-icons';
import { AiFillSchedule } from 'react-icons/ai';

type Props = {
  size: string;
  className?: string;
};

const ScheduleIconComponent = (props: Props) => {
  return (
    <IconContext.Provider value={{ size: props.size, className: props.className }}>
      <AiFillSchedule />
    </IconContext.Provider>
  );
};
export default ScheduleIconComponent;

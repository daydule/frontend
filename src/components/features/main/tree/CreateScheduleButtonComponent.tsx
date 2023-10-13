import { useState } from 'react';
import { IoMdOptions } from 'react-icons/io';
import { MdMoreTime } from 'react-icons/md';
import { TooltipComponent } from '../../../common/tree/ToolTipComponent';
import { RegisterSchedulingOptionsModalComponent } from './RegisterSchedulingOptionsModalComponent';
import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { useCreateScheduleMutation } from '@/redux/schedule/slice';

export const CreateScheduleButtonComponent = () => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleClickCreateSchedule = async () => {
    const now = new Date();
    const dateString = formatToYYYY_MM_DD(now);
    const currentTime = ('00' + now.getHours()).slice(-2) + ('00' + now.getMinutes()).slice(-2);
    try {
      await createSchedule({ date: dateString, currentTime: currentTime }).unwrap().catch(errorHandler);
    } catch (e) {
      console.log(e);
    }
  };
  const [showsModal, setShowsModal] = useState<boolean>(false);

  const handleClickOption = () => {
    setShowsModal(true);
  };

  const handleClose = () => {
    setShowsModal(false);
  };

  return (
    <div className='flex justify-center'>
      <div onClick={handleClickOption} className='flex h-12 w-12 items-center justify-center'>
        <TooltipComponent content='TODOを予定にする際のオプションを設定する' extraClassName='bottom-7 right-2 w-44'>
          <IoMdOptions size={25} />
        </TooltipComponent>
      </div>
      <TooltipComponent content='TODO一覧にあるTODOを予定にする' extraClassName='bottom-12 w-64 left-8'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-indigo-700 pb-1 pl-1 text-white shadow-[0px_0px_1px_1px_rgba(0,0,0,0.3)] hover:bg-indigo-600'>
          <div onClick={handleClickCreateSchedule}>
            <MdMoreTime size={30} />
          </div>
        </div>
      </TooltipComponent>
      {showsModal && <RegisterSchedulingOptionsModalComponent showsModal={showsModal} handleClose={handleClose} />}
    </div>
  );
};

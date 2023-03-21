import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { useReadScheduleQuery } from '@/redux/schedule/slice';

export const ScheduleComponent = () => {
  const dateString = formatToYYYY_MM_DD(new Date());
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });
  return (
    <div className='border border-gray-100 shadow-md rounded-md w-full h-[calc(100%_-_2rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl'>スケジュール</div>
      <div className='mt-8'>
        {scheduleReadResult?.schedule.plans.map((plan) => (
          <div key={plan.id} className='flex'>
            <div className='w-1/12'>{plan.title}</div>
            <div className='w-1/12'>{plan.startTime}</div>
            <div className='w-1/12'>{plan.endTime}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

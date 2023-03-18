import { useReadScheduleQuery } from '@/redux/schedule/slice';

export const ScheduleComponent = () => {
  const d = new Date();
  const dateString = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });
  return (
    <div className='border border-black rounded-md w-full h-[calc(100%_-_2rem)] my-4 relative'>
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

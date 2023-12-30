import dynamic from 'next/dynamic';
const ScheduleIconComponent = dynamic(() => import('@/components/common/leaf/ScheduleIconComponent'), {
  ssr: false,
});

export const MaintenanceHeaderComponent = () => {
  return (
    <div className='fixed left-0 top-0 z-10 flex h-20 w-full items-center border-b bg-indigo-700 px-8 text-left text-3xl text-white shadow-xl'>
      <div className='my-0 ml-0 mr-5 flex duration-300'>
        <ScheduleIconComponent size='1.5em' className='text-opacity-90' />
        <div className='mx-2 font-mono text-4xl font-extrabold transition ease-in-out'>daydule</div>
      </div>
    </div>
  );
};

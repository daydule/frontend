type Props = {
  top: number;
  height: number;
};

export const AvailableTimeRangeComponent = ({ top, height }: Props) => {
  return (
    <div
      style={{ top: top, height: height }}
      className='absolute flex w-full justify-end rounded-lg bg-blue-300/50 p-4'
    >
      <div className='z-10 text-lg text-gray-500'>
        <p>作業する時間帯</p>
      </div>
    </div>
  );
};

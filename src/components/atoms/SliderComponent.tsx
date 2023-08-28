import React from 'react';
import { Range } from 'react-range';

type Props = {
  min: number;
  max: number;
  title: string;
  unit: string;
  values: number[];
  setter: React.Dispatch<React.SetStateAction<number[]>>;
};

const SliderComponent = (props: Props) => {
  const handleChange = (newValues: number[]) => {
    props.setter(newValues);
  };

  return (
    <div className='relative flex flex-col items-center'>
      <Range
        step={5}
        min={props.min}
        max={props.max}
        values={props.values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div {...props} className='h-2 w-full rounded-full bg-gray-200 shadow-md'>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className='h-4 w-4 rounded-full bg-gray-400 shadow-md focus:outline-none' />
        )}
      />
      <div className='absolute -left-1 top-2'>{props.min}</div>
      <div className='absolute -right-1 top-2'>{props.max}</div>
      <div className='mt-1'>
        <span className='text-gray-700'>{props?.title + ' '}</span>
        <span className='text-xl text-gray-700'>{props?.values[0]}</span>
        <span className='text-gray-700'>{props?.unit}</span>
      </div>
    </div>
  );
};

export default SliderComponent;

import React, { useState } from 'react';
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
    <div className='flex flex-col items-center relative'>
      <Range
        step={5}
        min={props.min}
        max={props.max}
        values={props.values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div {...props} className='h-2 bg-gray-200 w-full rounded-full shadow-md'>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className='w-4 h-4 bg-gray-400 shadow-md rounded-full focus:outline-none' />
        )}
      />
      <div className='absolute top-2 -left-1'>{props.min}</div>
      <div className='absolute top-2 -right-1'>{props.max}</div>
      <div className='mt-1'>
        <span className='text-gray-700'>{props?.title + ' '}</span>
        <span className='text-gray-700 text-xl'>{props?.values[0]}</span>
        <span className='text-gray-700'>{props?.unit}</span>
      </div>
    </div>
  );
};

export default SliderComponent;

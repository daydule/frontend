import React, { useState } from 'react';
import { Range } from 'react-range';
import { twMerge } from 'tailwind-merge';

type Props = {
  min: number;
  max: number;
  title: string;
  unit: string;
  values: number[];
  setter: React.Dispatch<React.SetStateAction<number[]>>;
  extraClassName: string;
};

const SliderComponent = (props: Props) => {
  const handleChange = (newValues: number[]) => {
    props.setter(newValues);
  };

  return (
    <div className={twMerge('relative flex flex-col items-center', props.extraClassName)}>
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
        <span>{props?.title + ' '}</span>
        <span className='text-xl'>{props?.values[0]}</span>
        <span>{props?.unit}</span>
      </div>
    </div>
  );
};

export default SliderComponent;

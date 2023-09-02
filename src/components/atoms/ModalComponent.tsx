import { Dialog } from '@headlessui/react';
import React, { ReactNode, useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const ModalComponent = (props: ModalProps) => {
  const handleCloseModal = () => {
    props.onClose();
  };

  return (
    <Dialog as='div' className='fixed inset-0 z-50 overflow-y-auto' open onClose={handleCloseModal}>
      <div className='min-h-screen px-4 text-center'>
        <Dialog.Overlay className='fixed inset-0 bg-black/30' />

        <span className='inline-block h-screen align-middle' aria-hidden='true'>
          &#8203;
        </span>
        <Dialog.Panel className='relative inline-block w-full max-w-2xl rounded-2xl bg-white text-left align-middle shadow-xl'>
          <div className='relative flex w-full rounded-t-2xl bg-indigo-700 p-4'>
            <Dialog.Title as='div' className='w-[95%] text-2xl font-medium leading-6 text-white'>
              {props.title}
            </Dialog.Title>
            <button className='left-0 text-white hover:text-gray-300' onClick={handleCloseModal}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                <path
                  fillRule='evenodd'
                  d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          <div className='p-4'>{props.children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

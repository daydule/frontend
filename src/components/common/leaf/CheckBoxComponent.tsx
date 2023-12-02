import { twMerge } from 'tailwind-merge';

type Props = {
  id: string;
  name: string;
  title: string;
  value: boolean;
  labelLocation: 'top' | 'bottom' | 'left' | 'right';
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckBoxComponent = (props: Props) => {
  let parentClass = '';
  let extraLabelClass;
  let extraInputClass;
  switch (props.labelLocation) {
    case 'top':
      parentClass = 'relative inline-block w-auto';
      extraLabelClass = 'mb-2 ml-1 mr-1';
      extraInputClass = 'absolute inset-x-0 mx-auto';
      break;
    case 'bottom':
      parentClass = 'relative inline-block w-auto';
      extraLabelClass = 'mt-6 ml-1 mr-1';
      extraInputClass = 'absolute inset-x-0 mx-auto';
      break;
    case 'left':
      parentClass = 'flex';
      extraLabelClass = 'mr-2';
      break;
    case 'right':
      parentClass = 'flex';
      extraLabelClass = 'ml-2';
      break;
  }
  return (
    <div className={`${parentClass}`}>
      {(props.labelLocation == 'top' || props.labelLocation == 'left') && (
        <label
          htmlFor={props.id}
          className={twMerge('block text-sm font-medium text-gray-900', `${extraLabelClass}`)}
          children={props.title}
        />
      )}
      <input
        id={props.id}
        name={props.name}
        type='checkbox'
        checked={props.value}
        className={twMerge(
          'my-auto block h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500',
          `${extraInputClass}`,
        )}
        onChange={props.handleChange}
      />
      {(props.labelLocation == 'bottom' || props.labelLocation == 'right') && (
        <label
          htmlFor={props.id}
          className={twMerge('block text-sm font-medium text-gray-900', `${extraLabelClass}`)}
          children={props.title}
        />
      )}
    </div>
  );
};

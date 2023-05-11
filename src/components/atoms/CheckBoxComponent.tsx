type Props = {
  id: string;
  name: string;
  title: string;
  value: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckBoxComponent = (props: Props) => {
  return (
    <div className='relative'>
      <input
        id={props.id}
        name={props.name}
        type='checkbox'
        checked={props.value}
        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        onChange={props.handleChange}
      />
      <label
        htmlFor={props.id}
        className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        children={props.title}
      />
    </div>
  );
};

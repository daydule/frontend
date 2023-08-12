type Props = {
  id: string;
  name: string;
  title: string;
  value: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckBoxComponent = (props: Props) => {
  return (
    <div className='flex'>
      <input
        id={props.id}
        name={props.name}
        type='checkbox'
        checked={props.value}
        className='my-auto block h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
        onChange={props.handleChange}
      />
      <label
        htmlFor={props.id}
        className='ml-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
        children={props.title}
      />
    </div>
  );
};

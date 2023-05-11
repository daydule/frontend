type Props = {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  extraClassName?: string | undefined;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextAreaComponent = (props: Props) => {
  return (
    <div className='relative'>
      <textarea
        id={props.id}
        name={props.name}
        value={props.value}
        className={
          props.extraClassName + ' ' + 'w-full border border-gray-200 shadow-md rounded-lg text-base block p-2.5 h-8'
        }
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
    </div>
  );
};

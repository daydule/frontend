import { MdInfoOutline } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { TooltipComponent } from '@/components/common/tree/ToolTipComponent';

type Props = {
  content: string;
  extraClassName?: string;
};

export const InfoIconComponent = (props: Props) => {
  return (
    <TooltipComponent content={props.content} extraClassName='w-64 bottom-5 left-5'>
      <div className={twMerge('text-gray-500', props.extraClassName)}>
        <MdInfoOutline />
      </div>
    </TooltipComponent>
  );
};

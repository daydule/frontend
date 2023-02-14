import { ReactNode } from 'react';
import FooterComponent from '@/components/utils/FooterComponent';
import HeaderComponent from '@/components/utils/HeaderComponent';

type Props = {
  children: ReactNode;
};

const LayoutComponent: React.FC<Props> = ({ children }) => {
  return (
    <div className='bg-white w-full h-screen border border-white'>
      <HeaderComponent />
      <div className='w-[calc(100%_-_2rem)] h-[calc(100%_-_9rem)] my-20 mx-4 border border-white'>{children}</div>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;

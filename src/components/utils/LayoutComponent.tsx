import { ReactNode } from 'react';
import FooterComponent from '@/components/utils/FooterComponent';
import HeaderComponent from '@/components/utils/HeaderComponent';

type Props = {
  children: ReactNode;
};

const LayoutComponent: React.FC<Props> = ({ children }) => {
  return (
    <div className='w-full h-screen'>
      <HeaderComponent />
      <div className='w-full h-[calc(100%_-_12rem)]'>{children}</div>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;

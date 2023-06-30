import { ReactNode } from 'react';
import { FooterComponent } from '@/components/atoms/FooterComponent';
import { HeaderComponent } from '@/components/organisms/HeaderComponent';

type Props = {
  children: ReactNode;
};

const LayoutComponent = (props: Props) => {
  return (
    <div className='bg-white w-full h-screen border border-white'>
      <HeaderComponent />
      <div className='w-[calc(100%_-_2rem)] h-[calc(100%_-_7rem)] mt-20 mb-8 mx-4 border border-white'>
        {props.children}
      </div>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;

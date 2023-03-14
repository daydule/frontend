import { AuthCheckComponent } from '@/components/utils/AuthCheckComponent';
import { NextPage } from 'next';
import { IndividualSettingComponent } from '@/components/organisms/IndividualSettingComponent';

const IndividualSettingsPage: NextPage = () => {
  return (
    <AuthCheckComponent checkLevel='guest'>
      <div className='container mt-20  w-[calc(100%_-_25rem)] h-full mx-auto'>
        <IndividualSettingComponent />
      </div>
    </AuthCheckComponent>
  );
};

export default IndividualSettingsPage;

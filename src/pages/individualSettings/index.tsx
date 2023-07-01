import { RedirectWithAuthCheckComponent } from '@/components/molecules/RedirectWithAuthCheckComponent';
import { NextPage } from 'next';
import { IndividualSettingComponent } from '@/components/organisms/IndividualSettingComponent';

const IndividualSettingsPage: NextPage = () => {
  return (
    <RedirectWithAuthCheckComponent checkLevel='loginAsIdentifiedUser'>
      <div className='container mt-20  w-[calc(100%_-_25rem)] h-full mx-auto'>
        <IndividualSettingComponent />
      </div>
    </RedirectWithAuthCheckComponent>
  );
};

export default IndividualSettingsPage;

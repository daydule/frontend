import { NextPage } from 'next';
import { RedirectWithAuthCheckComponent } from '@/components/molecules/RedirectWithAuthCheckComponent';
import { IndividualSettingComponent } from '@/components/organisms/IndividualSettingComponent';

const IndividualSettingsPage: NextPage = () => {
  return (
    <RedirectWithAuthCheckComponent checkLevel='loginAsIdentifiedUser'>
      <div className='container mx-auto  mt-20 h-full w-[calc(100%_-_25rem)]'>
        <IndividualSettingComponent />
      </div>
    </RedirectWithAuthCheckComponent>
  );
};

export default IndividualSettingsPage;

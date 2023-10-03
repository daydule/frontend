import { NextPage } from 'next';
import { IndividualSettingComponent } from '@/components/pages/individualSettings/forest/IndividualSettingsComponent';
import { RedirectWithAuthCheckComponent } from '@/components/common/tree/RedirectWithAuthCheckComponent';

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

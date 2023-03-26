import { RedirectWithAuthCheckComponent } from '@/components/utils/RedirectWithAuthCheckComponent';
import { NextPage } from 'next';

const IndividualSettingsPage: NextPage = () => {
  return (
    <RedirectWithAuthCheckComponent checkLevel='loginAsIdentifiedUser'>
      <h1>This is IndividualSettingsPage.</h1>
    </RedirectWithAuthCheckComponent>
  );
};

export default IndividualSettingsPage;

import { AuthCheckComponent } from '@/components/utils/AuthCheckComponent';
import { NextPage } from 'next';

const IndividualSettingsPage: NextPage = () => {
  return (
    <AuthCheckComponent checkLevel='guest'>
      <h1>This is IndividualSettingsPage.</h1>
    </AuthCheckComponent>
  );
};

export default IndividualSettingsPage;

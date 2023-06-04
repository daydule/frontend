import { NextPage } from 'next';
import { SignupComponent } from '@/components/organisms/SignupComponent';
import { RedirectToMainIfSignupComponent } from '@/components/utils/RedirectToMainIfSignupComponent';

const SignupPage: NextPage = () => {
  return (
    <RedirectToMainIfSignupComponent>
      <div className='container my-28 mx-auto xl:w-2/5 w-full'>
        <SignupComponent />
      </div>
    </RedirectToMainIfSignupComponent>
  );
};

export default SignupPage;

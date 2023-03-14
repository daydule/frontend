import { NextPage } from 'next';
import { SignupComponent } from '@/components/organisms/SignupComponent';
import { RedirectToMainIfLoginComponent } from '@/components/utils/RedirectToMainIfLoginComponent';

const SignupPage: NextPage = () => {
  return (
    <RedirectToMainIfLoginComponent>
      <div className='container my-28 mx-auto xl:w-2/5 w-full'>
        <SignupComponent />
      </div>
    </RedirectToMainIfLoginComponent>
  );
};

export default SignupPage;

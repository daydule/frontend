import { NextPage } from 'next';
import { SignupComponent } from '@/components/organisms/SignupComponent';

const SignupPage: NextPage = () => {
  return (
    <>
      <div className='container my-28 mx-auto xl:w-2/5 w-full'>
        <SignupComponent />
      </div>
    </>
  );
};

export default SignupPage;

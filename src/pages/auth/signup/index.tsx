import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LoadingComponent } from '@/components/common/leaf/LoadingComponent';
import { SignupComponent } from '@/components/features/auth/signup/forest/SignupComponent';
// import { RedirectToMainIfSignupComponent } from '@/components/utils/RedirectToMainIfSignupComponent';
import { useReadUserQuery } from '@/redux/user/slice';

const SignupPage: NextPage = () => {
  const router = useRouter();
  const { data: readUserResult, isFetching, isError } = useReadUserQuery();

  if (!isFetching) {
    if (isError || readUserResult?.user.isGuest) {
      return (
        <div className='container mx-auto my-28 w-full xl:w-2/5'>
          <SignupComponent />
        </div>
      );
    } else {
      router.replace('/main');
    }
  }
  return <LoadingComponent />;
};

export default SignupPage;

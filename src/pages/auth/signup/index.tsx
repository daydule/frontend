import { NextPage } from 'next';
import { SignupComponent } from '@/components/organisms/SignupComponent';
// import { RedirectToMainIfSignupComponent } from '@/components/utils/RedirectToMainIfSignupComponent';
import { useRouter } from 'next/router';
import { useReadUserQuery } from '@/redux/user/slice';
import { LoadingComponent } from '@/components/atoms/LoadingComponent';

const SignupPage: NextPage = () => {
  const router = useRouter();
  const { data: readUserResult, isFetching, isError } = useReadUserQuery();

  if (!isFetching) {
    if (isError || readUserResult?.user.isGuest) {
      return (
        <div className='container my-28 mx-auto xl:w-2/5 w-full'>
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

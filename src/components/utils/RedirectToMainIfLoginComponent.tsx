import { useReadUserQuery } from '@/redux/user/slice';
import { useRouter } from 'next/router';
import { LoadingComponent } from '@/components/atoms/LoadingComponent';

type Props = {
  children: JSX.Element;
};

export const RedirectToMainIfLoginComponent = (props: Props) => {
  const router = useRouter();
  const { data: readUserResult, isFetching, isError } = useReadUserQuery();

  if (!isFetching) {
    if (isError || readUserResult?.user.isGuest) {
      return props.children;
    } else {
      router.replace('/main');
    }
  }
  return <LoadingComponent />;
};

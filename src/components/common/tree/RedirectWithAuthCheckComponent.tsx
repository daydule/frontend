import { useRouter } from 'next/router';
import { LoadingComponent } from '../leaf/LoadingComponent';
import { useReadUserQuery } from '@/redux/user/slice';

type Props = {
  children: JSX.Element;
  checkLevel: 'onlyLogin' | 'loginAsIdentifiedUser';
};

export const RedirectWithAuthCheckComponent = (props: Props) => {
  const router = useRouter();
  const { data: readUserResult, isFetching, isError } = useReadUserQuery();

  if (!isFetching && readUserResult) {
    if (!isError && (props.checkLevel === 'onlyLogin' || !readUserResult.user.isGuest)) {
      return props.children;
    }
    if (isError) {
      router.replace('/auth/login');
    } else if (readUserResult.user.isGuest) {
      router.replace('/main');
    }
  }
  return <LoadingComponent />;
};

import { useGuestCheckQuery } from '@/redux/auth/slice';
import { useRouter } from 'next/router';

type Props = {
  children: JSX.Element;
  checkLevel: 'login' | 'guest';
};

export const AuthCheckComponent = (props: Props) => {
  const router = useRouter();
  const { data: guestCheckResult, isFetching } = useGuestCheckQuery();

  if (!isFetching && guestCheckResult) {
    if (guestCheckResult.isLogin && (props.checkLevel === 'login' || !guestCheckResult.isGuest)) {
      return props.children;
    }
    if (!guestCheckResult.isLogin) {
      router.replace('/auth/login');
    } else if (guestCheckResult.isGuest) {
      router.replace('/main');
    }
  }
  return <></>;
};

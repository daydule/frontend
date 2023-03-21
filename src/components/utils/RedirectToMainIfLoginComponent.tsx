import { useGuestCheckQuery } from '@/redux/auth/slice';
import { useRouter } from 'next/router';

type Props = {
  children: JSX.Element;
};

export const RedirectToMainIfLoginComponent = (props: Props) => {
  const router = useRouter();
  const { data: guestCheckResult, isFetching } = useGuestCheckQuery();

  if (!isFetching && guestCheckResult) {
    if (!guestCheckResult.isLogin) {
      return props.children;
    } else {
      router.replace('/main');
    }
  }
  return <></>;
};

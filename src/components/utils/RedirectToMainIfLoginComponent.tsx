import { useReadUserQuery } from '@/redux/user/slice';
import { useRouter } from 'next/router';

type Props = {
  children: JSX.Element;
};

export const RedirectToMainIfLoginComponent = (props: Props) => {
  const router = useRouter();
  const { data: readUserResult, isFetching, isError } = useReadUserQuery();

  if (!isFetching) {
    console.log(readUserResult?.user.isGuest);
    console.log(isError);
    if (isError || readUserResult?.user.isGuest) {
      return props.children;
    } else {
      router.replace('/main');
    }
  }
  return <></>;
};

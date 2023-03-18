import { useReadUserQuery } from '@/redux/user/slice';
import { useRouter } from 'next/router';

type Props = {
  children: JSX.Element;
};

export const RedirectToMainIfLoginComponent = (props: Props) => {
  const router = useRouter();
  const { data: User, isFetching, isError } = useReadUserQuery();

  if (!isFetching && User) {
    if (isError) {
      return props.children;
    } else {
      router.replace('/main');
    }
  }
  return <></>;
};

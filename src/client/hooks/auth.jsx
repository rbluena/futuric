import { useRouter } from 'next/router';
import { useEffectOnce } from 'react-use';
import { useSelector } from 'react-redux';
import { getAuthSelector } from '@app/selectors';

// eslint-disable-next-line import/prefer-default-export
export const useAuthentication = () => {
  const router = useRouter();
  const { isAuthenticated } = useSelector(getAuthSelector);

  useEffectOnce(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  });

  return { isAuthenticated };
};

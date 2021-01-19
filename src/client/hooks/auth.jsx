import { useEffect } from 'react';
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

/**
 * Logged in user must have username and firstname.
 *
 * If signed in user does not have any of the above, should be redirected
 * to profile setting page.
 */
export const useUserSettingsRedirect = () => {
  const { redirectUserToSettings } = useSelector(getAuthSelector);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== '/settings' && redirectUserToSettings) {
      router.push('/settings');
    }
  }, [redirectUserToSettings, router]);

  return {
    redirectToSettings:
      redirectUserToSettings && router.pathname !== '/settings',
  };
};

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { LayoutManager, Head, Footer, Header } from '@app/components';
// import { bootstrapApp } from '@app/actions';
import { getAuthSelector } from '@app/selectors';
import LandingPage from '@app/screens/LandingPage';

export default function Home() {
  const { redirectUserToSettings } = useSelector(getAuthSelector);
  const router = useRouter();

  useEffect(() => {
    if (redirectUserToSettings) {
      return router.push('/settings');
    }
    // dispatch(bootstrapApp());

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectUserToSettings]);

  if (!redirectUserToSettings) {
    return (
      <LayoutManager>
        <Head />
        <Header showHero showTopics />
        <LandingPage />
        <Footer />
      </LayoutManager>
    );
  }

  return null;
}

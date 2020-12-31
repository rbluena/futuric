import React from 'react';
import { useAuthentication } from '@app/hooks';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import WaitingScreen from '@app/screens/WaitingList';

const MyLinks = () => {
  const { isAuthenticated } = useAuthentication();
  // Avoding to show page when redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <LayoutManager>
      <Head title="Waiting List" />
      <Header />
      <WaitingScreen />
      <Footer />
    </LayoutManager>
  );
};

export default MyLinks;

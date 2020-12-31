import React from 'react';
import { useAuthentication } from '@app/hooks';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import UserScreen from '@app/screens/User';

const Me = () => {
  const { isAuthenticated } = useAuthentication();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <LayoutManager>
      <Head title="My Links" />
      <Header />
      <UserScreen />
      <Footer />
    </LayoutManager>
  );
};

export default Me;

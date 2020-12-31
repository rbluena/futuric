import React from 'react';
import { useAuthentication } from '@app/hooks';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import MyLinkScreen from '@app/screens/MyLinks';

const MyLinks = () => {
  const { isAuthenticated } = useAuthentication();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <LayoutManager>
      <Head title="My Links" />
      <Header />
      <MyLinkScreen />
      <Footer />
    </LayoutManager>
  );
};

export default MyLinks;

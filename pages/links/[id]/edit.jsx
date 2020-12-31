import React from 'react';
import { useAuthentication } from '@app/hooks';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import EditLinkScreen from '@app/screens/EditLink';

const ViewLink = () => {
  const { isAuthenticated } = useAuthentication();
  // Avoding to show page when redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <LayoutManager>
      <Head title="Edit Link" />
      <Header />
      <EditLinkScreen />
      <Footer />
    </LayoutManager>
  );
};

export default ViewLink;

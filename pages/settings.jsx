import React from 'react';
import { useAuthentication } from '@app/hooks';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import UserEditScreen from '@app/screens/UserEdit';

const Edit = () => {
  const { isAuthenticated } = useAuthentication();
  // Avoding to show page when redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <LayoutManager>
      <Head title="Edit" />
      <Header />
      <UserEditScreen />
      <Footer />
    </LayoutManager>
  );
};

export default Edit;

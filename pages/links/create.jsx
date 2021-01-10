import React from 'react';
import { useAuthentication } from '@app/hooks';
import { LayoutManager, Head, Header } from '@app/components';
import CreateScreen from '@app/screens/CreateLink';

const Create = () => {
  const { isAuthenticated } = useAuthentication();
  // Avoding to show page when redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <LayoutManager>
      <Head title="Create" description="" />
      <Header />
      <CreateScreen />
    </LayoutManager>
  );
};

export default Create;

import React from 'react';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import UserScreen from '@app/screens/User';

const User = () => (
  <LayoutManager>
    <Head title="My Links" />
    <Header />
    <UserScreen />
    <Footer />
  </LayoutManager>
);

export default User;

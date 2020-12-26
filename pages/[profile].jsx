import React from 'react';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import ProfileScreen from '@app/screens/Profile';

const ViewLink = () => (
  <LayoutManager>
    <Head title="Profile" />
    <Header />
    <ProfileScreen />
    <Footer />
  </LayoutManager>
);

export default ViewLink;

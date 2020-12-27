import React from 'react';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import MyLinkScreen from '@app/screens/MyLinks';

const MyLinks = () => (
  <LayoutManager>
    <Head title="My Links" />
    <Header />
    <MyLinkScreen />
    <Footer />
  </LayoutManager>
);

export default MyLinks;

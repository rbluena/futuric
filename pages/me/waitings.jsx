import React from 'react';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import WaitingScreen from '@app/screens/WaitingList';

const MyLinks = () => (
  <LayoutManager>
    <Head title="Waiting List" />
    <Header />
    <WaitingScreen />
    <Footer />
  </LayoutManager>
);

export default MyLinks;

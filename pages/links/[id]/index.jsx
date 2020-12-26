import React from 'react';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import LinkScreen from '@app/screens/ViewLink';

const ViewLink = () => (
  <LayoutManager>
    <Head title="View Link" />
    <Header />
    <LinkScreen />
    <Footer />
  </LayoutManager>
);

export default ViewLink;

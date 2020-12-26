import React from 'react';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import ViewLinkScreen from '@app/screens/ViewLink';

const ViewLink = () => (
  <LayoutManager>
    <Head title="View Link" />
    <Header />
    <ViewLinkScreen />
    <Footer />
  </LayoutManager>
);

export default ViewLink;

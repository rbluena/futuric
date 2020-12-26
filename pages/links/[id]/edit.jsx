import React from 'react';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import EditLinkScreen from '@app/screens/EditLink';

const ViewLink = () => (
  <LayoutManager>
    <Head title="Edit Link" />
    <Header />
    <EditLinkScreen />
    <Footer />
  </LayoutManager>
);

export default ViewLink;

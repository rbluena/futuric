import React from 'react';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import LinksPage from '@app/screens/AllLinks';

const ViewLink = () => (
  <LayoutManager>
    <Head title="View Link" />
    <Header />
    <LinksPage />
    <Footer />
  </LayoutManager>
);

export default ViewLink;

import React from 'react';
import { LayoutManager, Head, Header } from '@app/components';
import ViewLinkScreen from '@app/screens/ViewLink';

const ViewLink = () => (
  <LayoutManager>
    <Head title="View Link" />
    <Header />
    <ViewLinkScreen />
  </LayoutManager>
);

export default ViewLink;

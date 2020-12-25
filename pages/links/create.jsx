import React from 'react';
import { LayoutManager, Head, Header } from '@app/components';
import CreatePage from '@app/screens/CreatePage';

const create = () => (
  <LayoutManager>
    <Head title="Create Link" description="" />
    <Header />
    <CreatePage />
  </LayoutManager>
);

export default create;

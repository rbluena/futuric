import React from 'react';
import { LayoutManager, Head, Header } from '@app/components';
import CreateScreen from '@app/screens/CreateLink';

const Create = () => (
  <LayoutManager>
    <Head title="Create Link" description="" />
    <Header />
    <CreateScreen />
  </LayoutManager>
);

export default Create;

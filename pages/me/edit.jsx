import React from 'react';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import UserEditScreen from '@app/screens/UserEdit';

const Edit = () => (
  <LayoutManager>
    <Head title="My Links" />
    <Header />
    <UserEditScreen />
    <Footer />
  </LayoutManager>
);

export default Edit;

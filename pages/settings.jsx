import React from 'react';
import { getCookieToken } from '@app/utils/session';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import UserEditScreen from '@app/screens/UserEdit';

export async function getServerSideProps({ req }) {
  try {
    const token = getCookieToken(req);

    if (!token) {
      return {
        redirect: {
          destination: '/#signin-modal',
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

const Edit = () => (
  <LayoutManager>
    <Head title="Settings" />
    <Header />
    <UserEditScreen />
    <Footer />
  </LayoutManager>
);

export default Edit;

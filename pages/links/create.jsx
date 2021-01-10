import React from 'react';
import { getCookieToken } from '@app/utils/session';
import { LayoutManager, Head, Header } from '@app/components';
import CreateScreen from '@app/screens/CreateLink';

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

const Create = () => (
  <LayoutManager>
    <Head title="Create" description="" />
    <Header />
    <CreateScreen />
  </LayoutManager>
);

export default Create;

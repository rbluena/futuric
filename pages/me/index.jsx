import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffectOnce } from 'react-use';
import { decode } from 'jsonwebtoken';
import { getLinksService } from '@app/services';
import { getCookieToken } from '@app/utils/session';
import { getMyLinksSuccess } from '@app/slices/linksSlice';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import MeScreen from '@app/screens/Me';

export async function getServerSideProps({ req }) {
  // const waitingList = {};
  let myLinks = {};

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

    const user = decode(token);

    const response = await Promise.all([
      getLinksService({ owner: user._id, limit: 4 }),
    ]);

    // eslint-disable-next-line prefer-destructuring
    ({ data: myLinks } = response[0]);
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      links: {
        data: myLinks.data || {},
        meta: myLinks.meta || {},
      },
    },
  };
}

const Me = ({ links }) => {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(getMyLinksSuccess(links));
  });

  return (
    <LayoutManager>
      <Head title="My Links" />
      <Header />
      <MeScreen />
      <Footer />
    </LayoutManager>
  );
};

Me.propTypes = {
  links: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Me;

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { getCookieToken, deleteCookieToken } from '@app/utils/session';
import { getUserWaitingsService } from '@app/services';
import { getWaitingsSuccess } from '@app/slices/linksSlice';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import WaitingScreen from '@app/screens/WaitingList';

export async function getServerSideProps({ req }) {
  let waitings = {};

  try {
    const token = getCookieToken(req);

    if (!token) {
      return {
        redirect: {
          destination: '/signout',
          permanent: false,
        },
      };
    }

    ({ data: waitings } = await getUserWaitingsService(token, { limit: 4 }));
  } catch (error) {
    if (error.status === 403) {
      await deleteCookieToken();
      return {
        redirect: {
          destination: '/signout',
          permanent: false,
        },
      };
    }

    return {
      notFound: true,
    };
  }

  return {
    props: {
      waitings: waitings || {},
    },
  };
}

const MyLinks = ({ waitings }) => {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(getWaitingsSuccess(waitings));
  });

  return (
    <LayoutManager>
      <Head title="Waiting List" />
      <Header />
      <WaitingScreen />
      <Footer />
    </LayoutManager>
  );
};

MyLinks.defaultProps = {
  waitings: {},
};

MyLinks.propTypes = {
  waitings: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.shape),
    PropTypes.arrayOf(PropTypes.shape),
  ]),
};

export default MyLinks;

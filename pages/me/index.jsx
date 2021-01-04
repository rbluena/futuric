import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffectOnce } from 'react-use';
import { decode } from 'jsonwebtoken';
import { getUserWaitingsService, getLinksService } from '@app/services';
import { getCookieToken } from '@app/utils/session';
import {
  getMyLinksSuccess,
  getMyWaitingsSuccess,
} from '@app/slices/linksSlice';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import MeScreen from '@app/screens/Me';

export async function getServerSideProps({ req }) {
  let linksResponse = {};
  let waitingsResponse = {};

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

    const [links, waitings] = await Promise.allSettled([
      getLinksService({ owner: user._id, limit: 4 }),
      getUserWaitingsService(token, { limit: 4 }),
    ]);

    const { status: linksStatus, reason: reasonLinks } = links;
    const { status: waitingsStatus, reason: reasonWaitings } = waitings;

    if (linksStatus === 'rejected') {
      if (reasonLinks.status === 403) {
        return {
          redirect: {
            destination: '/#signin-modal',
            permanent: false,
          },
        };
      }
    }

    if (waitingsStatus === 'rejected') {
      if (reasonWaitings.status === 403) {
        return {
          redirect: {
            destination: '/#signin-modal',
            permanent: false,
          },
        };
      }
    }

    ({ value: linksResponse } = links);
    ({ value: waitingsResponse } = waitings);
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      links: linksResponse.data || {},
      waitings: waitingsResponse.data || {},
    },
  };
}

const Me = ({ links, waitings }) => {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(getMyLinksSuccess(links));
    dispatch(getMyWaitingsSuccess(waitings));
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

Me.defaultProps = {
  links: {},
  waitings: {},
};

Me.propTypes = {
  links: PropTypes.objectOf(PropTypes.shape),
  waitings: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.shape),
    PropTypes.arrayOf(PropTypes.shape),
  ]),
};

export default Me;

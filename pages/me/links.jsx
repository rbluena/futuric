import React from 'react';
import { decode } from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { useEffectOnce } from 'react-use';
import { useDispatch } from 'react-redux';
import { useAuthentication } from '@app/hooks';
import { getCookieToken } from '@app/utils/session';
import { getLinksService } from '@app/services';
import { getMyLinksSuccess } from '@app/slices/linksSlice';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import MyLinksScreen from '@app/screens/MyLinks';

export async function getServerSideProps({ req }) {
  let data = {};

  try {
    const token = getCookieToken(req);

    if (!token) {
      return {
        notFound: true,
      };
    }

    const user = decode(token);

    ({ data } = await getLinksService({ owner: user._id, limit: 1 }));
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      links: {
        data: data.data || {},
        meta: data.meta || {},
      },
    },
  };
}

const MyLinks = ({ links }) => {
  const { isAuthenticated } = useAuthentication();
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(getMyLinksSuccess(links));
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <LayoutManager>
      <Head title="My Links" />
      <Header />
      <MyLinksScreen />
      <Footer />
    </LayoutManager>
  );
};

MyLinks.defaultProps = {
  links: {},
};

MyLinks.propTypes = {
  links: PropTypes.objectOf(PropTypes.shape),
};

export default MyLinks;

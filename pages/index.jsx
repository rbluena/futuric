import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getCookieToken } from '@app/utils/session';
import { getLinksService } from '@app/services';
import { getLinksSuccess } from '@app/slices/linksSlice';
import { LayoutManager, Head, Footer, Header } from '@app/components';
import { getAuthSelector } from '@app/selectors';
import LandingPage from '@app/screens/LandingPage';

export async function getServerSideProps({ req, query }) {
  let data = {};

  try {
    const token = getCookieToken(req);

    if (token) {
      // Retreive specific data based on authenticated user
    }

    ({ data } = await getLinksService({ ...query, limit: 6 }));
  } catch (error) {
    // Log exceptions
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

export default function Home({ links }) {
  const { redirectUserToSettings } = useSelector(getAuthSelector);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLinksSuccess(links));
  }, [dispatch, links]);

  useEffect(() => {
    if (redirectUserToSettings) {
      return router.push('/settings');
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectUserToSettings]);

  if (!redirectUserToSettings) {
    return (
      <LayoutManager>
        <Head />
        <Header showHero showTopics />
        <LandingPage />
        <Footer />
      </LayoutManager>
    );
  }

  return null;
}

Home.defaultProps = {
  links: {},
};

Home.propTypes = {
  links: PropTypes.objectOf(PropTypes.shape),
};

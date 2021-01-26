import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getCookieToken } from '@app/utils/session';
import { getLinksService } from '@app/services';
import { getLinksSuccess } from '@app/slices/linksSlice';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import PostsScreen from '@app/screens/Posts/All';

export async function getServerSideProps({ req, query }) {
  let data = {};

  try {
    const token = getCookieToken(req);

    if (token) {
      // Retreive specific data based on authenticated user
    }

    ({ data } = await getLinksService({ ...query, limit: 15 }));
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

const Posts = ({ links }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLinksSuccess(links));
  }, [dispatch, links]);

  return (
    <LayoutManager>
      <Head title="Upcomings" />
      <Header showTopics />
      <PostsScreen />
      <Footer />
    </LayoutManager>
  );
};

Posts.defaultProps = {
  links: {},
};

Posts.propTypes = {
  links: PropTypes.objectOf(PropTypes.shape),
};

export default Posts;

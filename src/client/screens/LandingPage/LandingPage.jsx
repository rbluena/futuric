import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { linksSelector } from '@app/selectors';
import { getLinksAction } from '@app/actions';
import PostsContainer from '@app/containers/PostsContainer';
// import RecentlyPublishedContainer from '@app/containers/RecentlyPublishedContainer';
// import FeaturedPostsContainer from '@app/containers/FeaturedPostsContainer';
import { NavCategories } from '@app/components';

const LandingPage = () => {
  const { data, meta } = useSelector(linksSelector);
  const { hasNextPage, nextPage, limit } = meta;
  const dispatch = useDispatch();
  const { query } = useRouter();
  const trending = data.slice(0, 5);
  const upcomings = data.slice(5);

  /**
   * Loading more content if bottom is in visibility.
   */
  function loadMore() {
    if (hasNextPage) {
      dispatch(getLinksAction({ ...query, page: nextPage, limit }));
    }
  }

  // console.log(data);

  return (
    <div className="mx-auto flex max-w-6xl">
      <div className=" fixed top-18">
        <NavCategories />
      </div>
      <div className="w-full">
        <PostsContainer posts={trending} />
        {upcomings && upcomings.length > 0 && (
          <PostsContainer posts={upcomings} />
        )}
      </div>
    </div>
  );
};

LandingPage.propTypes = {};

export default LandingPage;

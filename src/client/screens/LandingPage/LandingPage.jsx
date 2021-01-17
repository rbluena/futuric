import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { linksSelector } from '@app/selectors';
import { getLinksAction } from '@app/actions';
import PostsContainer from '@app/containers/PostsContainer';
import NavCategoriesContainer from '@app/containers/NavCategoriesContainer';
// import RecentlyPublishedContainer from '@app/containers/RecentlyPublishedContainer';
// import FeaturedPostsContainer from '@app/containers/FeaturedPostsContainer';
import { InsersectionObserver } from '@app/components';

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
  const loadMore = debounce((shouldLoadMore) => {
    if (shouldLoadMore && hasNextPage) {
      dispatch(getLinksAction({ ...query, page: nextPage, limit }));
    }
  }, 500);

  return (
    <div className="mx-auto flex max-w-6xl">
      {/* start: Rendering categories */}
      <NavCategoriesContainer />
      {/* end: Rendering categories */}

      <div className="w-full">
        <PostsContainer posts={trending} title="Featured" />
        {upcomings && upcomings.length > 0 && (
          <>
            <PostsContainer posts={upcomings} title="Upcoming" />
            {hasNextPage && <InsersectionObserver loadMore={loadMore} />}
          </>
        )}
      </div>
    </div>
  );
};

LandingPage.propTypes = {};

export default LandingPage;

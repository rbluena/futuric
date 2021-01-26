import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { getLinksAction } from '@app/actions';
import { linksSelector } from '@app/selectors';
import { InsersectionObserver } from '@app/components';
import PostsContainer from '@app/containers/PostsContainer';
import NavCategoriesContainer from '@app/containers/NavCategoriesContainer';
import categories from '@app/utils/categories';

const AllPosts = () => {
  const { data, meta } = useSelector(linksSelector);
  const { hasNextPage, nextPage, limit } = meta;
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { name: title } = query.code
    ? categories.find((item) => item.code === query.code)
    : { name: '' };

  const loadMore = debounce((shouldLoadMore) => {
    if (shouldLoadMore && hasNextPage) {
      dispatch(getLinksAction({ ...query, page: nextPage, limit }));
    }
  }, 500);

  return (
    <div className="mx-auto flex max-w-6xl">
      <NavCategoriesContainer />
      <div className="w-full">
        <PostsContainer posts={data} title={title} />
        {hasNextPage && <InsersectionObserver loadMore={loadMore} />}
      </div>
    </div>
  );
};

export default AllPosts;

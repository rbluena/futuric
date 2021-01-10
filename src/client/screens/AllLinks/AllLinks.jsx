import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { getLinksAction } from '@app/actions';
import { linksSelector } from '@app/selectors';
import { NavCategories, InsersectionObserver } from '@app/components';
import PostsContainer from '@app/containers/PostsContainer';
import categories from '@app/utils/categories';

const AllLinks = () => {
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
      <div className=" fixed top-18">
        <NavCategories />
      </div>
      <div className="w-full">
        <PostsContainer posts={data} title={title} />
        {hasNextPage && <InsersectionObserver loadMore={loadMore} />}
      </div>
    </div>
  );
};

export default AllLinks;

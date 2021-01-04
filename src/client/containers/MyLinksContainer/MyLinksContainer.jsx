import React from 'react';
import router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { myLinksSelector } from '@app/selectors';
import { getMyLinksAction } from '@app/actions';
import PostsContainer from '@app/containers/PostsContainer';
import { Button } from '@app/components';
import ViewMoreButton from './ViewMoreButton';

const MyLinksContainer = () => {
  const { data, meta } = useSelector(myLinksSelector);
  const dispatch = useDispatch();
  const { hasNextPage, nextPage, limit } = meta;

  function loadMore() {
    dispatch(getMyLinksAction({ page: nextPage, limit }));
  }

  return (
    <>
      {data && data.length > 0 ? (
        <PostsContainer posts={data} />
      ) : (
        <div>
          <h2 className="h-2 text-xl">You don&apos;t have any post.</h2>
          <Button
            variant="primary"
            onClick={() => router.push('/links/create')}
          >
            Create Link
          </Button>
        </div>
      )}
      {hasNextPage && <ViewMoreButton onClick={() => loadMore()} />}
    </>
  );
};

export default MyLinksContainer;

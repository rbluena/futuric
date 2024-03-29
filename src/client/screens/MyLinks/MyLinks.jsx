import React from 'react';
import router from 'next/router';
import {
  Button,
  Section,
  ContentWrapper,
  ProfileHeader,
} from '@app/components';
import { useSelector, useDispatch } from 'react-redux';
import { myLinksSelector, getAuthSelector } from '@app/selectors';
import { getMyLinksAction } from '@app/actions';
import PostsContainer from '@app/containers/PostsContainer';
import ViewMoreButton from './ViewMoreButton';

const MyLinks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getAuthSelector);
  const { data, meta } = useSelector(myLinksSelector);
  const { hasNextPage, nextPage, limit } = meta;

  function loadMore() {
    dispatch(getMyLinksAction({ page: nextPage, limit }));
  }

  return (
    <div className="pb-6">
      <ContentWrapper>
        {/* start: PROFILE HEADER */}
        <ProfileHeader profile={user} isCurrentUser isAuthenticated />
        {/* end: PROFILE HEADER */}

        <Section heading="Created Links">
          {data && data.length > 0 ? (
            <PostsContainer posts={data} />
          ) : (
            <div className="flex flex-col items-center py-6">
              <h2 className="text-xl mb-6">
                You haven&apos;t created any link.
              </h2>
              <Button
                variant="primary"
                onClick={() => router.push('/links/create')}
                size="lg"
                className="max-w-xs"
              >
                Create link
              </Button>
            </div>
          )}
        </Section>
        {hasNextPage && <ViewMoreButton onClick={() => loadMore()} />}
      </ContentWrapper>
    </div>
  );
};

MyLinks.propTypes = {};

export default MyLinks;

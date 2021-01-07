import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Section, ContentWrapper, ProfileHeader } from '@app/components';
import { getWaitingsAction } from '@app/actions';
import { waitingsSelector, getAuthSelector } from '@app/selectors';
import PostsContainer from '@app/containers/PostsContainer';
import ViewMoreButton from './ViewMoreButton';

const WaitingList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getAuthSelector);
  const { data, meta } = useSelector(waitingsSelector);
  const { hasNextPage, nextPage, limit } = meta;

  const noActivities = data.length === 0;

  function loadMore() {
    dispatch(getWaitingsAction({ page: nextPage, limit }));
  }

  return (
    <div className="pb-4">
      <ContentWrapper>
        {/* start: PROFILE HEADER */}
        <ProfileHeader profile={user} isCurrentUser isAuthenticated />
        {/* end: PROFILE HEADER */}

        <Section heading="Waitlisted">
          {!noActivities ? (
            <PostsContainer posts={data} />
          ) : (
            <div className="flex flex-col items-center py-6">
              <h2 className="text-xl mb-6">
                You haven&apos;t waitlisted any link post.
              </h2>
            </div>
          )}
        </Section>
        {hasNextPage && <ViewMoreButton onClick={() => loadMore()} />}
      </ContentWrapper>
    </div>
  );
};

WaitingList.propTypes = {};

export default WaitingList;

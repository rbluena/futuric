import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLinksAction } from '@app/actions';
import { linksSelector, getProfileSelector } from '@app/selectors';
import { ContentWrapper } from '@app/components';
// import RecentlyPublishedContainer from '@app/containers/RecentlyPublishedContainer';
import PostsContainer from '@app/containers/PostsContainer';
import ProfileHeaderContainer from '@app/containers/ProfileHeaderContainer';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(getProfileSelector);
  const { data, meta } = useSelector(linksSelector);
  const { hasNextPage, nextPage, limit } = meta;

  function loadMore() {
    dispatch(getLinksAction({ owner: profile._id, page: nextPage, limit }));
  }

  return (
    <ContentWrapper>
      <ProfileHeaderContainer />
      <div className="pt-6">
        {/* <RecentlyPublishedContainer /> */}
        <div className="border-b border-neutral-200">
          {/* <h2 className="text-xl px-12">Upcoming</h2> */}
        </div>

        {data && data.length > 0 ? (
          <PostsContainer posts={data} />
        ) : (
          <div className="flex flex-col items-center py-6">
            <h2 className="text-xl mb-6">
              This user haven&apos;t created any link post.
            </h2>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
};

export default Profile;

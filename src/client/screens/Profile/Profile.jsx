import React from 'react';
import { ContentWrapper } from '@app/components';
import RecentlyPublishedContainer from '@app/containers/RecentlyPublishedContainer';
import PostsContainer from '@app/containers/PostsContainer';
import Header from './Header';

const Profile = () => (
  <ContentWrapper>
    <Header />
    <div className="pt-6">
      <RecentlyPublishedContainer />
      <div className="border-b border-neutral-200">
        <h2 className="text-xl px-12">Upcoming contents</h2>
      </div>
      <PostsContainer />
    </div>
  </ContentWrapper>
);

export default Profile;

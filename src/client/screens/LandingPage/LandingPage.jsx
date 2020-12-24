import React from 'react';
import PostsContainer from '@app/containers/PostsContainer';
import RecentlyPublishedContainer from '@app/containers/RecentlyPublishedContainer';
import { NavCategories } from '@app/components';

const LandingPage = () => (
  <div>
    <PostsContainer sidebar={<NavCategories categories={[]} />} />
    <RecentlyPublishedContainer />
  </div>
);

LandingPage.propTypes = {};

export default LandingPage;

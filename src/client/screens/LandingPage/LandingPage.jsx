import React from 'react';
import PostsContainer from '@app/containers/PostsContainer';
import RecentlyPublishedContainer from '@app/containers/RecentlyPublishedContainer';
// import FeaturedPostsContainer from '@app/containers/FeaturedPostsContainer';
import { NavCategories } from '@app/components';

const LandingPage = () => (
  <div>
    <PostsContainer sidebar={<NavCategories categories={[]} />} />
    <RecentlyPublishedContainer />
    {/* <div className="flex flex-wrap container">
      <FeaturedPostsContainer />
      <PostsContainer />
    </div> */}
    <PostsContainer />
    <RecentlyPublishedContainer />
    <PostsContainer />
    <PostsContainer />
    <PostsContainer />
  </div>
);

LandingPage.propTypes = {};

export default LandingPage;

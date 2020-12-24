import React from 'react';
import FeaturedContainer from '@app/containers/FeaturedContainer';
import RecentlyPublishedContainer from '@app/containers/RecentlyPublishedContainer';

const LandingPage = () => (
  <div>
    <FeaturedContainer />
    <RecentlyPublishedContainer />
  </div>
);

LandingPage.propTypes = {};

export default LandingPage;

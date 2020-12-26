import React from 'react';
import { Section, ContentWrapper, Button } from '@app/components';
import ProfileHeaderContainer from '@app/containers/ProfileHeaderContainer';
import PostsContainer from '@app/containers/PostsContainer';

const User = () => (
  <div>
    <ContentWrapper>
      <ProfileHeaderContainer />
      <Section heading="Your recent publish" />
      <PostsContainer />

      <div className="max-w-xs mx-auto">
        <Button variant="primary" outline size="lg">
          View All
        </Button>
      </div>
    </ContentWrapper>

    <ContentWrapper>
      <Section heading="Your waiting list" />
      <PostsContainer />

      <div className="max-w-xs mx-auto">
        <Button variant="primary" outline size="lg">
          View All
        </Button>
      </div>
    </ContentWrapper>
  </div>
);

User.propTypes = {};

export default User;

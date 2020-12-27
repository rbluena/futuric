import React from 'react';
import { Section, ContentWrapper, Button } from '@app/components';
import ProfileHeaderContainer from '@app/containers/ProfileHeaderContainer';
import PostsContainer from '@app/containers/PostsContainer';

const User = () => (
  <div>
    <ContentWrapper>
      <ProfileHeaderContainer />
      <Section heading="Created links">
        <PostsContainer />
      </Section>

      <div className="max-w-xs mx-auto">
        <Button variant="primary" outline size="lg">
          View All
        </Button>
      </div>
    </ContentWrapper>

    <ContentWrapper>
      <Section heading="Waiting list">
        <PostsContainer />
      </Section>

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

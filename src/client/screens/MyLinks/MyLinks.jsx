import React from 'react';
import { Section, ContentWrapper, Button } from '@app/components';
import ProfileHeaderContainer from '@app/containers/ProfileHeaderContainer';
import PostsContainer from '@app/containers/PostsContainer';

const MyLinks = () => (
  <div className="pb-4">
    <ContentWrapper>
      <ProfileHeaderContainer />
      <Section heading="Created Links">
        <PostsContainer />
        <PostsContainer />

        <div className="max-w-xs mx-auto">
          <Button variant="primary" outline size="lg">
            View More
          </Button>
        </div>
      </Section>
    </ContentWrapper>
  </div>
);

MyLinks.propTypes = {};

export default MyLinks;

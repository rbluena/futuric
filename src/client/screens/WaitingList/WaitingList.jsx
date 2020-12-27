import React from 'react';
import { Section, ContentWrapper, Button } from '@app/components';
import ProfileHeaderContainer from '@app/containers/ProfileHeaderContainer';
import PostsContainer from '@app/containers/PostsContainer';

const WaitingList = () => (
  <div className="pb-4">
    <ContentWrapper>
      <ProfileHeaderContainer />
      <Section heading="Waiting List">
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

WaitingList.propTypes = {};

export default WaitingList;

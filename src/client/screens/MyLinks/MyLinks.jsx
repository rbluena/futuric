import React from 'react';
import { Section, ContentWrapper } from '@app/components';
import ProfileHeaderContainer from '@app/containers/ProfileHeaderContainer';
import MyLinksContainer from '@app/containers/MyLinksContainer';

const MyLinks = () => (
  <div className="pb-4">
    <ContentWrapper>
      <ProfileHeaderContainer />
      <Section heading="Created Links">
        <MyLinksContainer />
      </Section>
    </ContentWrapper>
  </div>
);

MyLinks.propTypes = {};

export default MyLinks;

import React from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';
import {
  myLinksSelector,
  waitingsSelector,
  getAuthSelector,
} from '@app/selectors';
import { Section, ContentWrapper, Link, ProfileHeader } from '@app/components';
import PostsContainer from '@app/containers/PostsContainer';
import ViewAllButton from './ViewAllButton';

const Me = () => {
  const { data: links } = useSelector(myLinksSelector);
  const { user } = useSelector(getAuthSelector);
  const { data: waitings } = useSelector(waitingsSelector);

  const noActivities = links.length === 0 && waitings.length === 0;

  return (
    <div className="pb-6">
      <ContentWrapper>
        <ProfileHeader profile={user} isCurrentUser isAuthenticated />
        {links && links.length > 0 && (
          <>
            <Section heading="My Links">
              <PostsContainer posts={links} />
            </Section>

            <div className="max-w-xs mx-auto">
              <ViewAllButton onClick={() => router.push('/me/links')} />
            </div>
          </>
        )}
      </ContentWrapper>

      {/* start: rendering user's waiting list */}
      <ContentWrapper>
        {waitings && waitings.length > 0 && (
          <>
            <Section heading="Waitlisted">
              <PostsContainer posts={waitings} />
            </Section>

            <div className="max-w-xs mx-auto">
              <ViewAllButton onClick={() => router.push('/me/waitings')} />
            </div>
          </>
        )}
      </ContentWrapper>
      {/* end: rendering user's waiting list */}

      <ContentWrapper>
        {noActivities && (
          <div className="text-center py-10">
            <h2 className="text-xl text-neutral-500">
              You don&apos;t have any activities. <br />
            </h2>
            <p className="text-neutral-700 my-4">
              Create a link or add links in waiting list for this page to be
              active.
            </p>

            <Link href="/learn" size="lg">
              Learn more
            </Link>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

Me.propTypes = {};

export default Me;

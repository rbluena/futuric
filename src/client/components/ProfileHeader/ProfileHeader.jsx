import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { openModal } from '@app/slices/globalSlice';
import { Link, Avatar, Button } from '@app/components';
import {
  BadgeIcon,
  CheckUserIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
} from '@app/components/Icons';
import { toggleFollowAction } from '@app/actions';

const ProfileHeader = ({ profile, isCurrentUser, isAuthenticated }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  /** Handling all buttons in this section */
  function handleButtonClick(value) {
    if (value === '/settings') {
      router.push(value);
    }

    if (value === 'follow') {
      if (isAuthenticated) {
        dispatch(toggleFollowAction(profile._id));
      } else {
        dispatch(openModal('signin'));
      }
    }
  }

  return (
    <div className="header border-b  border-neutral-200 pb-4">
      <div className="mr-auto">
        <div className="flex flex-wrap items-start">
          <Avatar
            initials={profile.brandname[0]}
            size="2xl"
            className="text-5xl"
            square
          />

          <div className="flex flex-col items-start pl-4">
            <Link
              href={`@${profile.username}`}
              variant="secondary"
              size="lg"
              className="font-bold flex items-center text-2xl"
            >
              <span>{profile.brandname}</span>
              &nbsp;
              {profile.prominent && (
                <BadgeIcon size="xs" className="text-success-700" />
              )}
            </Link>

            {profile.website && (
              <Link
                href={profile.website}
                size="sm"
                variant="secondary"
                className="mb-2"
              >
                {profile.website}
              </Link>
            )}

            {profile.social && (
              <div className="flex items-center pb-4">
                {profile.social.twitter && (
                  <Link href={profile.social.twitter}>
                    <TwitterIcon size="xs" className="text-primary-700" />
                  </Link>
                )}

                {profile.social.instagram && (
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link href={profile.social.instagram}>
                      <InstagramIcon size="xs" className="text-primary-700" />
                    </Link>
                  </>
                )}
                {profile.social.youtube && (
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link href={profile.social.youtube}>
                      <YoutubeIcon size="xs" className="text-primary-700" />
                    </Link>
                  </>
                )}
                {profile.social.facebook && (
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link href={profile.social.facebook}>
                      <FacebookIcon size="xs" className="text-primary-700" />
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* start: description */}
            <div className="pb-2">
              {profile.description && (
                <p className="text-neutral-900 text-lg">
                  {profile.description}
                </p>
              )}
            </div>
            {/* end: description */}
          </div>

          {!isCurrentUser ? (
            <div className="ml-auto">
              <Button
                variant="primary"
                outline={!profile.isFollowing}
                className="flex items-center"
                onClick={() => handleButtonClick('follow')}
              >
                {profile.isFollowing ? 'Unfollow' : 'Follow'} &nbsp;&nbsp;
                <CheckUserIcon size="xs" />
              </Button>
            </div>
          ) : (
            <div className="ml-auto">
              <Button
                variant="primary"
                outline
                className="flex items-center"
                onClick={() => handleButtonClick('/settings')}
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileHeader.defaultProps = {
  isCurrentUser: false,
  isAuthenticated: false,
};

ProfileHeader.propTypes = {
  profile: PropTypes.objectOf(PropTypes.shape).isRequired,
  isCurrentUser: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};
export default ProfileHeader;

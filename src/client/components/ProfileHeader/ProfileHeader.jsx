import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Link, Avatar, Button } from '@app/components';
import { BadgeShieldIcon, CheckUserIcon } from '@app/components/Icons';

const ProfileHeader = ({ profile, isMyProfile }) => {
  const router = useRouter();

  /** Handling all buttons in this section */
  function handleButtonClick(value) {
    if (value === '/me/edit') {
      router.push(value);
    }
  }

  return (
    <div className="header border-b  border-neutral-200">
      <div className="mr-auto">
        <div className="flex flex-wrap-reverse items-center">
          <Avatar initials="NL" size="xl" className="text-2xl" />

          <div className="flex flex-col items-start pl-2">
            <Link
              href="/@netflix"
              variant="secondary"
              size="lg"
              className="font-bold flex items-center"
            >
              <span>{profile.name}</span>
              &nbsp;
              {profile.prominent && (
                <BadgeShieldIcon size="sm" className="text-primary-700" />
              )}
              {/* <BadgeIcon size="xs" className="text-success-700" /> */}
            </Link>
            {profile.website && (
              <Link href="/@" size="xs" variant="secondary" className="mb-2">
                {profile.website}
              </Link>
            )}
          </div>

          {!isMyProfile ? (
            <div className="ml-auto">
              {profile.following ? (
                <Button variant="primary" className="flex items-center">
                  Unfollow&nbsp;&nbsp;
                  <CheckUserIcon size="xs" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  outline
                  className="flex items-center"
                  onClick={() => handleButtonClick('follow')}
                >
                  Follow
                </Button>
              )}
            </div>
          ) : (
            <div className="ml-auto">
              <Button
                variant="primary"
                outline
                className="flex items-center"
                onClick={() => handleButtonClick('/me/edit')}
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className=" pl-16 pb-4">
        {profile.description && (
          <p className="text-sm text-neutral-900">{profile.description}</p>
        )}
      </div>
    </div>
  );
};

ProfileHeader.defaultProps = {
  isMyProfile: false,
};

ProfileHeader.propTypes = {
  profile: PropTypes.objectOf(PropTypes.shape).isRequired,
  isMyProfile: PropTypes.bool,
};
export default ProfileHeader;

import React from 'react';
import { useSelector } from 'react-redux';
import { ProfileHeader } from '@app/components';
import { getProfileSelector, getAuthSelector } from '@app/selectors';

const ProfileHeaderContainer = () => {
  const { profile, isCurrentUser } = useSelector(getProfileSelector);
  const { isAuthenticated } = useSelector(getAuthSelector);

  return (
    <ProfileHeader
      profile={profile}
      isCurrentUser={isCurrentUser}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default ProfileHeaderContainer;

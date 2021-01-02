import React from 'react';
import { useSelector } from 'react-redux';
import { ProfileHeader } from '@app/components';
import { getProfileSelector } from '@app/selectors';

const ProfileHeaderContainer = () => {
  const { profile, isCurrentUser } = useSelector(getProfileSelector);

  return <ProfileHeader profile={profile} isCurrentUser={isCurrentUser} />;
};

export default ProfileHeaderContainer;

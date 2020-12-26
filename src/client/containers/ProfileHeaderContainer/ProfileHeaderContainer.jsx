import React from 'react';
import { ProfileHeader } from '@app/components';

const ProfileHeaderContainer = () => (
  <ProfileHeader
    profile={{
      name: 'Netflix',
      website: 'https://netflix.com',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    }}
    isMyProfile
  />
);

export default ProfileHeaderContainer;

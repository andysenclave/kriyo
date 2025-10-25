'use client';

import { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import { EditProfileDetails, ViewProfileDetails } from './ProfileDetails';
import { useGetMyProfile } from '../hooks';
import { GetMyProfileResponse } from '../models';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: user } = useGetMyProfile();

  const onStartEditing = () => {
    setIsEditing(true);
  };

  const onStopEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <ProfileHeader isEditing={isEditing} onStartEditing={onStartEditing} />
        {isEditing ? (
          <EditProfileDetails onStopEditing={onStopEditing} user={user as GetMyProfileResponse} />
        ) : (
          <ViewProfileDetails user={user as GetMyProfileResponse} />
        )}
      </div>
    </div>
  );
};

export default Profile;

'use client';

import { Pencil } from 'lucide-react';

interface ProfileHeaderProps {
  isEditing: boolean;
  onStartEditing: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isEditing, onStartEditing }) => {
  return (
    <div className="w-full p-4 pb-0">
      <div className="flex flex-col w-full">
        <div className="flex justify-between w-full items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Profile Information</h1>
          {!isEditing && (
            <button
              onClick={onStartEditing}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
        <p className="flex text-sm text-gray-600">Your profile details are as follows</p>
      </div>
    </div>
  );
};

export default ProfileHeader;

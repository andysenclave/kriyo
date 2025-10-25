'use client';

import {
  LaptopMinimalCheck,
  Mail,
  Phone,
  RectangleEllipsis,
  SquareCheck,
  SquareX,
} from 'lucide-react';
import { MyProfile } from '../../models';

interface ViewProfileDetailsProps {
  user: MyProfile;
}

const formatDate = (dateString: string) => {
  if (!dateString || dateString === '') return 'N/A';

  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

const ViewProfileDetails = ({ user }: ViewProfileDetailsProps) => {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-15">
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <Mail className="w-5 h-5 mr-2" />
            <span className="text-base">
              <span>Email ID:&nbsp;</span>
              <span>{user?.email}</span>
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-2" />
            <span className="text-base">
              <span>Phone Number:&nbsp;</span>
              <span>{user?.phone ? user.phone : 'N/A'}</span>
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <RectangleEllipsis className="w-5 h-5 mr-2" />
            <span className="text-base">
              <span>Password:&nbsp;</span>
              <span>******** (hidden for security)</span>
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <LaptopMinimalCheck className="w-5 h-5 mr-2" />
            <span className="text-base flex flex-row items-center">
              <span>ID Verification:&nbsp;</span>
              <span className="flex flex-row items-center">
                Email:{' '}
                {user?.emailVerified ? (
                  <SquareCheck className="w-5 h-5 mr-2" />
                ) : (
                  <SquareX className="w-5 h-5 mr-2" />
                )}{' '}
                Phone:{' '}
                {user?.phoneVerified ? (
                  <SquareCheck className="w-5 h-5 mr-2" />
                ) : (
                  <SquareX className="w-5 h-5 mr-2" />
                )}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-xs italic text-gray-600">
        <span>Your profile was last updated on {formatDate(user?.updatedAt)}</span>
        <span>Profile creation date: {formatDate(user?.createdAt)}</span>
      </div>
    </div>
  );
};

export default ViewProfileDetails;

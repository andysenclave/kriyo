'use client';

import { useClickOutside } from '@/app/hooks';
import { useAuth } from '@/app/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { Ref, useState } from 'react';

interface UserMenuProps {
  userName: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const ref = useClickOutside(() => setIsOpen(false)) as unknown as Ref<HTMLDivElement>;
  const { logout } = useAuth();

  const openProfile = () => {
    setIsOpen(false);
    router.push('/profile');
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-md p-1 transition-colors focus:outline-none cursor-pointer"
      >
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
          {getInitials(userName)}
        </div>
        {userName && <span className="text-sm">{userName}</span>}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
        >
          <button
            onClick={openProfile}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

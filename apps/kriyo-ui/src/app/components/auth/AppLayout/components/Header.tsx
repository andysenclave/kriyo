'use client';

import React from 'react';
import UserMenu from './UserMenu';
import Image from 'next/image';
import { Permanent_Marker } from 'next/font/google';

interface HeaderProps {
  userName?: string;
}

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
});

const Header: React.FC<HeaderProps> = ({ userName = 'Andy' }) => {
  return (
    <header className="bg-gradient-to-br from-[#6D5DF6] to-[#4B3DF6] text-white shadow-sm px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image
          src="/images/kriyo-header-icon.png"
          className="!mr-1"
          alt="Kriyo Logo"
          width={40}
          height={40}
        />
        <h1 className={`text-2xl font-bold ${permanentMarker.className}`}>Kriyo</h1>
      </div>

      <div className="flex items-center space-x-4">
        <UserMenu userName={userName} />
      </div>
    </header>
  );
};

export default Header;

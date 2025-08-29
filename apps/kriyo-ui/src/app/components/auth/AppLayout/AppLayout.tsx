'use client';

import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { NavigationMenu } from '@/app/models';
import { usePathname } from 'next/navigation';
import ProtectedRoute from '../ProtectedRoute';

interface AppLayoutProps {
  menuItems: NavigationMenu[];
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, menuItems }) => {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/auth');

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Navigation items={menuItems} />
        <ProtectedRoute>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </ProtectedRoute>
      </div>
    </div>
  );
};

export default AppLayout;

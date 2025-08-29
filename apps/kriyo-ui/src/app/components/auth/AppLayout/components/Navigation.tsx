'use client';

import React, { useMemo, useState } from 'react';
import NavigationItem from '../models';
import { usePathname, useRouter } from 'next/navigation';
import { useClickOutside } from '@/app/hooks';

interface NavigationProps {
  items: NavigationItem[];
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  const router = useRouter();
  const mainPath = useMemo(() => `/${pathname.split('/')[1]}`, [pathname]);

  const styles = useMemo(
    () => ({
      nav: `bg-white border-r border-gray-200 transition-all duration-300 ease-in-out min-h-screen ${
        open ? 'w-40' : 'w-17 overflow-hidden'
      }`,
      item: `transition-all duration-300 ease-in-out overflow-hidden ${open ? 'w-36' : 'w-13'} text-left px-2 py-2 hover:bg-gray-50 transition-colors flex items-center rounded-md mx-2`,
      label: `transition-all duration-300 ease-in-out overflow-hidden ${open ? 'w-24' : 'w-1'}`,
    }),
    [open],
  );

  const handleItemClick = (itemId: string) => {
    const selectedRoute = items.find((item) => item.id === itemId)?.route;
    router.push(selectedRoute || '/');
  };

  return (
    <nav ref={ref} onClick={() => setOpen(true)} className={styles.nav}>
      <div className="py-2">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleItemClick(item.id)}
                className={`${styles.item} cursor-pointer text-xs ${
                  mainPath === item.route
                    ? 'bg-gradient-to-br from-[#6D5DF61A] to-[#4B3DF61A] text-gray-900 font-semibold'
                    : 'text-gray-600'
                }`}
              >
                <span className="mx-3">{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

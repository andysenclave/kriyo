import { useEffect, useRef } from 'react';

interface UseClickOutsideProps {
  onOutsideClick: (event: MouseEvent | TouchEvent) => void;
}

type RefType = HTMLElement | null;

const useClickOutside = (onOutsideClick: UseClickOutsideProps['onOutsideClick']) => {
  const ref = useRef<RefType>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick(event);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onOutsideClick]);

  return ref;
};
export default useClickOutside;

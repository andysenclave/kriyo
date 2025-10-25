'use client';
import { Input } from '@/components/ui/input';
import { FiSearch } from 'react-icons/fi';
import SearchProjectsModal from './SearchProjectsModal';
import { useState } from 'react';

const SearchProjectsField: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchFieldClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onClick={handleSearchFieldClick} className="w-full md:w-1/2 flex items-center relative">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search projects..."
          className="pl-10 pr-4 py-2 rounded-lg bg-muted border-none focus:ring-2 focus:ring-primary"
        />
      </form>
      <SearchProjectsModal open={isModalOpen} onClose={handleModalClose} />
    </>
  );
};

export default SearchProjectsField;

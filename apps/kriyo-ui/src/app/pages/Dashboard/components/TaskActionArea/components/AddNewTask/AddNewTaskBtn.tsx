'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import AddTaskModal from './AddTaskModal';

interface AddNewTaskBtnProps {
  selectedDate?: Date;
}

const AddNewTaskBtn: React.FC<AddNewTaskBtnProps> = ({ selectedDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNewBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleAddNewBtnClick}
        className="flex items-center gap-2 px-5 py-2 cursor-pointer text-base font-semibold"
        size="lg"
      >
        <FiPlus size={20} /> Add new task
      </Button>
      <AddTaskModal open={isModalOpen} onClose={handleModalClose} selectedDate={selectedDate} />
    </>
  );
};

export default AddNewTaskBtn;

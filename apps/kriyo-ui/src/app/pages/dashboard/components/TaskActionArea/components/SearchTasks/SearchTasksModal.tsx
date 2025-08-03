import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { StatusLabel } from '@/app/components/labels';
import { useMyTasks } from '@/app/providers/MyTasksProvider';

interface SearchTasksModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchTasksModal: React.FC<SearchTasksModalProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const { tasks } = useMyTasks();
  const filtered = tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase()));
  const hasQuery = query.length > 0;
  const hasResults = filtered.length > 0;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-full p-6 h-[32rem] flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Tasks</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          autoFocus
        />
        <ul className="flex-1 overflow-y-auto mb-4">
          {!hasQuery && <li className="text-gray-400">Start typing to search tasks.</li>}
          {hasQuery &&
            hasResults &&
            filtered.map((task) => (
              <li
                key={task.id}
                className="py-2 border-b last:border-b-0 flex justify-between items-center"
              >
                {task.title}
                <StatusLabel status={task.status} />
              </li>
            ))}
          {hasQuery && !hasResults && <li className="text-gray-400">No results found.</li>}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default SearchTasksModal;

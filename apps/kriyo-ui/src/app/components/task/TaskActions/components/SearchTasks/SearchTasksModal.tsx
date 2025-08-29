import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StatusLabel } from '@/app/components/labels';
import { useSearchTasks } from '@/app/hooks';

interface SearchTasksModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchTasksModal: React.FC<SearchTasksModalProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const hasQuery = query.trim().length > 0;
  const { isLoading, data } = useSearchTasks(query);

  const tasks = data?.tasks;

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
          {hasQuery && isLoading && <li className="text-gray-400">Loading...</li>}
          {hasQuery &&
            !isLoading &&
            tasks?.map((task) => (
              <li
                key={task.id}
                className="py-2 border-b last:border-b-0 flex justify-between items-center"
              >
                {task.title}
                <StatusLabel status={task.status} />
              </li>
            ))}
          {hasQuery && !isLoading && !tasks?.length && (
            <li className="text-gray-400">No results found.</li>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default SearchTasksModal;

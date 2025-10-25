import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StatusLabel } from '@/app/components/labels';
import { useSearchProjects } from '@/app/hooks/projects';

interface SearchProjectsModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchProjectsModal: React.FC<SearchProjectsModalProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const hasQuery = query.trim().length > 0;
  const { isLoading, data } = useSearchProjects(query);

  const projects = data?.projects;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-full p-6 h-[32rem] flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Projects</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          autoFocus
        />
        <ul className="flex-1 overflow-y-auto mb-4">
          {!hasQuery && <li className="text-gray-400">Start typing to search projects.</li>}
          {hasQuery && isLoading && <li className="text-gray-400">Loading...</li>}
          {hasQuery &&
            !isLoading &&
            projects?.map((project) => (
              <li
                key={project.id}
                className="py-2 border-b last:border-b-0 flex justify-between items-center"
              >
                {project.title}
                <StatusLabel status={project.status} />
              </li>
            ))}
          {hasQuery && !isLoading && !projects?.length && (
            <li className="text-gray-400">No results found.</li>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default SearchProjectsModal;

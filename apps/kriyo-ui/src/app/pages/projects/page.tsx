'use client';

import { usePathname } from 'next/navigation';

const ProjectsPage: React.FC = () => {
  const pathname = usePathname();
  console.log({ pathname });
  return <h1>This is the projects page</h1>;
};

export default ProjectsPage;

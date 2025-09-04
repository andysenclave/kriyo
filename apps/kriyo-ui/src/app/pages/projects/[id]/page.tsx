'use client';

import { useParams } from 'next/navigation';
import { ProjectDetails } from '../components/Projects';

const ProjectDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  return <ProjectDetails projectId={params.id} />;
};

export default ProjectDetailPage;

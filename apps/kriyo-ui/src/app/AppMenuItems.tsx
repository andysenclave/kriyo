import { FaProjectDiagram, FaTasks, FaTh, FaUser } from 'react-icons/fa';
import { NavigationMenu } from './models';

const AppMenuItems: NavigationMenu[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <FaTh />, route: '/dashboard' },
  { id: 'tasks', label: 'Tasks', icon: <FaTasks />, route: '/tasks' },
  { id: 'projects', label: 'Projects', icon: <FaProjectDiagram />, route: '/projects' },
  { id: 'profile', label: 'Profile', icon: <FaUser />, route: '/profile' },
];

export default AppMenuItems;

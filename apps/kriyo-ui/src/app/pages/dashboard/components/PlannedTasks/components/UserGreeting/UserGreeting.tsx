import { useDashboardTasks } from '../../../../hooks';

interface UserGreetingProps {
  userName: string;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ userName }) => {
  const { data } = useDashboardTasks();
  const tasksCount = data?.tasks.length || 0;

  return (
    <div className="mb-2">
      <h2 className="scroll-m-20 text-xl font-normal tracking-tight mb-2">
        Hello, <span className="font-extrabold">{userName}</span>
      </h2>
      <h4 className="scroll-m-20 text-l font-normal tracking-tight">
        You have{' '}
        <span className="font-bold">
          {tasksCount}
          {` ${tasksCount > 1 ? `tasks` : `task`}`}
        </span>{' '}
        to complete.
      </h4>
    </div>
  );
};

export default UserGreeting;

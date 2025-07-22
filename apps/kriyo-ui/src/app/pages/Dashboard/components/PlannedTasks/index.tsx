import PlannedTasks, { PlannedTasksProps } from './PlannedTasks';
import MyTasksProvider from './providers/MyTasksProvider';

const PlannedTasksWithProvider: React.FC<PlannedTasksProps> = (props) => {
  return (
    <MyTasksProvider>
      <PlannedTasks {...props} />
    </MyTasksProvider>
  );
};

export default PlannedTasksWithProvider;

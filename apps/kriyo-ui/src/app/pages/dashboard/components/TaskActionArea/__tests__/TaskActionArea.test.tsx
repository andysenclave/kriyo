import { render, screen } from '@testing-library/react';
import TaskActionArea from '../TaskActionArea';
import MyTasksProvider from '@/app/providers/MyTasksProvider';

describe('TaskActionArea', () => {
  it('renders without crashing', () => {
    render(
      <MyTasksProvider>
        <TaskActionArea />
      </MyTasksProvider>
    );
    expect(screen.getByTestId('task-action-area')).toBeInTheDocument();
  });
});

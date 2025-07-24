import MyTasksProvider from '@/app/providers/MyTasksProvider';
import { render, screen } from '@testing-library/react';
import PlannedTaskList from '../';

describe('PlannedTaskList', () => {
  const renderComponent = () => {
    return render(
      <MyTasksProvider>
        <PlannedTaskList userName="Andy" />
      </MyTasksProvider>
    );
  };

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByText('Hello,')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import PlannedTaskList from '..';
import QueryProvider from '@/app/providers/QueryProvider';

describe('PlannedTaskList', () => {
  const renderComponent = () => {
    return render(
      <QueryProvider>
        <PlannedTaskList userName="Andy" />
      </QueryProvider>,
    );
  };

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByText('Hello,')).toBeInTheDocument();
  });
});

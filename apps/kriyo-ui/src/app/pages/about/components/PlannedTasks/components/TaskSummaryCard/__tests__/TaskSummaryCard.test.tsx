import { render, screen } from '@testing-library/react';
import TaskSummaryCard from '../TaskSummaryCard';
import { FaRegClock } from 'react-icons/fa';

describe('TaskSummaryCard', () => {
  it('renders with title', () => {
    render(
      <TaskSummaryCard title="Summary" count={0} color="primary" icon={<FaRegClock size={24} />} />
    );
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });
});

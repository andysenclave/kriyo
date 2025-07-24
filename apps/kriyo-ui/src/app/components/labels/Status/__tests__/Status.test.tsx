import { render, screen } from '@testing-library/react';
import StatusLabel from '../Status';

describe('StatusLabel', () => {
  it('renders with correct text for todo status', () => {
    render(<StatusLabel status="todo" />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('renders with correct text for done status', () => {
    render(<StatusLabel status="done" />);
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('renders with correct text for in-progress status', () => {
    render(<StatusLabel status="in-progress" />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<StatusLabel status="done" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('w-24');

    const span = wrapper?.firstChild;
    expect(span).toHaveClass('px-2', 'py-1', 'rounded-full', 'text-xs', 'font-medium');
  });

  it('applies correct color classes for different statuses', () => {
    const { rerender } = render(<StatusLabel status="todo" />);
    expect(screen.getByText('To Do')).toHaveClass('bg-cyan-200', 'text-cyan-900');

    rerender(<StatusLabel status="done" />);
    expect(screen.getByText('Done')).toHaveClass('bg-green-200', 'text-green-800');

    rerender(<StatusLabel status="blocked" />);
    expect(screen.getByText('Blocked')).toHaveClass('bg-red-200', 'text-red-800');
  });
});

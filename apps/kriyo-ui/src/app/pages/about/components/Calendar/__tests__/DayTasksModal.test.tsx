/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DayTasksModal from '../DayTasksModal';
import Task from '@/app/providers/MyTasksProvider/models/Task';

// Mock the dependencies
jest.mock('@/app/components/labels', () => ({
  StatusLabel: ({ status }: { status: string }) => <span data-testid="status-label">{status}</span>,
}));

jest.mock('../../TaskActionArea/components/AddNewTask', () => {
  return function MockAddNewTaskBtn({ selectedDate }: { selectedDate: Date }) {
    return (
      <button data-testid="add-new-task-btn">
        Add Task for {selectedDate.toLocaleDateString()}
      </button>
    );
  };
});

// Mock the Dialog components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ open, onOpenChange, children }: any) =>
    open ? (
      <div data-testid="dialog" onClick={() => onOpenChange(false)}>
        {children}
      </div>
    ) : null,
  DialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }: any) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }: any) => <h2 data-testid="dialog-title">{children}</h2>,
  DialogClose: ({ children }: any) => <button data-testid="dialog-close">{children}</button>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, asChild, onClick, ...props }: any) => {
    if (asChild) {
      return <div data-testid="button-wrapper">{children}</div>;
    }
    return (
      <button data-testid="button" onClick={onClick} {...props}>
        {children}
      </button>
    );
  },
}));

describe('DayTasksModal', () => {
  const mockOnClose = jest.fn();
  const testDate = new Date('2025-07-25');

  const createMockTask = (overrides: Partial<Task> = {}): Task => ({
    id: 'task-1',
    title: 'Test Task',
    description: 'Test description',
    dueDate: '2025-07-25',
    status: 'todo' as const,
    priority: 'medium' as const,
    createdAt: '2025-07-24',
    updatedAt: '2025-07-25',
    createdBy: { id: 'user-1', name: 'Test User' },
    project: { id: 'project-1', name: 'Test Project' },
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the current date to be July 25, 2025
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-07-25'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders nothing when modal is closed', () => {
    render(<DayTasksModal open={false} onClose={mockOnClose} date={testDate} tasks={[]} />);

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('renders modal when open is true', () => {
    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={[]} />);

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-header')).toBeInTheDocument();
  });

  it('displays the correct date in the title', () => {
    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={[]} />);

    expect(screen.getByTestId('dialog-title')).toHaveTextContent(
      `Tasks for ${testDate.toLocaleDateString()}`
    );
  });

  it('shows "No tasks for this day" message when tasks array is empty', () => {
    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={[]} />);

    expect(screen.getByText('No tasks for this day.')).toBeInTheDocument();
  });

  it('renders tasks when tasks array is not empty', () => {
    const mockTasks = [
      createMockTask({ id: 'task-1', title: 'First Task', status: 'todo' }),
      createMockTask({ id: 'task-2', title: 'Second Task', status: 'in-progress' }),
    ];

    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={mockTasks} />);

    expect(screen.getByText('First Task')).toBeInTheDocument();
    expect(screen.getByText('Second Task')).toBeInTheDocument();
    expect(screen.queryByText('No tasks for this day.')).not.toBeInTheDocument();
  });

  it('renders StatusLabel for each task', () => {
    const mockTasks = [
      createMockTask({ id: 'task-1', status: 'todo' }),
      createMockTask({ id: 'task-2', status: 'done' }),
    ];

    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={mockTasks} />);

    const statusLabels = screen.getAllByTestId('status-label');
    expect(statusLabels).toHaveLength(2);
    expect(statusLabels[0]).toHaveTextContent('todo');
    expect(statusLabels[1]).toHaveTextContent('done');
  });

  it('renders "Go to task" links for each task', () => {
    const mockTasks = [createMockTask({ id: 'task-1' }), createMockTask({ id: 'task-2' })];

    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={mockTasks} />);

    const taskLinks = screen.getAllByText('Go to task');
    expect(taskLinks).toHaveLength(2);

    // Check that the links have the correct href attributes
    expect(taskLinks[0].closest('a')).toHaveAttribute('href', '/tasks/task-1');
    expect(taskLinks[1].closest('a')).toHaveAttribute('href', '/tasks/task-2');
  });

  it('displays relative date correctly for different scenarios', () => {
    const today = new Date('2025-07-25');
    const tomorrow = new Date('2025-07-26');
    const yesterday = new Date('2025-07-24');
    const futureDate = new Date('2025-07-28');
    const pastDate = new Date('2025-07-22');

    const mockTasks = [
      createMockTask({ id: 'task-1', title: 'Today Task', dueDate: today.toISOString() }),
      createMockTask({ id: 'task-2', title: 'Tomorrow Task', dueDate: tomorrow.toISOString() }),
      createMockTask({ id: 'task-3', title: 'Yesterday Task', dueDate: yesterday.toISOString() }),
      createMockTask({ id: 'task-4', title: 'Future Task', dueDate: futureDate.toISOString() }),
      createMockTask({ id: 'task-5', title: 'Past Task', dueDate: pastDate.toISOString() }),
    ];

    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={mockTasks} />);

    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('in 1 day')).toBeInTheDocument();
    expect(screen.getByText('1 day ago')).toBeInTheDocument();
    expect(screen.getByText('in 3 days')).toBeInTheDocument();
    expect(screen.getByText('3 days ago')).toBeInTheDocument();
  });

  it('handles tasks without due dates', () => {
    const mockTasks = [
      createMockTask({ id: 'task-1', title: 'No Due Date Task', dueDate: undefined }),
    ];

    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={mockTasks} />);

    expect(screen.getByText('No Due Date Task')).toBeInTheDocument();
    // Should render empty relative date
    const relativeDateSpans = screen
      .getByText('No Due Date Task')
      .parentElement?.querySelectorAll('span');
    const relativeDateSpan = Array.from(relativeDateSpans || []).find(
      (span) => span.classList.contains('text-xs') && span.classList.contains('px-2')
    );
    expect(relativeDateSpan).toHaveTextContent('');
  });

  it('renders AddNewTaskBtn with correct selectedDate', () => {
    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={[]} />);

    expect(screen.getByTestId('add-new-task-btn')).toBeInTheDocument();
    expect(screen.getByTestId('add-new-task-btn')).toHaveTextContent(
      `Add Task for ${testDate.toLocaleDateString()}`
    );
  });

  it('calls onClose when dialog onOpenChange is triggered with false', () => {
    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={[]} />);

    // Click on the dialog (which triggers onOpenChange(false) in our mock)
    fireEvent.click(screen.getByTestId('dialog'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handles multiple tasks with different statuses and priorities', () => {
    const mockTasks = [
      createMockTask({
        id: 'task-1',
        title: 'High Priority Todo',
        status: 'todo',
        priority: 'high',
      }),
      createMockTask({
        id: 'task-2',
        title: 'Medium Priority In Progress',
        status: 'in-progress',
        priority: 'medium',
      }),
      createMockTask({
        id: 'task-3',
        title: 'Low Priority Done',
        status: 'done',
        priority: 'low',
      }),
      createMockTask({
        id: 'task-4',
        title: 'Blocked Task',
        status: 'blocked',
      }),
      createMockTask({
        id: 'task-5',
        title: 'In Review Task',
        status: 'in-review',
      }),
      createMockTask({
        id: 'task-6',
        title: 'Cancelled Task',
        status: 'cancelled',
      }),
    ];

    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={mockTasks} />);

    // Check all task titles are rendered
    expect(screen.getByText('High Priority Todo')).toBeInTheDocument();
    expect(screen.getByText('Medium Priority In Progress')).toBeInTheDocument();
    expect(screen.getByText('Low Priority Done')).toBeInTheDocument();
    expect(screen.getByText('Blocked Task')).toBeInTheDocument();
    expect(screen.getByText('In Review Task')).toBeInTheDocument();
    expect(screen.getByText('Cancelled Task')).toBeInTheDocument();

    // Check all status labels are rendered
    const statusLabels = screen.getAllByTestId('status-label');
    expect(statusLabels).toHaveLength(6);

    // Check that all "Go to task" links are present
    const taskLinks = screen.getAllByText('Go to task');
    expect(taskLinks).toHaveLength(6);
  });

  it('truncates long task titles with appropriate styling', () => {
    const longTitle =
      'This is a very long task title that should be truncated when displayed in the modal to prevent layout issues';
    const mockTasks = [createMockTask({ id: 'task-1', title: longTitle })];

    render(<DayTasksModal open={true} onClose={mockOnClose} date={testDate} tasks={mockTasks} />);

    const titleElement = screen.getByText(longTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('truncate');
  });
});

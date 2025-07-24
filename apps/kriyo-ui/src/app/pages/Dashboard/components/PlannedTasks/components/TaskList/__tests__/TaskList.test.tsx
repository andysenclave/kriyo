/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import PlannedTaskList from '../';
import { useMyTasks } from '@/app/providers/MyTasksProvider';
import { Task } from '@/app/providers/MyTasksProvider/models';
import { isToday, formatDistanceToNow } from 'date-fns';

// Mock the MyTasksProvider hook
jest.mock('@/app/providers/MyTasksProvider', () => ({
  useMyTasks: jest.fn(),
}));

// Mock the StatusLabel component
jest.mock('@/app/components/labels', () => ({
  StatusLabel: ({ status }: { status: string }) => (
    <div data-testid={`status-${status}`}>{status}</div>
  ),
}));

// Mock the Button component
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, className, ...props }: any) => (
    <button data-testid="task-button" data-variant={variant} className={className} {...props}>
      {children}
    </button>
  ),
}));

// Mock date-fns functions
jest.mock('date-fns', () => ({
  isToday: jest.fn(),
  formatDistanceToNow: jest.fn(),
}));

const mockUseMyTasks = useMyTasks as jest.MockedFunction<typeof useMyTasks>;
const mockIsToday = isToday as jest.MockedFunction<typeof isToday>;
const mockFormatDistanceToNow = formatDistanceToNow as jest.MockedFunction<
  typeof formatDistanceToNow
>;

// Extended task type for testing with priorityRank
type TestTask = Task & { priorityRank?: number };

describe('PlannedTaskList', () => {
  const mockTasks: TestTask[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      dueDate: '2025-07-26T10:00:00Z',
      status: 'todo',
      priority: 'high',
      priorityRank: 1,
      createdAt: '2025-07-25T09:00:00Z',
      updatedAt: '2025-07-25T09:00:00Z',
      createdBy: { id: 'user1', name: 'John Doe' },
      project: { id: 'project1', name: 'Project Alpha' },
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      dueDate: '2025-07-27T15:00:00Z',
      status: 'in-progress',
      priority: 'medium',
      priorityRank: 2,
      createdAt: '2025-07-25T10:00:00Z',
      updatedAt: '2025-07-25T10:00:00Z',
      createdBy: { id: 'user2', name: 'Jane Smith' },
      project: { id: 'project2', name: 'Project Beta' },
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      dueDate: '2025-07-25T16:00:00Z',
      status: 'done',
      priority: 'low',
      priorityRank: 3,
      createdAt: '2025-07-25T11:00:00Z',
      updatedAt: '2025-07-25T11:00:00Z',
      createdBy: { id: 'user1', name: 'John Doe' },
      project: { id: 'project1', name: 'Project Alpha' },
    },
    {
      id: '4',
      title: 'Task 4 - Should not appear (limit to 3)',
      description: 'Description 4',
      dueDate: '2025-07-28T12:00:00Z',
      status: 'todo',
      priority: 'high',
      priorityRank: 4,
      createdAt: '2025-07-25T12:00:00Z',
      updatedAt: '2025-07-25T12:00:00Z',
      createdBy: { id: 'user2', name: 'Jane Smith' },
      project: { id: 'project2', name: 'Project Beta' },
    },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock date-fns functions
    mockIsToday.mockImplementation((date: string | number | Date) => {
      const today = new Date('2025-07-25');
      const dateObj = new Date(date);
      return dateObj.toDateString() === today.toDateString();
    });
    mockFormatDistanceToNow.mockImplementation((date: string | number | Date) => {
      const dateObj = new Date(date);
      const dateStr = dateObj.toISOString();
      if (dateStr.includes('2025-07-26')) return 'in 1 day';
      if (dateStr.includes('2025-07-27')) return 'in 2 days';
      if (dateStr.includes('2025-07-28')) return 'in 3 days';
      return 'in a few days';
    });
  });

  it('renders without crashing', () => {
    mockUseMyTasks.mockReturnValue({
      scopedTasks: { pending: [] },
    } as any);

    const { container } = render(<PlannedTaskList />);
    // The component renders a div container with specific classes
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders tasks correctly', () => {
    mockUseMyTasks.mockReturnValue({
      scopedTasks: { pending: mockTasks },
    } as any);

    render(<PlannedTaskList />);

    // Should render first 3 tasks only (sorted by priorityRank)
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
    expect(screen.queryByText('Task 4 - Should not appear (limit to 3)')).not.toBeInTheDocument();
  });

  it('displays status labels for each task', () => {
    mockUseMyTasks.mockReturnValue({
      scopedTasks: { pending: mockTasks.slice(0, 3) },
    } as any);

    render(<PlannedTaskList />);

    expect(screen.getByTestId('status-todo')).toBeInTheDocument();
    expect(screen.getByTestId('status-in-progress')).toBeInTheDocument();
    expect(screen.getByTestId('status-done')).toBeInTheDocument();
  });

  it('displays relative due dates correctly', () => {
    mockUseMyTasks.mockReturnValue({
      scopedTasks: { pending: mockTasks.slice(0, 3) },
    } as any);

    render(<PlannedTaskList />);

    expect(screen.getByText('in 1 day')).toBeInTheDocument();
    expect(screen.getByText('in 2 days')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('displays "Today" for tasks due today', () => {
    const todayTask = {
      ...mockTasks[0],
      dueDate: '2025-07-25T16:00:00Z', // Today's date
    };

    mockUseMyTasks.mockReturnValue({
      scopedTasks: { pending: [todayTask] },
    } as any);

    render(<PlannedTaskList />);

    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('renders "Go to task" buttons for each task', () => {
    mockUseMyTasks.mockReturnValue({
      scopedTasks: { pending: mockTasks.slice(0, 3) },
    } as any);

    render(<PlannedTaskList />);

    const buttons = screen.getAllByTestId('task-button');
    expect(buttons).toHaveLength(3);

    buttons.forEach((button) => {
      expect(button).toHaveTextContent('Go to task');
      expect(button).toHaveAttribute('data-variant', 'link');
    });
  });

  it('handles empty task list', () => {
    mockUseMyTasks.mockReturnValue({
      scopedTasks: { pending: [] },
    } as any);

    const { container } = render(<PlannedTaskList />);

    // Should render the container but no task items
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.queryByText('Go to task')).not.toBeInTheDocument();
  });

  it('handles undefined scopedTasks', () => {
    mockUseMyTasks.mockReturnValue({
      scopedTasks: undefined,
    } as any);

    const { container } = render(<PlannedTaskList />);

    // Should render without crashing
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles tasks without due dates', () => {
    const taskWithoutDueDate = {
      ...mockTasks[0],
      dueDate: undefined,
    };

    mockUseMyTasks.mockReturnValue({
      scopedTasks: { pending: [taskWithoutDueDate] },
    } as any);

    render(<PlannedTaskList />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    // Should display empty string for tasks without due date
    const dueDateElements = screen.getAllByText('');
    expect(dueDateElements.length).toBeGreaterThan(0);
  });

  it('sorts tasks by priorityRank and dueDate', () => {
    // Create tasks with different priority ranks to test sorting
    const unsortedTasks: TestTask[] = [
      { ...mockTasks[2], priorityRank: 3 }, // Should be last
      { ...mockTasks[0], priorityRank: 1 }, // Should be first
      { ...mockTasks[1], priorityRank: 2 }, // Should be second
    ];

    mockUseMyTasks.mockReturnValue({
      scopedTasks: { pending: unsortedTasks },
    } as any);

    render(<PlannedTaskList />);

    const taskTitles = screen.getAllByText(/Task \d/);
    expect(taskTitles[0]).toHaveTextContent('Task 1');
    expect(taskTitles[1]).toHaveTextContent('Task 2');
    expect(taskTitles[2]).toHaveTextContent('Task 3');
  });

  it('limits display to 3 tasks maximum', () => {
    // Provide more than 3 tasks
    const manyTasks: TestTask[] = [
      ...mockTasks,
      {
        id: '5',
        title: 'Task 5',
        status: 'todo' as const,
        priorityRank: 5,
        createdAt: '2025-07-25T13:00:00Z',
        updatedAt: '2025-07-25T13:00:00Z',
        createdBy: { id: 'user1', name: 'John Doe' },
        project: { id: 'project1', name: 'Project Alpha' },
      },
      {
        id: '6',
        title: 'Task 6',
        status: 'todo' as const,
        priorityRank: 6,
        createdAt: '2025-07-25T14:00:00Z',
        updatedAt: '2025-07-25T14:00:00Z',
        createdBy: { id: 'user1', name: 'John Doe' },
        project: { id: 'project1', name: 'Project Alpha' },
      },
    ];

    mockUseMyTasks.mockReturnValue({
      scopedTasks: { pending: manyTasks },
    } as any);

    render(<PlannedTaskList />);

    // Should only display first 3 tasks (by priority rank)
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
    expect(screen.queryByText('Task 4 - Should not appear (limit to 3)')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 5')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 6')).not.toBeInTheDocument();

    // Should have exactly 3 "Go to task" buttons
    const buttons = screen.getAllByTestId('task-button');
    expect(buttons).toHaveLength(3);
  });
});

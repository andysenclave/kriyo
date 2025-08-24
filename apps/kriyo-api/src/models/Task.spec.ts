import Task from './Task';

describe('Task Model', () => {
  it('should define Task interface correctly', () => {
    const task: Task = {
      id: 'task-123',
      createdBy: 'user-123',
      title: 'Test Task',
      description: 'Test task description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'high',
      priorityRank: 1,
      project: 'project-123',
      assignedTo: 'user-456',
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    expect(task.id).toBe('task-123');
    expect(task.createdBy).toBe('user-123');
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Test task description');
    expect(task.dueDate).toBe('2025-01-01T00:00:00.000Z');
    expect(task.status).toBe('todo');
    expect(task.priority).toBe('high');
    expect(task.priorityRank).toBe(1);
    expect(task.project).toBe('project-123');
    expect(task.assignedTo).toBe('user-456');
    expect(task.createdAt).toBe('2024-01-01T00:00:00.000Z');
  });

  it('should allow string properties to be empty strings', () => {
    const task: Task = {
      id: '',
      createdBy: '',
      title: '',
      description: '',
      dueDate: '',
      status: '',
      priority: '',
      priorityRank: 0,
      project: '',
      assignedTo: '',
      createdAt: '',
    };

    expect(typeof task.id).toBe('string');
    expect(typeof task.createdBy).toBe('string');
    expect(typeof task.title).toBe('string');
    expect(typeof task.description).toBe('string');
    expect(typeof task.dueDate).toBe('string');
    expect(typeof task.status).toBe('string');
    expect(typeof task.priority).toBe('string');
    expect(typeof task.project).toBe('string');
    expect(typeof task.assignedTo).toBe('string');
    expect(typeof task.createdAt).toBe('string');
  });

  it('should enforce number type for priorityRank', () => {
    const task: Task = {
      id: 'task-123',
      createdBy: 'user-123',
      title: 'Test Task',
      description: 'Test description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'medium',
      priorityRank: 2,
      project: 'project-123',
      assignedTo: 'user-456',
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    expect(typeof task.priorityRank).toBe('number');
    expect(task.priorityRank).toBe(2);
  });

  it('should support different status values', () => {
    const todoTask: Task = {
      id: 'task-1',
      createdBy: 'user-123',
      title: 'Todo Task',
      description: 'Task description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'low',
      priorityRank: 3,
      project: 'project-123',
      assignedTo: 'user-456',
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    const inProgressTask: Task = {
      ...todoTask,
      id: 'task-2',
      status: 'in-progress',
    };

    const completedTask: Task = {
      ...todoTask,
      id: 'task-3',
      status: 'completed',
    };

    expect(todoTask.status).toBe('todo');
    expect(inProgressTask.status).toBe('in-progress');
    expect(completedTask.status).toBe('completed');
  });

  it('should support different priority values', () => {
    const highPriorityTask: Task = {
      id: 'task-1',
      createdBy: 'user-123',
      title: 'High Priority Task',
      description: 'Task description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'high',
      priorityRank: 1,
      project: 'project-123',
      assignedTo: 'user-456',
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    const mediumPriorityTask: Task = {
      ...highPriorityTask,
      id: 'task-2',
      priority: 'medium',
      priorityRank: 2,
    };

    const lowPriorityTask: Task = {
      ...highPriorityTask,
      id: 'task-3',
      priority: 'low',
      priorityRank: 3,
    };

    expect(highPriorityTask.priority).toBe('high');
    expect(highPriorityTask.priorityRank).toBe(1);
    expect(mediumPriorityTask.priority).toBe('medium');
    expect(mediumPriorityTask.priorityRank).toBe(2);
    expect(lowPriorityTask.priority).toBe('low');
    expect(lowPriorityTask.priorityRank).toBe(3);
  });

  it('should handle null-like values for optional string fields', () => {
    const task: Task = {
      id: 'task-123',
      createdBy: 'user-123',
      title: 'Test Task',
      description: 'Test description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'medium',
      priorityRank: 2,
      project: null as any, // Simulating null value
      assignedTo: null as any, // Simulating null value
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    expect(task.project).toBeNull();
    expect(task.assignedTo).toBeNull();
  });
});
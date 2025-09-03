import Task from './Task';
import { UserInfo } from './User';

describe('Task Model', () => {
  it('should define Task interface correctly', () => {
    const task: Task = {
      id: 'task-123',
      createdBy: {
        id: 'user-123',
        name: 'Task Creator',
      },
      title: 'Test Task',
      description: 'Test task description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'high',
      priorityRank: 1,
      project: 'project-123',
      assignedTo: {
        id: 'user-456',
        name: 'John Doe',
      },
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    expect(task.id).toBe('task-123');
    expect(task.createdBy).toEqual({
      id: 'user-123',
      name: 'Task Creator',
    });
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Test task description');
    expect(task.dueDate).toBe('2025-01-01T00:00:00.000Z');
    expect(task.status).toBe('todo');
    expect(task.priority).toBe('high');
    expect(task.priorityRank).toBe(1);
    expect(task.project).toBe('project-123');
    expect(task.assignedTo).toEqual({
      id: 'user-456',
      name: 'John Doe',
    });
    expect(task.createdAt).toBe('2024-01-01T00:00:00.000Z');
  });

  it('should allow string properties to be empty strings and assignedTo to be null', () => {
    const task: Task = {
      id: '',
      createdBy: {
        id: '',
        name: '',
      },
      title: '',
      description: '',
      dueDate: '',
      status: '',
      priority: '',
      priorityRank: 0,
      project: '',
      assignedTo: null,
      createdAt: '',
    };

    expect(typeof task.id).toBe('string');
    expect(task.createdBy).toEqual({ id: '', name: '' });
    expect(typeof task.title).toBe('string');
    expect(typeof task.description).toBe('string');
    expect(typeof task.dueDate).toBe('string');
    expect(typeof task.status).toBe('string');
    expect(typeof task.priority).toBe('string');
    expect(typeof task.project).toBe('string');
    expect(task.assignedTo).toBeNull();
    expect(typeof task.createdAt).toBe('string');
  });

  it('should enforce number type for priorityRank', () => {
    const task: Task = {
      id: 'task-123',
      createdBy: {
        id: 'user-123',
        name: 'Test Creator',
      },
      title: 'Test Task',
      description: 'Test description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'medium',
      priorityRank: 2,
      project: 'project-123',
      assignedTo: {
        id: 'user-456',
        name: 'Jane Smith',
      },
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    expect(typeof task.priorityRank).toBe('number');
    expect(task.priorityRank).toBe(2);
  });

  it('should support different status values', () => {
    const todoTask: Task = {
      id: 'task-1',
      createdBy: {
        id: 'user-123',
        name: 'Status Tester',
      },
      title: 'Todo Task',
      description: 'Task description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'low',
      priorityRank: 3,
      project: 'project-123',
      assignedTo: {
        id: 'user-456',
        name: 'Bob Johnson',
      },
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
      createdBy: {
        id: 'user-123',
        name: 'Priority Tester',
      },
      title: 'High Priority Task',
      description: 'Task description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'high',
      priorityRank: 1,
      project: 'project-123',
      assignedTo: {
        id: 'user-456',
        name: 'Alice Cooper',
      },
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
      createdBy: {
        id: 'user-123',
        name: 'Null Tester',
      },
      title: 'Test Task',
      description: 'Test description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'medium',
      priorityRank: 2,
      project: null,
      assignedTo: null,
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    expect(task.project).toBeNull();
    expect(task.assignedTo).toBeNull();
  });

  it('should handle UserInfo object for assignedTo property', () => {
    const userInfo: UserInfo = {
      id: 'user-789',
      name: 'Mike Davis',
    };

    const taskWithAssignee: Task = {
      id: 'task-123',
      createdBy: {
        id: 'user-123',
        name: 'Assignment Tester',
      },
      title: 'Test Task',
      description: 'Test description',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'medium',
      priorityRank: 2,
      project: 'project-123',
      assignedTo: userInfo,
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    const taskWithoutAssignee: Task = {
      ...taskWithAssignee,
      id: 'task-124',
      assignedTo: null,
    };

    expect(taskWithAssignee.assignedTo).toEqual(userInfo);
    expect(taskWithAssignee.assignedTo?.id).toBe('user-789');
    expect(taskWithAssignee.assignedTo?.name).toBe('Mike Davis');
    expect(taskWithoutAssignee.assignedTo).toBeNull();
  });

  it('should handle UserInfo object for createdBy property', () => {
    const creatorInfo: UserInfo = {
      id: 'user-creator',
      name: 'Task Creator',
    };

    const task: Task = {
      id: 'task-456',
      createdBy: creatorInfo,
      title: 'Created Task',
      description: 'Task with creator info',
      dueDate: '2025-01-01T00:00:00.000Z',
      status: 'todo',
      priority: 'high',
      priorityRank: 1,
      project: 'project-456',
      assignedTo: {
        id: 'user-assignee',
        name: 'Assignee Name',
      },
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    expect(task.createdBy).toEqual(creatorInfo);
    expect(task.createdBy.id).toBe('user-creator');
    expect(task.createdBy.name).toBe('Task Creator');
    expect(typeof task.createdBy).toBe('object');
  });
});

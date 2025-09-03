import Project from './Project';

describe('Project Model', () => {
  it('should define Project interface correctly', () => {
    const project: Project = {
      id: 'project-123',
      owner: {
        id: 'user-123',
        name: 'Project Owner',
      },
      title: 'Test Project',
      description: 'Test project description',
      status: 'active',
      tasks: ['task-1', 'task-2', 'task-3'],
      targetDate: '2025-06-01T00:00:00.000Z',
      priority: 'high',
      priorityRank: 1,
      assignedTo: {
        id: 'user-456',
        name: 'John Doe',
      },
      createdAt: new Date('2024-01-01').toISOString(),
    };

    expect(project.id).toBe('project-123');
    expect(project.owner).toBe('user-123');
    expect(project.title).toBe('Test Project');
    expect(project.description).toBe('Test project description');
    expect(project.status).toBe('active');
    expect(project.tasks).toEqual(['task-1', 'task-2', 'task-3']);
    expect(project.targetDate).toBe('2025-06-01T00:00:00.000Z');
    expect(project.priority).toBe('high');
    expect(project.priorityRank).toBe(1);
    expect(project.assignedTo).toBe('user-456');
    expect(project.createdAt).toBeInstanceOf(Date);
  });

  it('should allow nullable fields to be null', () => {
    const project: Project = {
      id: 'project-123',
      owner: {
        id: 'user-123',
        name: 'Project Owner',
      },
      title: 'Minimal Project',
      description: 'Project with null optional fields',
      status: 'inactive',
      tasks: [],
      targetDate: null,
      priority: null,
      priorityRank: null,
      assignedTo: null,
      createdAt: new Date().toISOString(),
    };

    expect(project.targetDate).toBeNull();
    expect(project.priority).toBeNull();
    expect(project.priorityRank).toBeNull();
    expect(project.assignedTo).toBeNull();
  });

  it('should support empty tasks array', () => {
    const project: Project = {
      id: 'project-123',
      owner: {
        id: 'user-123',
        name: 'Project Owner',
      },
      title: 'Empty Project',
      description: 'Project with no tasks',
      status: 'new',
      tasks: [],
      targetDate: null,
      priority: null,
      priorityRank: null,
      assignedTo: null,
      createdAt: new Date().toISOString(),
    };

    expect(project.tasks).toEqual([]);
    expect(Array.isArray(project.tasks)).toBe(true);
    expect(project.tasks.length).toBe(0);
  });

  it('should support multiple tasks in array', () => {
    const taskIds = ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'];
    const project: Project = {
      id: 'project-123',
      owner: {
        id: 'user-123',
        name: 'Project Owner',
      },
      title: 'Multi-task Project',
      description: 'Project with multiple tasks',
      status: 'active',
      tasks: taskIds,
      targetDate: '2025-12-31T23:59:59.000Z',
      priority: 'medium',
      priorityRank: 2,
      assignedTo: {
        id: 'user-456',
        name: 'John Doe',
      },
      createdAt: new Date().toISOString(),
    };

    expect(project.tasks).toEqual(taskIds);
    expect(project.tasks.length).toBe(5);
    expect(project.tasks[0]).toBe('task-1');
    expect(project.tasks[4]).toBe('task-5');
  });

  it('should enforce string array type for tasks', () => {
    const project: Project = {
      id: 'project-123',
      owner: {
        id: 'user-123',
        name: 'Project Owner',
      },
      title: 'Test Project',
      description: 'Test description',
      status: 'active',
      tasks: ['task-1', 'task-2'],
      targetDate: null,
      priority: null,
      priorityRank: null,
      assignedTo: null,
      createdAt: new Date().toISOString(),
    };

    expect(Array.isArray(project.tasks)).toBe(true);
    project.tasks.forEach((taskId) => {
      expect(typeof taskId).toBe('string');
    });
  });

  it('should support different status values', () => {
    const activeProject: Project = {
      id: 'project-1',
      owner: {
        id: 'user-123',
        name: 'Project Owner',
      },
      title: 'Active Project',
      description: 'An active project',
      status: 'active',
      tasks: [],
      targetDate: null,
      priority: null,
      priorityRank: null,
      assignedTo: null,
      createdAt: new Date().toISOString(),
    };

    const completedProject: Project = {
      ...activeProject,
      id: 'project-2',
      status: 'completed',
    };

    const archivedProject: Project = {
      ...activeProject,
      id: 'project-3',
      status: 'archived',
    };

    expect(activeProject.status).toBe('active');
    expect(completedProject.status).toBe('completed');
    expect(archivedProject.status).toBe('archived');
  });

  it('should support different priority values and ranks', () => {
    const highPriorityProject: Project = {
      id: 'project-1',
      owner: {
        id: 'user-123',
        name: 'Project Owner',
      },
      title: 'High Priority Project',
      description: 'Critical project',
      status: 'active',
      tasks: [],
      targetDate: '2025-03-01T00:00:00.000Z',
      priority: 'high',
      priorityRank: 1,
      assignedTo: null,
      createdAt: new Date().toISOString(),
    };

    const lowPriorityProject: Project = {
      ...highPriorityProject,
      id: 'project-2',
      priority: 'low',
      priorityRank: 3,
    };

    expect(highPriorityProject.priority).toBe('high');
    expect(highPriorityProject.priorityRank).toBe(1);
    expect(lowPriorityProject.priority).toBe('low');
    expect(lowPriorityProject.priorityRank).toBe(3);
  });

  it('should enforce Date type for createdAt', () => {
    const now = new Date().toISOString();
    const project: Project = {
      id: 'project-123',
      owner: {
        id: 'user-123',
        name: 'Project Owner',
      },
      title: 'Test Project',
      description: 'Test description',
      status: 'active',
      tasks: [],
      targetDate: null,
      priority: null,
      priorityRank: null,
      assignedTo: null,
      createdAt: now,
    };

    expect(project.createdAt).toBeInstanceOf(Date);
    expect(project.createdAt).toBe(now);
  });

  it('should allow string properties to be empty strings', () => {
    const project: Project = {
      id: '',
      owner: {
        id: '',
        name: '',
      },
      title: '',
      description: '',
      status: '',
      tasks: [],
      targetDate: '',
      priority: '',
      priorityRank: 0,
      assignedTo: null,
      createdAt: new Date().toISOString(),
    };

    expect(typeof project.id).toBe('string');
    expect(typeof project.owner).toBe('string');
    expect(typeof project.title).toBe('string');
    expect(typeof project.description).toBe('string');
    expect(typeof project.status).toBe('string');
    expect(typeof project.targetDate).toBe('string');
    expect(typeof project.priority).toBe('string');
    expect(typeof project.assignedTo).toBe('string');
  });
});

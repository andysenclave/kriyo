import seedGetMyPendingTasks from './seedGetMyPendingTasks';

const seedGetTasks = {
  url: '*/protected/tasks/search/*',
  response: {
    tasks: seedGetMyPendingTasks.response.content.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      assignedTo: task.assignedTo?.id,
      createdBy: task.createdBy,
      project: task.project?.id,
    }))
  },
};

export default seedGetTasks;
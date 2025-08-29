import seedGetMyPendingTasks from './seedGetMyPendingTasks';

const seedGetTaskDetail = {
  url: '*/protected/tasks/:id',
  response: (taskId: string) => {
    const task = seedGetMyPendingTasks.response.content.find(t => t.id === taskId);
    
    if (!task) {
      return { error: 'Task not found' };
    }

    return {
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
    };
  },
};

export default seedGetTaskDetail;
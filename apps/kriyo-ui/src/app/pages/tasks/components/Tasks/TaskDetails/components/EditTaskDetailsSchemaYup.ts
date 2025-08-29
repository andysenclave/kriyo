import Task from '@/app/hooks/tasks/models/Task';
import * as Yup from 'yup';

export const EditTaskDetailsSchema = Yup.object<Task>({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  dueDate: Yup.string(),
  status: Yup.string()
    .oneOf(['todo', 'in-progress', 'in-review', 'done', 'blocked', 'cancelled'])
    .required('Status is required'),
  priority: Yup.string().oneOf(['low', 'medium', 'high']),
  priorityRank: Yup.number().min(1).max(3).required('Priority rank is required'),
  assignedTo: Yup.object({
    id: Yup.string(),
    name: Yup.string(),
  }).optional(),
});

export type EditTaskFormValues = Yup.InferType<typeof EditTaskDetailsSchema>;

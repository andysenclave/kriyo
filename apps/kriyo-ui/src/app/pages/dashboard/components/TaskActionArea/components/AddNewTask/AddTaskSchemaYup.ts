import { Task } from '@/app/providers/MyTasksProvider/models';
import * as Yup from 'yup';

export const AddTaskSchema = Yup.object<Task>({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  dueDate: Yup.string(),
  status: Yup.string()
    .oneOf(['todo', 'in-progress', 'in-review', 'done', 'blocked', 'cancelled'])
    .required('Status is required'),
  priority: Yup.string().oneOf(['low', 'medium', 'high']),
  assignedTo: Yup.object({
    id: Yup.string(),
    name: Yup.string(),
  }).optional(),
  project: Yup.object({
    id: Yup.string().optional(),
    name: Yup.string().optional(),
  }).optional(),
});

export type AddTaskFormValues = Yup.InferType<typeof AddTaskSchema>;

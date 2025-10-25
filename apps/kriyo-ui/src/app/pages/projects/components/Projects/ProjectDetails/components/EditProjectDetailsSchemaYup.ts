import Task from '@/app/hooks/tasks/models/Task';
import * as Yup from 'yup';

export const EditProjectDetailsSchema = Yup.object<Task>({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  status: Yup.string()
    .oneOf(['planning', 'active', 'on-hold', 'completed', 'cancelled'])
    .required('Status is required'),
  tasks: Yup.array().of(Yup.string().optional()).optional(),
  targetDate: Yup.string().optional(),
  priority: Yup.string().oneOf(['low', 'medium', 'high']),
  priorityRank: Yup.number().min(1).max(3).optional(),
  assignedTo: Yup.object({
    id: Yup.string(),
    name: Yup.string(),
  }).optional(),
});

export type EditProjectFormValues = Yup.InferType<typeof EditProjectDetailsSchema>;

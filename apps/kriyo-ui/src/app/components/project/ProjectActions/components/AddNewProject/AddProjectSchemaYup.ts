import { Project } from '@/app/hooks/projects/models';
import * as Yup from 'yup';

export const AddProjectSchemaYup = Yup.object<Project>({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  status: Yup.string()
    .oneOf(['planning', 'active', 'on-hold', 'completed', 'cancelled'])
    .required('Status is required'),
  tasks: Yup.array().of(Yup.string().optional()).optional(),
  targetDate: Yup.string().optional(),
  priority: Yup.string().oneOf(['low', 'medium', 'high']),
  priorityRank: Yup.number().min(1).max(3).optional(),
  assignedTo: Yup.string().optional(),
});

export type AddProjectFormValues = Yup.InferType<typeof AddProjectSchemaYup>;

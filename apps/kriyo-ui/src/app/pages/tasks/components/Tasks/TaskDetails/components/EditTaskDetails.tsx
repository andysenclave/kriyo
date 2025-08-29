/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Task } from '@/app/hooks/tasks/models';
import { Button } from '@/components/ui/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { EditTaskDetailsSchema, EditTaskFormValues } from './EditTaskDetailsSchemaYup';
import { useUpdateTaskDetail } from '@/app/hooks/tasks';

interface EditTaskDetailsProps {
  taskId: string;
  task: Task;
  onStopEditing: () => void;
}

const statusOptions = [
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'In Review', value: 'in-review' },
  { label: 'Done', value: 'done' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Cancelled', value: 'cancelled' },
];

const priorityOptions = [
  { label: 'Low', value: 'low', rank: 3 },
  { label: 'Medium', value: 'medium', rank: 2 },
  { label: 'High', value: 'high', rank: 1 },
];

const formatDate = (date: Date) => {
  const selectedTaskDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .split('/');
  return `${selectedTaskDate[2]}-${selectedTaskDate[0]}-${selectedTaskDate[1]}`;
};

const EditTaskDetails = ({ taskId, onStopEditing, task }: EditTaskDetailsProps) => {
  const { updateTask, isPending } = useUpdateTaskDetail();

  const selectedDate = task.dueDate ? new Date(task.dueDate) : new Date();
  const formattedDate = formatDate(selectedDate);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTaskFormValues>({
    resolver: yupResolver(EditTaskDetailsSchema),
    defaultValues: {
      ...task,
    },
  });

  const onSubmit: SubmitHandler<EditTaskFormValues> = (data: Partial<Task>) => {
    const { assignedTo, project, ...payload } = data;
    payload.priorityRank = priorityOptions.find((opt) => opt.value === data.priority)?.rank;

    updateTask({ id: taskId, payload });
    onStopEditing();
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name={'title' as FieldPath<EditTaskFormValues>}
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="Task title"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          )}
        />
        <Controller
          name={'description' as FieldPath<EditTaskFormValues>}
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Description"
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          )}
        />
        <Controller
          name={'dueDate' as FieldPath<EditTaskFormValues>}
          control={control}
          render={({ field }) => (
            <input {...field} type="date" className="w-full border rounded px-3 py-2" />
          )}
        />
        <Controller
          name={'status' as FieldPath<EditTaskFormValues>}
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded px-3 py-2">
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        />
        <Controller
          name={'priority' as FieldPath<EditTaskFormValues>}
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded px-3 py-2">
              <option value="">Select Priority</option>
              {priorityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        />
        <div className="flex gap-2">
          <Controller
            name={'assignedTo.id' as FieldPath<EditTaskFormValues>}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Assignee ID (optional)"
                className="w-full border rounded px-3 py-2"
              />
            )}
          />
          <Controller
            name={'assignedTo.name' as FieldPath<EditTaskFormValues>}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Assignee Name (optional)"
                className="w-full border rounded px-3 py-2"
              />
            )}
          />
        </div>
        <div className="flex gap-2">
          <Controller
            name={'project.id' as FieldPath<EditTaskFormValues>}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Project ID"
                className="w-full border rounded px-3 py-2"
              />
            )}
          />
          <Controller
            name={'project.name' as FieldPath<EditTaskFormValues>}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Project Name"
                className="w-full border rounded px-3 py-2"
              />
            )}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={onStopEditing}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer text-base bg-gray-300 hover:bg-gray-400 font-semibold"
            size="lg"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2 cursor-pointer text-base font-semibold"
            size="lg"
          >
            {isPending ? 'Adding...' : 'Save Task'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskDetails;

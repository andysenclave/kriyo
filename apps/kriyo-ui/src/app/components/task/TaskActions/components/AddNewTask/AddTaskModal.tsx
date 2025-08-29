/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { useForm, Controller, SubmitHandler, FieldPath } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTaskSchema, AddTaskFormValues } from './AddTaskSchemaYup';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Task from '@/app/hooks/tasks/models/Task';
import { useAddMyTask } from '@/app/hooks';

interface AddTaskModalProps {
  selectedDate?: Date;
  open: boolean;
  onClose: () => void;
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
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  open,
  onClose,
  selectedDate = new Date(),
}) => {
  const { data, addMyTask, isPending } = useAddMyTask();

  const selectedTaskDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(selectedDate)
    .split('/');
  const formattedDate = `${selectedTaskDate[2]}-${selectedTaskDate[0]}-${selectedTaskDate[1]}`;

  const { control, handleSubmit, reset } = useForm<AddTaskFormValues>({
    resolver: yupResolver(AddTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: formattedDate,
      status: 'todo',
      priority: 'medium',
      assignedTo: { id: '', name: '' },
      project: { id: '', name: '' },
    },
  });

  const onSubmit: SubmitHandler<AddTaskFormValues> = (data: Partial<Task>) => {
    const { assignedTo, project, ...payload } = data;
    addMyTask(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name={'title' as FieldPath<AddTaskFormValues>}
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
            name={'description' as FieldPath<AddTaskFormValues>}
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
            name={'dueDate' as FieldPath<AddTaskFormValues>}
            control={control}
            render={({ field }) => (
              <input {...field} type="date" className="w-full border rounded px-3 py-2" />
            )}
          />
          <Controller
            name={'status' as FieldPath<AddTaskFormValues>}
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
            name={'priority' as FieldPath<AddTaskFormValues>}
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
              name={'assignedTo.id' as FieldPath<AddTaskFormValues>}
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
              name={'assignedTo.name' as FieldPath<AddTaskFormValues>}
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
              name={'project.id' as FieldPath<AddTaskFormValues>}
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
              name={'project.name' as FieldPath<AddTaskFormValues>}
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
              onClick={onClose}
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
              {isPending ? 'Adding...' : 'Add Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;

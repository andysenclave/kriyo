export default interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status: "todo" | "in-progress" | "done" | "blocked";
  priority?: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string; // User ID of the person assigned to the task
	createdBy: string; // User ID of the person who created the task
}

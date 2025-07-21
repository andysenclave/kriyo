import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiPlus } from "react-icons/fi";

const TaskActionArea: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <form className="w-full md:w-1/2 flex items-center relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          type="text"
          placeholder="Search tasks..."
          className="pl-10 pr-4 py-2 rounded-lg bg-muted border-none focus:ring-2 focus:ring-primary"
        />
      </form>
      <Button className="flex items-center gap-2 px-5 py-2 text-base font-semibold" size="lg">
        <FiPlus size={20} /> Add new task
      </Button>
    </div>
  );
};

export default TaskActionArea;

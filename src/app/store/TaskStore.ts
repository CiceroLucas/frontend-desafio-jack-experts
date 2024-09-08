import { create } from "zustand";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/service/api";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface TaskStore {
  tasks: Task[];
  fetchAndSetTasks: (token: string) => Promise<void>;
  addTask: (task: Task) => void;
  updateTaskInStore: (updatedTask: Task) => void;
  removeTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  fetchAndSetTasks: async (token: string) => {
    const tasks = await fetchTasks(token);
    set({ tasks });
  },

  addTask: (task: Task) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
  },

  updateTaskInStore: (updatedTask: Task) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
  },

  removeTask: (id: number) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));

// components/TaskCreateForm.tsx
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTaskStore } from "../store/TaskStore";
import { createTask } from "../api/service/api";

export default function TaskCreateForm() {
  const { data: session } = useSession();
  const { addTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = session?.user?.access_token;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!token) return;

    const taskData = { title, description };

    try {
      const newTask = await createTask(taskData, token);
      addTask(newTask);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 font-semibold mb-2"
        >
          Título
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-semibold mb-2"
        >
          Descrição
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Criar Tarefa
      </button>
    </form>
  );
}

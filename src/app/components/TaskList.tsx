import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTaskStore } from "../store/TaskStore";
import { deleteTask, updateTaskStatus, updateTask } from "../api/service/api";

export default function TaskList() {
  const { data: session } = useSession();
  const token = session?.user.access_token;
  const { tasks, fetchAndSetTasks, removeTask, updateTaskInStore } =
    useTaskStore();

  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");

  useEffect(() => {
    if (token) {
      fetchAndSetTasks(token);
    }
  }, [session, fetchAndSetTasks, token]);

  const handleDelete = async (id: number) => {
    if (!token) return;

    try {
      await deleteTask(id, token);
      removeTask(id);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleComplete = async (id: number) => {
    if (!token) return;

    try {
      const updatedTask = await updateTaskStatus(
        id,
        { status: "COMPLETED" },
        token
      );
      updateTaskInStore(updatedTask);
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const handleEdit = (task: any) => {
    setIsEditing(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSave = async (id: number) => {
    if (!token) return;

    try {
      const updatedTask = await updateTask(
        id,
        { title: editTitle, description: editDescription },
        token
      );
      updateTaskInStore(updatedTask);
      setIsEditing(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const reversedTasks = [...tasks].reverse();

  return (
    <div className="flex justify-center items-center p-4">
      <div className="max-w-md w-full p-4 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-4 text-center">Minhas Tarefas</h1>
        <ul className="space-y-4">
          {reversedTasks.map((task) => (
            <li
              key={task.id}
              className="bg-white shadow-lg rounded-lg border border-gray-200 p-4 flex flex-col space-y-2"
            >
              {isEditing === task.id ? (
                <>
                  {/* Formulário de edição */}
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <button
                    onClick={() => handleSave(task.id)}
                    className="py-2 px-4 rounded-lg bg-green-500 text-white hover:bg-green-600"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setIsEditing(null)}
                    className="py-2 px-4 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {/* Exibição normal da tarefa */}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {task.title}
                  </h2>
                  <p className="text-gray-600">{task.description}</p>
                  <p
                    className={`text-sm ${
                      task.status === "COMPLETED"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {task.status === "COMPLETED" ? "Concluída" : "Pendente"}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleComplete(task.id)}
                      className={`py-2 px-4 rounded-lg text-white ${
                        task.status === "COMPLETED"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      disabled={task.status === "COMPLETED"}
                    >
                      {task.status === "COMPLETED" ? "Completada" : "Completar"}
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                      Excluir
                    </button>
                    <button
                      onClick={() => handleEdit(task)}
                      className="py-2 px-4 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

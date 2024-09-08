const URL_API = "https://jackexperts-api.onrender.com/api";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${URL_API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessages = Array.isArray(errorData.message)
        ? errorData.message
        : [errorData.message || "Ocorreu um erro desconhecido."];
      throw new Error(errorMessages.join(", "));
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro ao registrar usuário.");
  }
};

export async function fetchTasks(token: string) {
  const response = await fetch(`${URL_API}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks.");
  }

  return response.json();
}

export async function createTask(
  taskData: { title: string; description: string },
  token: string
) {
  const response = await fetch(`${URL_API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task.");
  }

  return response.json();
}

export async function updateTaskStatus(
  id: number,
  data: { status: string },
  token: string
) {
  const response = await fetch(`${URL_API}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update task.");
  }

  return response.json();
}

export async function updateTask(
  id: number,
  data: { title: string; description: string },
  token: string
) {
  const response = await fetch(`${URL_API}/tasks/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update task.");
  }

  return response.json();
}

export async function deleteTask(id: number, token: string) {
  const response = await fetch(`${URL_API}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task.");
  }

  return response.json();
}

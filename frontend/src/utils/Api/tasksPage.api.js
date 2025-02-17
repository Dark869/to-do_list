const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/tasks`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkTaskUpdate = async (taskId, isReady) => {
    try {
        const response = await fetch(`${BACKEND_URL}/task/${taskId}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isReady }),
        });
    
        if (!response.ok) {
          throw new Error("Error al actualizar el estado de la tarea");
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        throw error;
      }
};

export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error("Error al crear la tarea");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
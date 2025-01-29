export const fetchTasks = async () => {
  try {
    const response = await fetch("http://localhost:3000/tasks", {
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
        const response = await fetch(`http://localhost:3000/updateTask/${taskId}`, {
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
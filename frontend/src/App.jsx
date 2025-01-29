import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import NavBar from "./components/NavBar";
import CreateTaskBottom from "./components/CreateTaskBottom";
import "./App.css";
import "./index.css";
import { fetchTasks } from "./utils/Api/tasksPage.api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        setError(error.message);
      }
    };

    loadTasks();
  }, []);

  return (
    <div className="bg-zinc-800 min-h-screen">
      <NavBar />
      <div className="flex flex-wrap justify-center gap-4">
        {tasks.length === 0 ? (
          <p className="text-white">
            Actualmente no tienes tareas creadas{" "}
            {error && <span className="text-red-500">{error}</span>}
          </p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
      <CreateTaskBottom />
    </div>
  );
}

export default App;

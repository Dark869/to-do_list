import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { grey } from "@mui/material/colors";
import { checkTaskUpdate } from "../utils/api/tasksPage.api";

function TaskCard({ task }) {
  const [isReady, setIsReady] = useState(task.isReady);

  const handleCheckboxChange = async () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);

    try {
      const updatedTask = await checkTaskUpdate(task.id, newIsReady);
      console.log("Tarea actualizada:", updatedTask);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      setIsReady(isReady);
    }
  };

  return (
    <div className="task-card border-2 border-black rounded-lg m-2 px-5 py-2 bg-neutral-600 w-xs min-h-16 h-32 max-h-32 flex flex-col justify-between">
      <div>
        <h3 className="text-xl text-white line-clamp-1">
          <strong>{task.title}</strong>
        </h3>
        <p className="text-white line-clamp-2">{task.description}</p>
      </div>
      <div className="self-start inline-flex items-center justify-between w-full">
        <FormControlLabel
          className="text-white"
          control={
            <Checkbox
              checked={isReady}
              onChange={handleCheckboxChange}
              size="small"
              sx={{
                color: grey[50],
                "&.Mui-checked": {
                  color: grey[50],
                },
              }}
            />
          }
          label={isReady ? "Completado" : "Sin terminar"}
        />
        <p className="text-white">{task.deadline}</p>
      </div>
    </div>
  );
}

export default TaskCard;
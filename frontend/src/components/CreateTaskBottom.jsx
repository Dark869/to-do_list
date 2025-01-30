import { useState } from "react";
import { createTask } from "../utils/Api/tasksPage.api";

function CreateTaskBottom() {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createTask(taskData);
    if (result) {
      console.log("Tarea creada con éxito");
      setShowModal(false);
      window.location.reload();
    } else {
      console.error("Error al crear la tarea");
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 flex items-center justify-center bg-neutral-950/50 p-4 ${
          showModal ? "block" : "hidden"
        }`}
      >
        <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 bg-neutral-800 rounded-3xl flex flex-col items-center p-6 sm:p-8 relative">
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 text-4xl z-30 text-white transition-opacity duration-300 ease-in-out hover:opacity-70"
            onClick={() => setShowModal(false)}
          >
            x
          </button>
          <h1 className="text-xl sm:text-3xl text-white my-4 sm:my-6 text-center">
            Crear nueva tarea
          </h1>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              className="w-full h-10 bg-neutral-700 text-white rounded-lg px-4 sm:px-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre de la tarea"
              value={taskData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              className="w-full h-32 bg-neutral-700 text-white rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción de la tarea"
              value={taskData.description}
              onChange={handleChange}
            ></textarea>
            <div className="grid justify-items-center">
              <input
                type="date"
                name="deadline"
                className="border-2 rounded-lg px-4 py-1 text-neutral-400 bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={taskData.deadline}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                value="Crear"
                className="w-full sm:w-3/4 md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              />
            </div>
          </form>
        </div>
      </div>
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 border-2 bg-neutral-700 text-center grid justify-items-center fixed bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-10 lg:left-10 z-10 transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-neutral-600"
        id="createTaskBottom"
      >
        <button
          className="invert w-3/4 h-auto"
          onClick={() => setShowModal(true)}
        >
          <img
            src="https://img.icons8.com/?size=100&id=3220&format=png&color=000000"
            alt="Agregar tarea"
          />
        </button>
      </div>
    </>
  );
}

export default CreateTaskBottom;


import { useState } from "react";
import api from "../services/api";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.post("/tasks", {
      title,
      description,
    });

    alert("Task Created");

    setTitle("");
    setDescription("");
  } catch (error) {
    console.log(error);

    alert("Task Creation Failed");
  }
};
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Create Task
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
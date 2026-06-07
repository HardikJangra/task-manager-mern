import {
  useState,
  useEffect,
} from "react";

import api from "../services/api";

function TaskForm({
  fetchTasks,
  editingTask,
  setEditingTask,
}) {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(
        editingTask.description
      );
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await api.put(
          `/tasks/${editingTask._id}`,
          {
            title,
            description,
          }
        );

        alert("Task Updated");

        setEditingTask(null);
      } else {
        await api.post("/tasks", {
          title,
          description,
        });

        alert("Task Created");
      }

      await fetchTasks();

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        {editingTask
          ? "Edit Task"
          : "Create Task"}
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
            setDescription(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          {editingTask
            ? "Update Task"
            : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
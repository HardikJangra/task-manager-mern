function TaskCard({
  task,
  onDelete,
  onToggle,
  onEdit,
}) {
  return (
    <div className="bg-white p-5 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">
            {task.title}
          </h3>

          <p className="text-gray-600 mt-2">
            {task.description}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded text-white ${
            task.completed
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
        >
          {task.completed
            ? "Completed"
            : "Pending"}
        </span>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onEdit(task)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() =>
            onToggle(task._id)
          }
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Toggle Status
        </button>

        <button
          onClick={() =>
            onDelete(task._id)
          }
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
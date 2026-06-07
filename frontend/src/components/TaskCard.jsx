function TaskCard({ task }) {
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
    </div>
  );
}

export default TaskCard;
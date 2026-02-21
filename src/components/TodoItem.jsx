function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm transition hover:shadow"
      data-testid={`todo-item-${todo.id}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 cursor-pointer rounded border-slate-300 text-slate-600 focus:ring-slate-500"
        data-testid={`todo-checkbox-${todo.id}`}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <span
        className={`flex-1 ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}
        data-testid={`todo-text-${todo.id}`}
      >
        {todo.text}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="rounded px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        data-testid={`todo-delete-${todo.id}`}
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem

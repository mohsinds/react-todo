import { memo } from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <p
        className="rounded-lg bg-white py-8 text-center text-slate-500 shadow-sm"
        data-testid="todo-empty"
      >
        No todos yet. Add one above!
      </p>
    )
  }

  return (
    <ul className="space-y-2" data-testid="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)

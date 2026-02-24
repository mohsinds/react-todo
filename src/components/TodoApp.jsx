import useTodos from '../hooks/useTodos'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

function TodoApp() {
  const { todos, loading, error, addTodo, deleteTodo, toggleTodo } = useTodos()

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-800">
          Todo List
        </h1>

        <TodoInput onAdd={addTodo} disabled={loading} />

        {error && (
          <div
            className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800"
            role="alert"
          >
            {error}
          </div>
        )}

        {loading && todos.length === 0 ? (
          <div
            className="rounded-lg bg-white py-12 text-center text-slate-500 shadow-sm"
            data-testid="todo-loading"
          >
            Loading todos…
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      </div>
    </div>
  )
}

export default TodoApp

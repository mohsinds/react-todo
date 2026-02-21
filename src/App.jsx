import { useState } from 'react'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    if (!text.trim()) return
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: text.trim(), completed: false },
    ])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-800">
          Todo List
        </h1>
        <TodoForm onAdd={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  )
}

export default App

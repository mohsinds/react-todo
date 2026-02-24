import { useState, useCallback } from 'react'

function TodoInput({ onAdd, disabled }) {
  const [input, setInput] = useState('')

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const trimmed = input.trim()
      if (!trimmed) return
      onAdd(trimmed)
      setInput('')
    },
    [input, onAdd]
  )

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
        disabled={disabled}
        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:opacity-60"
        data-testid="todo-input"
        aria-label="New todo"
      />
      <button
        type="submit"
        disabled={disabled}
        className="rounded-lg bg-slate-700 px-5 py-3 font-medium text-white transition hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-60"
        data-testid="todo-submit"
      >
        Add
      </button>
    </form>
  )
}

export default TodoInput

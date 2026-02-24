import { useState, useEffect, useCallback } from 'react'
import { fetchTodos } from '../api/mockTodos'

const STORAGE_KEY = 'react-todo-todos'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveToStorage(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // ignore
  }
}

/**
 * Custom hook: todo state and actions, fully separated from UI.
 * - Fetches initial todos from mock API
 * - Persists to localStorage on every change
 * - Exposes loading, error, and stable mutation callbacks
 */
export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      const cached = loadFromStorage()
      if (cached?.length) setTodos(cached)

      try {
        const data = await fetchTodos()
        if (!cancelled) {
          setTodos(data)
          saveToStorage(data)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e?.message ?? 'Failed to load todos')
          if (!cached?.length) setTodos([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  const addTodo = useCallback((text) => {
    const trimmed = String(text).trim()
    if (!trimmed) return
    setTodos((prev) => {
      const next = [
        ...prev,
        { id: crypto.randomUUID(), text: trimmed, completed: false },
      ]
      saveToStorage(next)
      return next
    })
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => {
      const next = prev.filter((t) => t.id !== id)
      saveToStorage(next)
      return next
    })
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos((prev) => {
      const next = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
      saveToStorage(next)
      return next
    })
  }, [])

  return {
    todos,
    loading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
  }
}

export default useTodos

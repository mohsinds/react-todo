/**
 * Mock API for todos. Simulates network delay.
 */

const MOCK_TODOS = [
  { id: '1', text: 'Learn React hooks', completed: true },
  { id: '2', text: 'Build a Todo app', completed: false },
  { id: '3', text: 'Ship it', completed: false },
]

const DELAY_MS = 600

export function fetchTodos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_TODOS]), DELAY_MS)
  })
}

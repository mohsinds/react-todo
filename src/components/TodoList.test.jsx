import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TodoList from './TodoList'

describe('TodoList', () => {
  it('shows empty message when no todos', () => {
    render(<TodoList todos={[]} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument()
  })

  it('renders list of todos', () => {
    const todos = [
      { id: '1', text: 'Todo one', completed: false },
      { id: '2', text: 'Todo two', completed: true },
    ]
    render(<TodoList todos={todos} onToggle={() => {}} onDelete={() => {}} />)

    expect(screen.getByText('Todo one')).toBeInTheDocument()
    expect(screen.getByText('Todo two')).toBeInTheDocument()
    expect(screen.getByTestId('todo-list').children).toHaveLength(2)
  })
})

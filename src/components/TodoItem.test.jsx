import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from './TodoItem'

describe('TodoItem', () => {
  const defaultTodo = { id: 'todo-1', text: 'Test todo', completed: false }

  it('renders todo text', () => {
    render(
      <TodoItem todo={defaultTodo} onToggle={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })

  it('shows unchecked checkbox when not completed', () => {
    render(
      <TodoItem todo={defaultTodo} onToggle={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('shows checked checkbox when completed', () => {
    render(
      <TodoItem
        todo={{ ...defaultTodo, completed: true }}
        onToggle={() => {}}
        onDelete={() => {}}
      />
    )
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <TodoItem todo={defaultTodo} onToggle={onToggle} onDelete={() => {}} />
    )

    await user.click(screen.getByRole('checkbox'))

    expect(onToggle).toHaveBeenCalledWith('todo-1')
  })

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(
      <TodoItem todo={defaultTodo} onToggle={() => {}} onDelete={onDelete} />
    )

    await user.click(screen.getByRole('button', { name: /delete "test todo"/i }))

    expect(onDelete).toHaveBeenCalledWith('todo-1')
  })

  it('applies line-through style when completed', () => {
    render(
      <TodoItem
        todo={{ ...defaultTodo, completed: true }}
        onToggle={() => {}}
        onDelete={() => {}}
      />
    )
    const textEl = screen.getByTestId('todo-text-todo-1')
    expect(textEl).toHaveClass('line-through')
  })
})

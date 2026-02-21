import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from './TodoForm'

describe('TodoForm', () => {
  it('renders input and submit button', () => {
    render(<TodoForm onAdd={() => {}} />)
    expect(screen.getByTestId('todo-input')).toBeInTheDocument()
    expect(screen.getByTestId('todo-submit')).toHaveTextContent('Add')
  })

  it('calls onAdd with trimmed text when form is submitted', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TodoForm onAdd={onAdd} />)

    await user.type(screen.getByTestId('todo-input'), '  New todo  ')
    await user.click(screen.getByTestId('todo-submit'))

    expect(onAdd).toHaveBeenCalledWith('New todo')
  })

  it('does not call onAdd when input is empty', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TodoForm onAdd={onAdd} />)

    await user.click(screen.getByTestId('todo-submit'))

    expect(onAdd).not.toHaveBeenCalled()
  })

  it('updates input value when typing', async () => {
    const user = userEvent.setup()
    render(<TodoForm onAdd={() => {}} />)
    const input = screen.getByTestId('todo-input')

    await user.type(input, 'Hello')

    expect(input).toHaveValue('Hello')
  })
})

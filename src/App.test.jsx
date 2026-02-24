import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

vi.mock('./api/mockTodos', () => ({
  fetchTodos: () => Promise.resolve([]),
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.localStorage.clear()
  })

  it('renders the todo list heading', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /todo list/i })).toBeInTheDocument()
    await screen.findByTestId('todo-empty')
  })

  it('shows empty state when there are no todos', async () => {
    render(<App />)
    expect(await screen.findByText(/no todos yet/i)).toBeInTheDocument()
  })

  it('adds a todo when form is submitted', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByTestId('todo-empty')
    const input = screen.getByTestId('todo-input')
    const submit = screen.getByTestId('todo-submit')

    await user.type(input, 'Buy milk')
    await user.click(submit)

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument()
  })

  it('clears input after adding a todo', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByTestId('todo-empty')
    const input = screen.getByTestId('todo-input')
    const submit = screen.getByTestId('todo-submit')

    await user.type(input, 'Walk the dog')
    await user.click(submit)

    expect(input).toHaveValue('')
  })

  it('does not add empty todo', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByTestId('todo-empty')
    const submit = screen.getByTestId('todo-submit')
    await user.click(submit)
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument()
  })

  it('toggles todo completion when checkbox is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByTestId('todo-empty')
    const input = screen.getByTestId('todo-input')
    const submit = screen.getByTestId('todo-submit')

    await user.type(input, 'Learn React')
    await user.click(submit)

    const todoText = screen.getByText('Learn React')
    expect(todoText).not.toHaveClass('line-through')

    const checkbox = screen.getByRole('checkbox', { name: /mark "learn react"/i })
    await user.click(checkbox)

    expect(todoText).toHaveClass('line-through')
    expect(checkbox).toBeChecked()
  })

  it('removes todo when delete is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByTestId('todo-empty')
    const input = screen.getByTestId('todo-input')
    const submit = screen.getByTestId('todo-submit')

    await user.type(input, 'Remove me')
    await user.click(submit)

    expect(screen.getByText('Remove me')).toBeInTheDocument()

    const deleteBtn = screen.getByRole('button', { name: /delete "remove me"/i })
    await user.click(deleteBtn)

    expect(screen.queryByText('Remove me')).not.toBeInTheDocument()
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument()
  })

  it('adds multiple todos', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByTestId('todo-empty')
    const input = screen.getByTestId('todo-input')
    const submit = screen.getByTestId('todo-submit')

    await user.type(input, 'First task')
    await user.click(submit)
    await user.type(input, 'Second task')
    await user.click(submit)

    expect(screen.getByText('First task')).toBeInTheDocument()
    expect(screen.getByText('Second task')).toBeInTheDocument()
    expect(screen.getByTestId('todo-list').children).toHaveLength(2)
  })
})

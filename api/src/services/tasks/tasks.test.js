import { tasks, task, createTask, updateTask, deleteTask } from './tasks'

describe('tasks', () => {
  scenario('returns all tasks', async (scenario) => {
    const result = await tasks()

    expect(result.length).toEqual(Object.keys(scenario.task).length)
  })

  scenario('returns a single task', async (scenario) => {
    const result = await task({ id: scenario.task.one.id })

    expect(result).toEqual(scenario.task.one)
  })

  scenario('creates a task', async () => {
    const result = await createTask({
      input: { updatedAt: '2021-08-02T21:52:51Z', title: 'String' },
    })

    expect(result.updatedAt).toEqual('2021-08-02T21:52:51Z')
    expect(result.title).toEqual('String')
  })

  scenario('updates a task', async (scenario) => {
    const original = await task({ id: scenario.task.one.id })
    const result = await updateTask({
      id: original.id,
      input: { updatedAt: '2021-08-03T21:52:51Z' },
    })

    expect(result.updatedAt).toEqual('2021-08-03T21:52:51Z')
  })

  scenario('deletes a task', async (scenario) => {
    const original = await deleteTask({ id: scenario.task.one.id })
    const result = await task({ id: original.id })

    expect(result).toEqual(null)
  })
})

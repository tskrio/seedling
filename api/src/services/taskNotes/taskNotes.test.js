import { taskNotes } from './taskNotes'

describe('taskNotes', () => {
  scenario('returns all taskNotes', async (scenario) => {
    const result = await taskNotes()

    expect(result.length).toEqual(Object.keys(scenario.taskNote).length)
  })
})

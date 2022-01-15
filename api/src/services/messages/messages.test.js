import {
  messages,
  message,
  createMessage,
  updateMessage,
  deleteMessage,
} from './messages'

describe('messages', () => {
  scenario('returns all messages', async (scenario) => {
    const result = await messages()

    expect(result.length).toEqual(Object.keys(scenario.message).length)
  })

  scenario('returns a single message', async (scenario) => {
    const result = await message({ id: scenario.message.one.id })

    expect(result).toEqual(scenario.message.one)
  })

  scenario('creates a message', async () => {
    const result = await createMessage({
      input: {
        updatedAt: '2022-01-15T20:50:43Z',
        language: 'String',
        entity: 'String',
        value: 'String',
      },
    })

    expect(result.updatedAt).toEqual('2022-01-15T20:50:43Z')
    expect(result.language).toEqual('String')
    expect(result.entity).toEqual('String')
    expect(result.value).toEqual('String')
  })

  scenario('updates a message', async (scenario) => {
    const original = await message({ id: scenario.message.one.id })
    const result = await updateMessage({
      id: original.id,
      input: { updatedAt: '2022-01-16T20:50:43Z' },
    })

    expect(result.updatedAt).toEqual('2022-01-16T20:50:43Z')
  })

  scenario('deletes a message', async (scenario) => {
    const original = await deleteMessage({ id: scenario.message.one.id })
    const result = await message({ id: original.id })

    expect(result).toEqual(null)
  })
})

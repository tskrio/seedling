import { logs, log, createLog, updateLog, deleteLog } from './logs'

describe('logs', () => {
  scenario('returns all logs', async (scenario) => {
    const result = await logs()

    expect(result.length).toEqual(Object.keys(scenario.log).length)
  })

  scenario('returns a single log', async (scenario) => {
    const result = await log({ id: scenario.log.one.id })

    expect(result).toEqual(scenario.log.one)
  })

  scenario('creates a log', async () => {
    const result = await createLog({
      input: { message: 'String', source: 'String' },
    })

    expect(result.message).toEqual('String')
    expect(result.source).toEqual('String')
  })

  scenario('updates a log', async (scenario) => {
    const original = await log({ id: scenario.log.one.id })
    const result = await updateLog({
      id: original.id,
      input: { message: 'String2' },
    })

    expect(result.message).toEqual('String2')
  })

  scenario('deletes a log', async (scenario) => {
    const original = await deleteLog({ id: scenario.log.one.id })
    const result = await log({ id: original.id })

    expect(result).toEqual(null)
  })
})

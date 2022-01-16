import {
  preferences,
  preference,
  createPreference,
  updatePreference,
  deletePreference,
} from './preferences'

describe('preferences', () => {
  scenario('returns all preferences', async (scenario) => {
    const result = await preferences()

    expect(result.length).toEqual(Object.keys(scenario.preference).length)
  })

  scenario('returns a single preference', async (scenario) => {
    const result = await preference({ id: scenario.preference.one.id })

    expect(result).toEqual(scenario.preference.one)
  })

  scenario('creates a preference', async (scenario) => {
    const result = await createPreference({
      input: {
        updatedAt: '2022-01-15T22:17:11Z',
        entity: 'String',
        userId: scenario.preference.two.userId,
      },
    })

    expect(result.updatedAt).toEqual('2022-01-15T22:17:11Z')
    expect(result.entity).toEqual('String')
    expect(result.userId).toEqual(scenario.preference.two.userId)
  })

  scenario('updates a preference', async (scenario) => {
    const original = await preference({ id: scenario.preference.one.id })
    const result = await updatePreference({
      id: original.id,
      input: { updatedAt: '2022-01-16T22:17:11Z' },
    })

    expect(result.updatedAt).toEqual('2022-01-16T22:17:11Z')
  })

  scenario('deletes a preference', async (scenario) => {
    const original = await deletePreference({ id: scenario.preference.one.id })
    const result = await preference({ id: original.id })

    expect(result).toEqual(null)
  })
})

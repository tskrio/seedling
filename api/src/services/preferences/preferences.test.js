import { preferences } from './preferences'

describe('preferences', () => {
  scenario('returns all preferences', async (scenario) => {
    const result = await preferences()

    expect(result.length).toEqual(Object.keys(scenario.preference).length)
  })
})

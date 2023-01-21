import {
  properties,
  property,
  createProperty,
  updateProperty,
  deleteProperty,
} from './properties'

describe('properties', () => {
  scenario('returns all properties', async (scenario) => {
    const result = await properties()

    expect(result.length).toEqual(Object.keys(scenario.property).length)
  })

  scenario('returns a single property', async (scenario) => {
    const result = await property({ id: scenario.property.one.cuid })

    expect(result).toEqual(scenario.property.one)
  })

  scenario('creates a property', async () => {
    const result = await createProperty({
      input: { updatedAt: '2022-01-22T05:12:49Z', entity: 'String' },
    })

    expect(result.updatedAt).toEqual('2022-01-22T05:12:49Z')
    expect(result.entity).toEqual('String')
  })

  scenario('updates a property', async (scenario) => {
    const original = await property({ id: scenario.property.one.cuid })
    const result = await updateProperty({
      id: original.cuid,
      input: { updatedAt: '2022-01-23T05:12:49Z' },
    })

    expect(result.updatedAt).toEqual('2022-01-23T05:12:49Z')
  })

  scenario('deletes a property', async (scenario) => {
    const original = await deleteProperty({ id: scenario.property.one.cuid })
    const result = await property({ id: original.cuid })

    expect(result).toEqual(null)
  })
})

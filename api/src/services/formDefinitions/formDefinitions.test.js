import {
  formDefinitions,
  formDefinition,
  createFormDefinition,
  updateFormDefinition,
  deleteFormDefinition,
} from './formDefinitions'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('formDefinitions', () => {
  scenario('returns all formDefinitions', async (scenario) => {
    const result = await formDefinitions()

    expect(result.length).toEqual(Object.keys(scenario.formDefinition).length)
  })

  scenario('returns a single formDefinition', async (scenario) => {
    const result = await formDefinition({
      id: scenario.formDefinition.one.id,
    })

    expect(result).toEqual(scenario.formDefinition.one)
  })

  scenario('creates a formDefinition', async () => {
    const result = await createFormDefinition({
      input: {
        updatedAt: '2023-06-01T17:28:21.994Z',
        name: 'String7828124',
        title: 'String',
        content: 'String',
      },
    })

    expect(result.updatedAt).toEqual(new Date('2023-06-01T17:28:21.994Z'))
    expect(result.name).toEqual('String7828124')
    expect(result.title).toEqual('String')
    expect(result.content).toEqual('String')
  })

  scenario('updates a formDefinition', async (scenario) => {
    const original = await formDefinition({
      id: scenario.formDefinition.one.id,
    })
    const result = await updateFormDefinition({
      id: original.id,
      input: { updatedAt: '2023-06-02T17:28:21.994Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2023-06-02T17:28:21.994Z'))
  })

  scenario('deletes a formDefinition', async (scenario) => {
    const original = await deleteFormDefinition({
      id: scenario.formDefinition.one.id,
    })
    const result = await formDefinition({ id: original.id })

    expect(result).toEqual(null)
  })
})

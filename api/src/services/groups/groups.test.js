import { groups, group, createGroup, updateGroup, deleteGroup } from './groups'

describe('groups', () => {
  scenario('returns all groups', async (scenario) => {
    const result = await groups()

    expect(result.length).toEqual(Object.keys(scenario.group).length)
  })

  scenario('returns a single group', async (scenario) => {
    const result = await group({ id: scenario.group.one.cuid })

    expect(result).toEqual(scenario.group.one)
  })

  scenario('creates a group', async () => {
    const result = await createGroup({
      input: {
        updatedAt: '2022-01-15T22:41:51Z',
        name: 'String',
        description: 'String',
      },
    })

    expect(result.updatedAt).toEqual('2022-01-15T22:41:51Z')
    expect(result.name).toEqual('String')
    expect(result.description).toEqual('String')
  })

  scenario('updates a group', async (scenario) => {
    const original = await group({ id: scenario.group.one.cuid })
    const result = await updateGroup({
      id: original.cuid,
      input: { updatedAt: '2022-01-16T22:41:51Z' },
    })

    expect(result.updatedAt).toEqual('2022-01-16T22:41:51Z')
  })

  scenario('deletes a group', async (scenario) => {
    const original = await deleteGroup({ id: scenario.group.one.cuid })
    const result = await group({ id: original.cuid })

    expect(result).toEqual(null)
  })
})

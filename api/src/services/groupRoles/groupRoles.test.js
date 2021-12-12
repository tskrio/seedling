import {
  groupRoles,
  groupRole,
  createGroupRole,
  updateGroupRole,
  deleteGroupRole,
} from './groupRoles'

describe('groupRoles', () => {
  scenario('returns all groupRoles', async (scenario) => {
    const result = await groupRoles()

    expect(result.length).toEqual(Object.keys(scenario.groupRole).length)
  })

  scenario('returns a single groupRole', async (scenario) => {
    const result = await groupRole({ id: scenario.groupRole.one.id })

    expect(result).toEqual(scenario.groupRole.one)
  })

  scenario('creates a groupRole', async (scenario) => {
    const result = await createGroupRole({
      input: {
        updatedAt: '2021-09-08T20:45:01Z',
        role: 'String',
        groupId: scenario.groupRole.two.groupId,
      },
    })

    expect(result.updatedAt).toEqual('2021-09-08T20:45:01Z')
    expect(result.role).toEqual('String')
    expect(result.groupId).toEqual(scenario.groupRole.two.groupId)
  })

  scenario('updates a groupRole', async (scenario) => {
    const original = await groupRole({ id: scenario.groupRole.one.id })
    const result = await updateGroupRole({
      id: original.id,
      input: { updatedAt: '2021-09-09T20:45:01Z' },
    })

    expect(result.updatedAt).toEqual('2021-09-09T20:45:01Z')
  })

  scenario('deletes a groupRole', async (scenario) => {
    const original = await deleteGroupRole({ id: scenario.groupRole.one.id })
    const result = await groupRole({ id: original.id })

    expect(result).toEqual(null)
  })
})

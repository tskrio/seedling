import {
  userRoles,
  userRole,
  createUserRole,
  updateUserRole,
  deleteUserRole,
} from './userRoles'

describe('userRoles', () => {
  scenario('returns all userRoles', async (scenario) => {
    const result = await userRoles()

    expect(result.length).toEqual(Object.keys(scenario.userRole).length)
  })

  scenario('returns a single userRole', async (scenario) => {
    const result = await userRole({ id: scenario.userRole.one.id })

    expect(result).toEqual(scenario.userRole.one)
  })

  scenario('creates a userRole', async (scenario) => {
    const result = await createUserRole({
      input: {
        updatedAt: '2021-09-13T20:32:48Z',
        userId: scenario.userRole.two.userId,
        role: 'taskCreate',
      },
    })

    expect(result.updatedAt).toEqual('2021-09-13T20:32:48Z')
    expect(result.userId).toEqual(scenario.userRole.two.userId)
    expect(result.role).toEqual('taskCreate')
  })

  scenario('updates a userRole', async (scenario) => {
    const original = await userRole({ id: scenario.userRole.one.id })
    const result = await updateUserRole({
      id: original.id,
      input: { updatedAt: '2021-09-14T20:32:48Z' },
    })

    expect(result.updatedAt).toEqual('2021-09-14T20:32:48Z')
  })

  scenario('deletes a userRole', async (scenario) => {
    const original = await deleteUserRole({ id: scenario.userRole.one.id })
    const result = await userRole({ id: original.id })

    expect(result).toEqual(null)
  })
})

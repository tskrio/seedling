import {
  groupMembers,
  groupMember,
  createGroupMember,
  updateGroupMember,
  deleteGroupMember,
} from './groupMembers'

describe('groupMembers', () => {
  scenario('returns all groupMembers', async (scenario) => {
    const result = await groupMembers()

    expect(result.length).toEqual(Object.keys(scenario.groupMember).length)
  })

  scenario('returns a single groupMember', async (scenario) => {
    const result = await groupMember({ id: scenario.groupMember.one.cuid })

    expect(result).toEqual(scenario.groupMember.one)
  })

  scenario('creates a groupMember', async (scenario) => {
    const result = await createGroupMember({
      input: {
        updatedAt: '2022-01-16T02:53:54Z',
        userCuid: scenario.groupMember.two.userCuid,
        groupCuid: scenario.groupMember.two.groupCuid,
      },
    })

    expect(result.updatedAt).toEqual('2022-01-16T02:53:54Z')
    expect(result.userCuid).toEqual(scenario.groupMember.two.userCuid)
    expect(result.groupCuid).toEqual(scenario.groupMember.two.groupCuid)
  })

  scenario('updates a groupMember', async (scenario) => {
    const original = await groupMember({ id: scenario.groupMember.one.cuid })
    const result = await updateGroupMember({
      id: original.cuid,
      input: { updatedAt: '2022-01-17T02:53:54Z' },
    })

    expect(result.updatedAt).toEqual('2022-01-17T02:53:54Z')
  })

  scenario('deletes a groupMember', async (scenario) => {
    const original = await deleteGroupMember({
      id: scenario.groupMember.one.cuid,
    })

    const result = await groupMember({ id: original.cuid })

    expect(result).toEqual(null)
  })
})

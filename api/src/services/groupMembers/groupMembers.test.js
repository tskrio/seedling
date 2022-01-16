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
    const result = await groupMember({ id: scenario.groupMember.one.id })

    expect(result).toEqual(scenario.groupMember.one)
  })

  scenario('creates a groupMember', async (scenario) => {
    const result = await createGroupMember({
      input: {
        updatedAt: '2022-01-16T02:53:54Z',
        userId: scenario.groupMember.two.userId,
        groupId: scenario.groupMember.two.groupId,
      },
    })

    expect(result.updatedAt).toEqual('2022-01-16T02:53:54Z')
    expect(result.userId).toEqual(scenario.groupMember.two.userId)
    expect(result.groupId).toEqual(scenario.groupMember.two.groupId)
  })

  scenario('updates a groupMember', async (scenario) => {
    const original = await groupMember({ id: scenario.groupMember.one.id })
    const result = await updateGroupMember({
      id: original.id,
      input: { updatedAt: '2022-01-17T02:53:54Z' },
    })

    expect(result.updatedAt).toEqual('2022-01-17T02:53:54Z')
  })

  scenario('deletes a groupMember', async (scenario) => {
    const original = await deleteGroupMember({
      id: scenario.groupMember.one.id,
    })

    const result = await groupMember({ id: original.id })

    expect(result).toEqual(null)
  })
})

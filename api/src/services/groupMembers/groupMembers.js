import { db } from 'src/lib/db'
export const groupMembers = async () => {
  let records = await db.groupMember.findMany({})
  return records
}

export const groupMember = async ({ id }) => {
  let current = await db.groupMember.findUnique({
    where: { id },
  })
  return current
}

export const updateGroupMember = async ({ id, input }) => {
  let update = await db.groupMember.update({
    data: input,
    where: { id },
  })
  return update
}

export const createGroupMember = async ({ input }) => {
  let create = await db.groupMember.create({
    data: input,
  })
  return create
}
export const deleteGroupMember = async ({ id }) => {
  let deleteRecord = await db.groupMember.delete({
    where: { id },
  })
  return deleteRecord
}

export const groupMembersByGroup = async (id) => {
  let records = await db.groupMember.findMany({
    where: { group: id },
  })
  let readRecords = records.map((current) => {
    return current
  })
  return readRecords
}

export const groupMembersByUser = async (id) => {
  let records = await db.groupMember.findMany({
    where: { user: id },
  })
  let readRecords = records.map((current) => {
    return current
  })
  return readRecords
}

export const GroupMember = {
  user: (_obj, { root }) =>
    db.groupMember.findUnique({ where: { id: root.id } }).user(),
  group: (_obj, { root }) =>
    db.groupMember.findUnique({ where: { id: root.id } }).group(),
}

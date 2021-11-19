import { db } from 'src/lib/db'

export const groupRoles = async () => {
  let records = await db.groupRole.findMany({})
  return records
}

export const groupRole = async ({ id }) => {
  let current = await db.groupRole.findUnique({
    where: { id },
  })
  return current
}

export const updateGroupRole = async ({ id, input }) => {
  let update = await db.groupRole.update({
    data: input,
    where: { id },
  })
  return update
}

export const createGroupRole = async ({ input }) => {
  let create = await db.groupRole.create({
    data: input,
  })
  return create
}

export const deleteGroupRole = async ({ id }) => {
  let deleteRecord = await db.groupRole.delete({
    where: { id },
  })
  return deleteRecord
}

export const groupRolesByGroup = (id) => {
  return db.groupRole.findMany({
    where: { group: id },
  })
}

export const GroupRole = {
  group: (_obj, { root }) =>
    db.groupRole.findUnique({ where: { id: root.id } }).group(),
}

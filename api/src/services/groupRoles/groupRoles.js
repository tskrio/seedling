import { db } from 'src/lib/db'
//import { requireAuth } from 'src/lib/auth'

export const groupRoles = () => {
  return db.groupRole.findMany()
}

export const groupRolesByGroup = (id) => {
  console.log('groupRolesByGroup', id)
  return db.groupRole.findMany({
    where: { group: id },
  })
}

export const groupRole = ({ id }) => {
  return db.groupRole.findUnique({
    where: { id },
  })
}

export const createGroupRole = ({ input }) => {
  return db.groupRole.create({
    data: input,
  })
}

export const updateGroupRole = ({ id, input }) => {
  return db.groupRole.update({
    data: input,
    where: { id },
  })
}

export const deleteGroupRole = ({ id }) => {
  return db.groupRole.delete({
    where: { id },
  })
}

export const GroupRole = {
  group: (_obj, { root }) =>
    db.groupRole.findUnique({ where: { id: root.id } }).group(),
}

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  // create
  rules.add(() => requireAuth({ role: ['admin', 'groupMemberCreate'] }), {
    only: ['createGroupMember'],
  })
  // read
  rules.add(() => requireAuth({ role: ['admin', 'groupMemberRead'] }), {
    only: ['groupMembers', 'groupMembersByGroup', 'groupMember'],
  })
  // update
  rules.add(() => requireAuth({ role: ['admin', 'groupMemberUpdate'] }), {
    only: ['updateGroupMember'],
  })
  // delete
  rules.add(() => requireAuth({ role: ['admin', 'groupMemberDelete'] }), {
    only: ['deleteGroupMember'],
  })
}

export const groupMembers = () => {
  return db.groupMember.findMany({
    /*include: {
      GroupRole: true
    }*/
  })
}

export const groupMembersByGroup = (id) => {
  console.log('groupMembersByGroup', id)
  return db.groupMember.findMany({
    where: { group: id },
  })
}

export const groupMember = ({ id }) => {
  return db.groupMember.findUnique({
    where: { id },
  })
}

export const createGroupMember = ({ input }) => {
  return db.groupMember.create({
    data: input,
  })
}

export const updateGroupMember = ({ id, input }) => {
  return db.groupMember.update({
    data: input,
    where: { id },
  })
}

export const deleteGroupMember = ({ id }) => {
  return db.groupMember.delete({
    where: { id },
  })
}

export const GroupMember = {
  user: (_obj, { root }) =>
    db.groupMember.findUnique({ where: { id: root.id } }).user(),
  group: (_obj, { root }) =>
    db.groupMember.findUnique({ where: { id: root.id } }).group(),
}

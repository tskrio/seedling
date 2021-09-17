import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  // create
  rules.add(() => requireAuth({ role: ['admin', 'groupCreate'] }), {
    only: ['createGroup'],
  })
  // read
  rules.add(() => requireAuth({ role: ['admin', 'groupRead'] }), {
    only: ['groups', 'group'],
  })
  // update
  rules.add(() => requireAuth({ role: ['admin', 'groupUpdate'] }), {
    only: ['updateGroup'],
  })
  // delete
  rules.add(() => requireAuth({ role: ['admin', 'groupDelete'] }), {
    only: ['deleteGroup'],
  })
}

export const groups = () => {
  return db.group.findMany({
    include: {
      GroupRole: true,
      GroupMember: true,
    },
  })
}

export const group = ({ id }) => {
  return db.group.findUnique({
    where: { id },
    include: {
      GroupRole: true,
      GroupMember: true,
    },
  })
}

export const createGroup = ({ input }) => {
  return db.group.create({
    data: input,
  })
}

export const updateGroup = ({ id, input }) => {
  return db.group.update({
    data: input,
    where: { id },
  })
}

export const deleteGroup = ({ id }) => {
  return db.group.delete({
    where: { id },
  })
}

export const Group = {
  GroupMember: (_obj, { root }) =>
    db.group.findUnique({ where: { id: root.id } }).GroupMember(),
}

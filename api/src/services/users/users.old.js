/*import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  // create
  rules.add(() => requireAuth({ role: ['admin', 'userCreate'] }), {
    only: ['createUser'],
  })
  // read
  rules.add(() => requireAuth({ role: ['admin', 'userRead'] }), {
    only: ['users', 'user'],
  })
  // update
  rules.add(() => requireAuth({ role: ['admin', 'userUpdate'] }), {
    only: ['updateUser'],
  })
  // delete
  rules.add(() => requireAuth({ role: ['admin', 'userDelete'] }), {
    only: ['deleteUser'],
  })
}

export const users = () => {
  return db.user.findMany({
    //include: {
    //UserRole: true,
    //GroupMember: true,
    //},
  })
}

export const user = async ({ id }) => {
  let user = await db.user.findUnique({
    where: { id },
    include: {
      UserRole: true,
    },
  })
  console.log('user', user)
  return user
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = async ({ id, input }) => {
  console.log('in update user JHJJJJAJJAJAJAJAJAJJAJAJAJAJJAJAJAJ')
  return await db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  UserRole: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).UserRole(),
  GroupMember: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).GroupMember(),
}
*/

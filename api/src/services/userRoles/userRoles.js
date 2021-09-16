import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const userRoles = () => {
  return db.userRole.findMany()
}

export const userRolesForUser = (userId) => {
  return db.userRole.findMany({
    where: userId,
  })
}

export const userRole = ({ id }) => {
  return db.userRole.findUnique({
    where: { id },
  })
}

export const createUserRole = ({ input }) => {
  return db.userRole.create({
    data: input,
  })
}

export const updateUserRole = ({ id, input }) => {
  return db.userRole.update({
    data: input,
    where: { id },
  })
}

export const deleteUserRole = ({ id }) => {
  return db.userRole.delete({
    where: { id },
  })
}

export const UserRole = {
  user: (_obj, { root }) =>
    db.userRole.findUnique({ where: { id: root.id } }).user(),
}

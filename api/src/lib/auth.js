import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'
import { db } from './db'
import { logger } from './logger'

// The session object sent in as the first argument to getCurrentUser() will
// have a single key `id` containing the unique ID of the logged in user
// (whatever field you set as `authFields.id` in your auth function config).
// You'll need to update the call to `db` below if you use a different model
// name or unique field name:
//
//   return await db.profile.findUnique({ where: { email: session.id } })
//                   ───┬───                       ──┬──
//      model accessor ─┘      unique id field name ─┘

export const getCurrentUser = async (session) => {
  try {
    // look up the user by the session id
    let foundUser = await db.user.findUnique({ where: { id: session.id } })
    // look up the group memberships of the user
    let foundGroups = await db.groupMember.findMany({
      where: { userId: session.id },
    })
    // look up the roles of the groups the user is a member of
    let foundGroupRoles = await db.groupRole.findMany({
      where: {
        groupId: { in: foundGroups.map((group) => group.groupId) },
      },
    })
    // assign the roles to the user
    let roles = foundGroupRoles.map((groupRole) => groupRole.role)
    let returnUser = {
      roles,
      ...foundUser,
    }
    //console.log('returnUser', returnUser)
    return returnUser
    //return session/*returnUser*/
  } catch (error) {
    return error
  }
}

export const requireAuth = ({ role }) => {
  logger.debug('in /lib/auth.js role', role)
  console.log('in /lib/auth.js role', role)
  logger.debug(context.currentUser.roles)

  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (typeof role !== 'undefined' && !context.currentUser.roles?.includes(role)) {
    throw new ForbiddenError("You don't have access to do that.")
  }



}

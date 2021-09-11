import { AuthenticationError, ForbiddenError } from '@redwoodjs/api'
import { db } from './db'

// The session object sent in as the first arugment to getCurrentUser() will
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
    //console.log('in /api/src/lib/auth.js', session)
    let foundUser = await db.user.findUnique({ where: { id: session.id } })
    /*
    let foundGroups = await db.group.findMany({
      include: {
        GroupRole: true,
        GroupMember: true
      }
    });
    */
    //console.log('getCurrentUser foundUser', foundUser)
    //console.log('getCurrentUser foundGroups', foundGroups)
    // TODO: Look up groups for the user
    // TODO: Look up roles for the groups
    // TODO: Put that stuff in the returnUser object
    let returnUser = {
      ...foundUser,
      groupRoles: ['admin'], //hard coded for now
    }
    //console.log('returnUser', returnUser)
    return returnUser
    //return session/*returnUser*/
  } catch (error) {
    return error
  }
}

export const requireAuth = ({ role } = {}) => {
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (
    typeof role !== 'undefined' &&
    typeof role === 'string' &&
    !context.currentUser.roles?.includes(role)
  ) {
    throw new ForbiddenError("You don't have access to do that.")
  }

  if (
    typeof role !== 'undefined' &&
    Array.isArray(role) &&
    !context.currentUser.roles?.some((r) => role.includes(r))
  ) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}

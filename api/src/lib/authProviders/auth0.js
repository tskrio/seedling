import { db } from '../db.js'
import {
  AuthenticationError /*, ForbiddenError*/,
} from '@redwoodjs/graphql-server'
export const getUser = async (
  session /*, { token, type, event, context }*/
) => {
  // let debugObj = {
  //   session,
  //   token,
  //   type,
  //   event,
  //   context,
  // }
  //console.table(debugObj)
  //return debugObj
  try {
    // look up the user by the session id
    //let foundUser = await db.user.findUnique({
    //let email = session?.['https://auth0.tskr.io/email']
    let name = session?.['https://auth0.tskr.io/name']
    let foundUser = await db.user.findFirst({
      //where: { id: session.id },//dbAuth
      where: { username: session.sub },
      select: { id: true, name: true },
    })
    if (!foundUser) {
      // no user found... I guess make one.
      // is the user already has an account... with the email
      // e.g. they used google to auth once
      // then they logged in w/email for google
      // that would be two different auth0 accounts
      // in that case this will error and it doesn't look good
      // TODO: HANDLE THIS WEIRD ERROR
      try {
        foundUser = await db.user.create({
          data: {
            name: name,
            username: session?.sub,
          },
          select: { id: true, name: true },
        })
      } catch (error) {
        throw new AuthenticationError('There was a problem logging in.')
      }
      //return debugObj
    }
    // look up the group memberships of the user
    let foundGroups = await db.groupMember.findMany({
      where: { userId: foundUser.id },
    })
    // look up the roles of the groups the user is a member of
    let foundGroupRoles = await db.groupRole.findMany({
      where: {
        groupId: { in: foundGroups.map((group) => group.groupId) },
      },
    })
    // assign the roles to the user
    let roles = foundGroupRoles.map((groupRole) => groupRole.role)
    // get user's preferences and store them as part of the user
    let foundPreferences = await db.preference.findMany({
      where: { userId: foundUser.id },
    })
    let preferences = {}
    foundPreferences.forEach((preference) => {
      preferences[preference.entity] = preference.value
    })
    if (!preferences.language) {
      preferences.language = 'en'
    }
    let foundMessages = await db.message.findMany({
      where: { language: preferences.language },
    })
    let messages = {}
    foundMessages.forEach((message) => {
      messages[message.entity] = message.value
    })
    let returnUser = {
      roles,
      ...foundUser,
      preferences,
      messages,
      session,
    }
    return returnUser
  } catch (error) {
    return error
  }
}

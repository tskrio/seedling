import { DbAuthHandler } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
//import { executeAfterCreateRules, executeAfterUpdateRules, executeBeforeCreateRules } from 'src/lib/rules'
import { createUser /*, updateUser*/ } from 'src/services/users/users'
export const handler = async (event, context) => {
  const forgotPasswordOptions = {
    handler: async (user) => {
      logger.info(
        `${user.username} forgot password /reset-password?resetToken=${user.resetToken}`
      )
      if (user.email === '') throw 'No email on file'
      if (user.verified === null) throw 'Email not verified'
      //await executeAfterUpdateRules('user', { record: user })
      return user
    },
    expires: 60 * 60 * 24,
    errors: {
      usernameNotFound: 'Username not found',
      usernameRequired: 'Username is required',
    },
  }
  const loginOptions = {
    // login.handler() is called after finding the user that matches the
    // username/password provided at login, but before actually considering them
    // logged in. The `user` argument will be the user in the database that
    // matched the username/password.
    //
    // If you want to allow this user to log in simply return the user.
    //
    // If you want to prevent someone logging in for another reason (maybe they
    // didn't validate their email yet), throw an error and it will be returned
    // by the `logIn()` function from `useAuth()` in the form of:
    // `{ message: 'Error message' }`
    handler: (user) => {
      return user
    },

    errors: {
      usernameOrPasswordMissing: 'Both username and password are required',
      //usernameNotFound: 'Username ${username} not found',
      usernameNotFound: 'Incorrect username or password.',
      // For security reasons you may want to make this the same as the
      // usernameNotFound error so that a malicious user can't use the error
      // to narrow down if it's the username or password that's incorrect
      // incorrectPassword: 'Incorrect password for ${username}',
      incorrectPassword: 'Incorrect username or password.',
    },

    // How long a user will remain logged in, in seconds
    // expires: 60 * 60 * 24 * 365 * 10, // 10 years
    expires: 60 * 60 * 8, // 8 hour
  }
  const resetPasswordOptions = {
    handler: (/*user*/) => {
      return true
    },
    allowReusedPassword: true,
    errors: {
      resetTokenExpired: 'resetToken is expired',
      resetTokenInvalid: 'resetToken is invalid',
      resetTokenRequired: 'resetToken is required',
      reusedPassword: 'Must choose a new password',
    },
  }
  const signupOptions = {
    // Whatever you want to happen to your data on new user signup. Redwood will
    // check for duplicate usernames before calling this handler. At a minimum
    // you need to save the `username`, `hashedPassword` and `salt` to your
    // user table. `userAttributes` contains any additional object members that
    // were included in the object given to the `signUp()` function you got
    // from `useAuth()`.
    //
    // If you want the user to be immediately logged in, return the user that
    // was created.
    //
    // If this handler throws an error, it will be returned by the `signUp()`
    // function in the form of: `{ error: 'Error message' }`.
    //
    // If this returns anything else, it will be returned by the
    // `signUp()` function in the form of: `{ message: 'String here' }`.
    handler: async ({ username, hashedPassword, salt, userAttributes }) => {
      //let user = await db.user.create({
      //  data: {
      //    email: username,
      //    hashedPassword: hashedPassword,
      //    salt: salt,
      //    name: userAttributes.name,
      //  },
      //})
      return await createUser({
        input: {
          username: username,
          hashedPassword: hashedPassword,
          salt: salt,
          name: userAttributes.name,
          email: userAttributes.email,
          // skipPassword: true,
        },
      })
      //return modifiedUser.record
    },

    errors: {
      // `field` will be either "username" or "password"
      fieldMissing: '${field} is required',
      usernameTaken: '`${username}` already in use',
    },
  }

  const authHandler = new DbAuthHandler(event, context, {
    // Provide prisma db client
    db: db,

    // The name of the property you'd call on `db` to access your user table.
    // ie. if your Prisma model is named `User` this value would be `user`, as in `db.user`
    authModelAccessor: 'user',

    // A map of what dbAuth calls a field to what your database calls it.
    // `id` is whatever column you use to uniquely identify a user (probably
    // something like `id` or `userId` or even `email`)
    authFields: {
      id: 'id',
      username: 'username',
      hashedPassword: 'hashedPassword',
      salt: 'salt',
      resetToken: 'resetToken',
      resetTokenExpiresAt: 'resetTokenExpiresAt',
    },

    forgotPassword: forgotPasswordOptions,
    login: loginOptions,
    resetPassword: resetPasswordOptions,
    signup: signupOptions,
  })

  return await authHandler.invoke()
}

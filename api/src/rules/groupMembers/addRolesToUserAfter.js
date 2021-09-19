/**
//import * as util from 'src/lib/util'// How to call reusable code across rules
//import { db } from 'src/lib/db'// Needed to do other CRUDs on other tables
 * Properties available to command function
| DB Action | When   | First Param                    | Second Param         |
| --------- | ------ | ------------------------------ | -------------------- |
| Create    | Before | Form input                     | `null`               |
| Create    | After  | Created record with references | `null`               |
| Read      | *      | `null`                         | `null`               |
| Update    | Before | Form input                     | Record before update |
| Update    | After  | Record after update            | Record before update |
| Delete    | Before | Record to be deleted           | `null`               |
| Delete    | After  | Record deleted                 | `null`               |
 * active dictates if this rule will run
 * order dictates the order in the list of rules this will run
 * title is used for log statements
 * when is an array of when this rule can run expects 'before', or 'after'
 * type is an array of the type of db action this runs on epxects, 'create', 'read', 'update', or 'delete'
 * file is for debugging
 * If title,order,when,type,command,active,file are missing rule will not run
 */
import { db } from 'src/lib/db' // Needed to do other CRUDs on other tables
import { logger } from 'src/lib/logger'
module.exports = {
  command: async function (current /*previous*/) {
    try {
      console.log('current', current)
      // get the groups related roles
      const roles = await db.groupRole.findMany({
        where: {
          groupId: current.groupId,
        },
      })
      console.log('roles', roles)
      const userRoles = await db.userRole.findMany({
        where: {
          userId: current.userId,
          //role: role.role,
        },
      })
      console.log('users current roles', userRoles)
      // create user role for each group role
      for (const role of roles) {
        let roleInput = {
          userId: current.userId,
          role: role.role,
        }
        // TODO: check if user role already exists
        // if not create it
        await db.userRole.create({
          data: roleInput,
        })
      }
      console.log('in rule from groupmember table')
    } catch (e) {
      logger.error(e)
    }
  },
  active: true,
  order: 10,
  title: 'Give user roles',
  when: ['after'],
  type: ['create'],
  file: __filename,
}

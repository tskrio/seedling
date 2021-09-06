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
//import { db } from 'src/lib/db' // Needed to do other CRUDs on other tables
import { logger } from 'src/lib/logger'
module.exports = {
  command: async function (current, previous) {
    try {
      console.log('logonusercrud.js', current, previous)
    } catch (e) {
      logger.error(e)
    }
  },
  active: true,
  order: 10,
  title: 'test cu when: after',
  when: ['after'],
  type: ['create', 'update'],
  file: __filename,
}

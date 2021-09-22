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
 * type is an array of the type of db action this runs on expects, 'create', 'read', 'update', or 'delete'
 * file is for debugging
 * If title,order,when,type,command,active,file are missing rule will not run
 */
//import { db } from 'src/lib/db' // Needed to do other CRUDs on other tables
import { logger } from 'src/lib/logger'
import CryptoJS from 'crypto-js'
module.exports = {
  command: async function (current, previous) {
    try {
      if (current.salt == '') {
        // If salt is already set, don't rehash
        current.salt = (Math.random() + 1).toString(36).substring(30)
      }
      if (current.hashedPassword === '') {
        //disallow deleting the password
        current.hashedPassword = previous.hashedPassword
      } else {
        //legit password change
        if (current.hashedPassword !== previous.hashedPassword) {
          let encryptedPassword = CryptoJS.PBKDF2(
            current?.hashedPassword,
            current?.salt,
            {
              keySize: 256 / 32,
            }
          ).toString()

          current.hashedPassword = encryptedPassword
        }
      }
    } catch (e) {
      logger.error(e)
    }
  },
  active: true,
  order: 10,
  title: 'update password and salt if changed',
  when: ['before'],
  type: ['update'],
  file: __filename,
}

import CryptoJS from 'crypto-js'

import { logger } from 'src/lib/logger'
function randomString(len, charSet) {
  charSet =
    charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var randomString = ''
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length)
    randomString += charSet.substring(randomPoz, randomPoz + 1)
  }
  return randomString
}
module.exports = {
  active: true,
  order: 10,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'user',
  file: __filename,
  command: async function ({ data, status }) {
    try {
      //if we're using auth0 exit
      if (process.env.AUTH0_DOMAIN) {
        return { data, status }
      }

      //if were given a password, we make a new salt, hash it and set both salt and hash
      if (data?.skipPassword) {
        // if user is signing up, encryption has already been done
        delete data.skipPassword
        return await { data, status }
      }
      let hashedPassword = data?.hashedPassword
      if (hashedPassword) {
        let salt = randomString(30)
        data.salt = salt.toString()
        let encryptedPassword = CryptoJS.PBKDF2(hashedPassword, salt, {
          keySize: 256 / 32,
        }).toString()
        data.hashedPassword = encryptedPassword
      } else {
        //hashpassword is empty.. lets not set this.
        delete data?.skipPassword
        delete data.hashedPassword
      }
    } catch (e) {
      logger.error(e)
    }
    return await { data, status }
  },
}

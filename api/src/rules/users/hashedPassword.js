import { logger } from 'src/lib/logger'
import CryptoJS from 'crypto-js'
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
  command: async function (incomingData) {
    try {
      //if were given a password, we make a new salt, hash it and set both salt and hash
      let hashedPassword = incomingData?.hashedPassword;
      if (hashedPassword) {
          let salt = randomString(30)
          incomingData.salt = salt.toString()
          let encryptedPassword = CryptoJS.PBKDF2(hashedPassword, salt, {
            keySize: 256 / 32,
          }).toString()
          incomingData.hashedPassword = encryptedPassword
      } else {
          //hashpassword is empty.. lets not set this.
          delete incomingData.hashedPassword
      }
    } catch (e) {
      logger.error(e)
    }
    return await incomingData
  },
  active: true,
  order: 10,
  title: 'hash password on update',
  when: ['before'],
  type: ['update', 'create'],
  name: 'hashpassword',
  file: __filename,
}

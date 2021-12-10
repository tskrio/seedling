import { logger } from 'src/lib/logger'
import { apiProperties } from 'src/lib/apiProperties'
let Mailgun = require('mailgun-js')
module.exports = {
  active: true,
  order: 100,
  when: ['after'],
  operation: ['update'],
  file: __filename,
  table: 'user',
  command: async function ({ record }) {
    try {
      if (
        process.env.MAILGUN_API_KEY &&
        process.env.MAILGUN_DOMAIN &&
        apiProperties.email.active &&
        record.email.includes('@example.com') === false &&
        record.resetToken &&
        new Date(record.resetTokenExpiresAt) > new Date()
      ) {
        let mailgun = new Mailgun({
          apiKey: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN,
        })
        let email = record.email
        let name = record.name
        let html = `<h1>Reset your password</h1>
        <p>${name} --- need to update your password?  Click the link below.</p>
        <p><a href="https://demo.tskr.io/reset-password?resetToken=${record.resetToken}">Reset my password</a></p>`
        let mail = {
          from: `Tskr <jace@${process.env.MAILGUN_DOMAIN}>`,
          'h:Reply-To': 'jace@tskr.io', //not working
          to: email,
          subject: `Your password reset link`,
          html: html,
        }
        mailgun.messages().send(mail, function (error, body) {
          if (error) {
            logger.error(error)
          } else {
            logger.info(body)
            console.log('mailgun.message().send()', body)
          }
        })
      } else {
        logger.error(
          `
          mail not sent
          - apiProperties.email.action=${apiProperties.email.active}
          - record.email.indexOf('@example.com') == -1 ${
            record.email.indexOf('@example.com') == -1
          }
          `
        )
      }
    } catch (e) {
      logger.error(e)
    }
    return await { record }
  },
}

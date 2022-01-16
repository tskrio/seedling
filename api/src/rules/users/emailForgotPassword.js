import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'
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
      // don't send email to @example.com
      if (record.email.includes('@example.com')) return { record }
      let activeProperty = await db.property.findFirst({
        where: { entity: 'email' },
      })
      if (activeProperty.value !== 'active') return { record }
      let apiKey = await db.property.findFirst({
        where: { entity: 'MAILGUN_API_KEY' },
      })
      apiKey = apiKey.value
      let domain = await db.property.findFirst({
        where: { entity: 'MAILGUN_DOMAIN' },
      })
      domain = domain.value
      if (!record.resetToken) return { record }
      if (new Date(record.resetTokenExpiresAt) < new Date()) return { record }
      let mailgun = new Mailgun({ apiKey, domain })
      let email = record.email
      let name = record.name
      let html = `<h1>Reset your password</h1>
        <p>${name} --- need to update your password?  Click the link below.</p>
        <p><a href="https://${domain}/reset-password?resetToken=${record.resetToken}">Reset my password</a></p>`
      let mail = {
        from: `Tskr <jace@${domain}>`,
        'h:Reply-To': 'jace@tskr.io', //not working
        to: email,
        subject: `Your password reset link`,
        html: html,
      }
      mailgun.messages().send(mail, function (error, body) {
        if (error) {
          logger.error(error)
        } else {
          logger.info(`mailgun.message().send() ${body}`)
        }
      })
    } catch (e) {
      logger.error(e)
    }
    return await { record }
  },
}

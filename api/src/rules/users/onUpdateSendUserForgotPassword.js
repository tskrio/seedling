import { logger } from 'src/lib/logger'
import { email } from 'src/lib/email'
import { render } from 'src/emails/forgotpassword.mjml.js'
module.exports = {
  active: true,
  order: 100,
  when: ['after'],
  operation: ['update'],
  file: __filename,
  table: 'user',
  command: async function ({ record }) {
    try {
      if (!record.resetToken) return { record }
      if (record.email === '') {
        // if record is blank, log the link for debugging
        // we dont have an email, so i guess, we can't recover teh account
        console.log(
          `${record.username} does not have an email, here's thelink for the password reset
          https://${client.domain}/reset-password?resetToken=${record.resetToken}`
        )
      }
      if (new Date(record.resetTokenExpiresAt) < new Date()) return { record }
      let to = record.email
      let name = record.name
      let client = await email({ provider: 'mailgun' })
      let code = record.resetToken
      let resetLink = `https://${client.domain}/reset-password?resetToken=${record.resetToken}`

      let rendered = render({ name, code, resetLink })
      await client.send(
        {
          to: to,
          from: `Tskr <jace@${client.domain}>`,
          'h:Reply-To': `jace@$tskr.io`, //not working
          subject: `Your password reset code`,
          html: rendered.html,
        },
        (error, body) => {
          if (error) logger.error(error)
          logger.info(body)
        }
      )
    } catch (e) {
      logger.error(e)
    }
    return await { record }
  },
}

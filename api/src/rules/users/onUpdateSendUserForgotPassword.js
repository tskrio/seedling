import { render } from 'src/emails/forgotpassword.mjml.js'
import { email } from 'src/lib/email'
import { logger } from 'src/lib/logger'
import { getProperty, log } from 'src/lib/util'
module.exports = {
  active: true,
  order: 100,
  when: ['after'],
  operation: ['update'],
  file: __filename,
  table: 'user',
  command: async function ({ data }) {
    try {
      if (!data.resetToken) return { data }
      if (new Date(data.resetTokenExpiresAt) < new Date()) return { data }
      let to = data.email
      let name = data.name
      let client = await email({ provider: 'mailgun' })
      let code = data.resetToken
      let resetLink = `https://${client.domain}/reset-password?resetToken=${data.resetToken}`
      let brand = (await getProperty('brand')) || 'Undefined'
      if (data.email === '') {
        // if data is blank, log the link for debugging
        // we dont have an email, so i guess, we can't recover teh account
        console.log(
          `${data.username} does not have an email, here's the password reset
          ${resetLink}`
        )
      }
      let rendered = render({ name, code, resetLink, brand })
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
      log(e.message)
    }
    return await { data }
  },
}

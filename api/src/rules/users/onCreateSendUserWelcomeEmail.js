import { logger } from 'src/lib/logger'
import { email } from 'src/lib/email'
import { render } from 'src/emails/welcomeemail.mjml.js'
module.exports = {
  active: true,
  order: 100,
  when: ['after'],
  operation: ['create'],
  file: __filename,
  table: 'user',
  command: async function ({ record }) {
    try {
      let rendered = render({ name: record.name })
      let client = await email({ provider: 'mailgun' })
      await client.send(
        {
          to: record.email,
          from: `Tskr <jace@${client.domain}>`,
          'h:Reply-To': `jace@$tskr.io`, //not working
          subject: `Welcome to Tskr`,
          html: rendered.html,
        },
        (error, body) => {
          if (error) console.log(error)
          console.log(body)
        }
      )
    } catch (e) {
      logger.error(e)
    }
    return await { record }
  },
}

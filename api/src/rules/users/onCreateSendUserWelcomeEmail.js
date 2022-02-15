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
  command: async function ({ data }) {
    console.log('data')
    try {
      let rendered = render({ name: data.name })
      let client = await email({ provider: 'mailgun' })
      if (!client.error) {
        await client?.send(
          {
            to: data.email,
            from: `Tskr <jace@${client.domain}>`,
            'h:Reply-To': `jace@$tskr.io`, //not working
            subject: `Welcome to Tskr`,
            html: rendered.html,
          },
          (error, body) => {
            if (error) logger.error(error)
            logger.info(body)
          }
        )
      }
      if (client.error) {
        logger.error(`${client.error}`)
      }
    } catch (e) {
      logger.error(e)
    }
    return await { data }
  },
}

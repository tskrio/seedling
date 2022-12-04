import { render } from 'src/emails/welcomeemail.mjml.js'
import { email } from 'src/lib/email'
import { logger } from 'src/lib/logger'
import { getProperty } from 'src/lib/util'
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
      let brand = (await getProperty('brand')) || 'Undefined'
      let domain = (await getProperty('domain')) || 'https://example.com'
      let rendered = render({
        name: data.name,
        loginUrl: `${domain}/login`,
        brand,
        welcomeImageUrl: `${domain}/jace.jpeg`,
      })
      let client = await email({ provider: 'mailgun' })
      if (!client.error) {
        await client?.send(
          {
            to: data.email,
            from: `${brand} <jace@${client.domain}>`,
            'h:Reply-To': `jace@$tskr.io`, //not working
            subject: `Welcome to ${brand}`,
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

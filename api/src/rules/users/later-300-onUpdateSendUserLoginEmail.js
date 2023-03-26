import { render } from 'src/emails/loginEmail.mjml.js'
import { email } from 'src/lib/email'
import { logger } from 'src/lib/logger'
import { getProperty, log } from 'src/lib/util'
module.exports = {
  active: true,
  order: 100,
  when: ['before'],
  operation: ['update'],
  file: __filename || 'onUpdateSendUserLoginEmail',
  table: 'user',
  command: async function ({ data, status }) {
    try {
      // we only want to trigger this if the loginExpiresAt is in the future
      // and if the salt changes (which means the password changed)
      // we set the salt to null when they login without triggering this rule
      // so when they login, we set the salt to a random string
      console.log({ function: 'onUpdateSendUserLoginEmail', data, status })
      console.log({
        function: 'onUpdateSendUserLoginEmail',
        typeofUnencryptedToken: typeof data._unencryptedToken,
        data,
      })
      if (typeof data._unencryptedToken !== 'string') return { data, status }
      // now we need to send the email
      // but first we need to base64 encode the username and password
      let code = data._unencryptedToken
      let encoded = Buffer.from(`${data._email}:${code}`).toString('base64')
      let client = await email({ provider: 'mailgun' })
      let brand = (await getProperty('brand')) || 'ScribeMonster'
      let domain = (await getProperty('domain')) || 'https://example.com'
      let loginLink = `${domain}/login?magic=${encoded}`
      let rendered = render({ code, loginLink, brand })
      let to = data._email
      let from = `${brand} <jace@${client.domain}>`
      let subject = `${code} - Your ${brand} Login Code`
      let html = rendered.html
      console.log({
        function: 'onUpdateSendUserLoginEmail',
        to,
        from,
        subject,
        loginLink,
      })

      if (client.error) {
        logger.error(client.error)
        console.log({ function: 'onUpdateSendUserLoginEmail', client })
      }
      if (!client.error) {
        let message = await client.send(
          { to, from, subject, html },
          (error, body) => {
            if (error) logger.error(error)
            logger.info(body)
            console.log({ function: 'onUpdateSendUserLoginEmail', body })
          }
        )
        console.log({ function: 'onUpdateSendUserLoginEmail', message })
      }
      delete data._email
      delete data._unencryptedToken
    } catch (e) {
      logger.error(e)
      log(e.message)
    }
    return await { data, status }
  },
}

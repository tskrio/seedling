import { getProperty } from 'src/lib/util'

let Mailgun = require('mailgun-js')

export const email = async ({ provider }) => {
  let activeProperty = await getProperty('email')
  if (activeProperty !== 'active')
    return { error: `Email is ${activeProperty} not active` }
  if (provider === 'mailgun') {
    let apiKey = await getProperty('MAILGUN_API_KEY')
    let domain = await getProperty('MAILGUN_DOMAIN')
    if (!apiKey) return { error: 'MAILGUN_API_KEY not set' }
    if (!domain) return { error: 'MAILGUN_DOMAIN not set' }
    let client = new Mailgun({ apiKey, domain })
    let send = async (mail, callback) => {
      // if email is to example, don't send
      if (mail?.to?.includes('@example.com'))
        return { error: 'Email contains @example.com' }
      if (!mail.from) {
        return { error: 'No From specified in message' }
      }
      // return send function
      return client.messages().send(mail, callback())
    }
    return { client, send, domain }
  }

  //  if (provider === 'mailchimp') {
  // https://mailchimp.com/developer/transactional/guides/send-first-email/
  //  }
  //  if (provider === 'mailjet') {
  // https://dev.mailjet.com/email/guides/send-api-V3/
  //  }
  //  if (provider === 'sendinblue') {
  // https://developers.sendinblue.com/docs/send-a-transactional-email
  //  }
  //  if (provider === 'sendgrid') {
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // const msg = {
  //   to: 'test@example.com',
  //   from: 'test@example.com',
  //   subject: 'Sending with Twilio SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // };
  // sgMail.send(msg);
  //  }
  //  if (provider === 'constantcontact') {
  // no api to send these?
  //  }
  //  if (provider === 'amazonses') {
  // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/ses-examples-sending-email.html
  //  }
  //  if (client) return client
  return { error: 'provider set up' }
}

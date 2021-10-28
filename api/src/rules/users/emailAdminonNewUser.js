import { logger } from 'src/lib/logger'
//import { Mailgun } from 'mailgun-js'
let Mailgun = require('mailgun-js')
module.exports = {
  command: async function (incomingData) {
    try {
      if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
        let mailgun = new Mailgun({
          apiKey: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN,
        })
        let email = incomingData.email
        let name = incomingData.name
        let html = `<h1>Welcome ${name}</h1>
<p>I am thrilled that you're here. You’ll love automating your work with Tskr. </p>
<p>TskrBase was designed to get you tracking your stuff quickly in a way where it's your data end to end.</p>
<p>One question before I go: reply to this email and let me know why you signed up? </p>
<p>Thanks,<br/>
Jace</p>


<p>Are you interested in contributing?</p>
<hr />
<p>Shoot me a response and I'll help however I can.  If you'd rather jump into here's some links.</p>
<ul>
  <li><a href="https://github.com/tskrio/tskrBase/issues/new?body=%0A%0A%0A---%0AI%27m+a+human.+Please+be+nice.">Give us feedback</a></li>
  <li><a href="https://github.com/tskrio/tskrBase/">Contribute to the codebase</a></li>
  <li><a href="https://github.com/tskrio/docs/">Contribute to the documentation</a></li>
  <li><a href="https://github.com/tskrio/tskrBase/issues/new?body=%0A%0A%0A---%0AI%27m+a+human.+Please+be+nice.">Contribute to the design</a></li>
</ul>

      If you'd like to poke around the site you can do so at <a href="https://tskrbase.tskr.io">tskrbase.tskr.io</a>
      `
        let mail = {
          from: `Tskr <jace@${process.env.MAILGUN_DOMAIN}>`,
          to: email,
          subject: `${email} just made an account!`,
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
        logger.error('MAILGUN_API_KEY or MAILGUN_DOMAIN not set')
      }
    } catch (e) {
      logger.error(e)
    }
    return await incomingData
  },
  active: true,
  order: 100,
  title: 'Email User about their account',
  when: ['after'],
  type: ['create'],
  name: __filename,
  file: __filename,
}

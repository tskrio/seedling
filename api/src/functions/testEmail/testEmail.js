import { logger } from 'src/lib/logger'
import { email } from 'src/lib/email'
import { render } from 'src/emails/welcomeemail.mjml.js'
/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event, context) => {
  logger.info('Invoked testEmail function')
  let client = await email({ provider: 'mailgun' })
  let rendered = render({ name: 'JaceText' })
  // let message = await client.send(
  //   {
  //     to: 'jace@benson.run',
  //     from: `jace@${client.domain}`,
  //     subject: `Test Email ${new Date().toISOString()}`,
  //     html: rendered.html,
  //   },
  //   (error, body) => {
  //     if (error) console.log(error)
  //     console.log(body)
  //   }
  // )
  return {
    statusCode: 200,
    //headers: {
    //  'Content-Type': 'application/json',
    //},
    //body: JSON.stringify({
    //  html,
    //}),
    body: rendered.html,
  }
}

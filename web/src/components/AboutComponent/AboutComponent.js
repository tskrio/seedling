//import './AboutComponent.css'
import styles from './AboutComponent.module.css'
const AboutComponent = () => {
  let altText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'
  return (
    <>
      <h1 alt={altText}>What is Tskr</h1>
      <p className={styles.p}>
        Tskr is a open source, task and asset tracking application built on
        <a href="https://redwoodjs.com">RedwoodJS</a>. Imagine a low-cost task
        and asset tracking system where you define complex rules to execute the
        business needs you have — that&apos;s Tskr. We are an opinionated
        system. We make the decisions so you don&apos;t have to.
      </p>
      <h2>What Tskr is built on</h2>
      <ul>
        <li>RedwoodJS (React, Prisma, GraphQL, and Postgres)</li>
        <li>Simple Role Based Access Control managed within Tskr</li>
        <li>Code is code here. No code found in our database.</li>
      </ul>
      <h2>Features</h2>
      <ul>
        <li>
          <p>
            Simple Role Based Access. What does that mean? There&apos;s a lot of
            places you have to secure to ensure a safe system. We&apos;ve
            abstracted that down to one file. If you want to change what roles
            have access to parts of Tskr, you only need to edit
            ./api/src/lib/roles.js
          </p>
        </li>
        <li>
          Logic Rules. What are rules? Rules are bits of code that can execute
          to make outbound calls, update records, or modify what was submitted.
          Here are the default ones on ticket.
          <ul>
            <li>Calculate Priority</li>
            <li>Email Assigned to</li>
            <li>Assign High Priorities to Hugh</li>
            <li>Log when something is deleted</li>
            <li>Update title to append [Solved]</li>
          </ul>
        </li>
        <li>
          Responsive Email templating via <a href="https://mjml.io">MJML</a>
        </li>
        <li>Mailgun integrated as the email service provider.</li>
        <li>
          <p>
            Created with the
            <a href="https://www.netlify.com/jamstack/">JAMStack</a> in mind,
            this is a great way to spin up something that has low risk, low
            cost, and a lot of potiental upsides.
          </p>
        </li>
      </ul>
      <h2>I&apos;m in, where do I start?</h2>
      <a href="https://github.com/shiningblue7/tskr#contributing">
        Contributing docs
      </a>
    </>
  )
}

export default AboutComponent

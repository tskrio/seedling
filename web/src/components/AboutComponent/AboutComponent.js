//import './AboutComponent.css'
//import styles from './AboutComponent.module.css'
import YouTubeEmbed from 'src/components/YouTubeEmbed'

const AboutComponent = () => {
  let altText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'
  return (
    <>
      {/*
      <YouTubeEmbed embedId="lSSYciuiKSA" />
      */}
      {/*<h1 alt={altText}>What is Tskr</h1>
      <p>
        Tskr is a minimal RedwoodJS template to get started with Rules,
        Authentication, Roles and Role based Access Control.
      </p>
      <p>
        Imagine a low-cost system where you define complex rules to execute the
        business needs you have — that&apos;s Tskr. We are an opinionated
        system. We make the decisions so you don&apos;t have to.
      </p>
      <p>
        Built on RedwoodJS, this repo focuses on Rules, Authentication, Roles,
        and Role based access control.
      </p>
      <h2>Logins</h2>
      <ul>
        <li>admin@example.com admin</li>
        <li>manager@example.com manager</li>
        <li>employee@example.com employee</li>
      </ul>
      <h2>Features</h2>
      <ul>
        <li>
          <details>
            <summary>Rules</summary>
            <p>
              Rules are the scripts that control what happens during an
              interaction. What kinds of interactions?
            </p>
            <ul>
              <li>Create</li>
              <li>Read</li>
              <li>Update</li>
              <li>Delete</li>
              <li>(Future) Login</li>
              <li>(Future) Logout</li>
              <li>(Future) Navigate</li>
            </ul>
            <p>
              Rules can modify the incoming data and outgoing data.
              <br />
              You can have rules that limit who can see data in columns (see
              Hide Email)
              <br />
              You can have rules that create records when another record is
              created.
              <br />
              You can have rules that update data before they write to the
              database.
            </p>
          </details>
        </li>
        <li>
          <details>
            <summary>Authentication</summary>
            <p>
              Authentication is a key part here. Tskr has opted for dbAuth,
              however, you could replace that pretty simply. This allows for a
              fork of the repo to get up and running with minimal set up. Tskr
              has taken the opinion that Email is the login.
            </p>
          </details>
        </li>
        <li>
          <details>
            <summary>Tables</summary>
            <p>
              Tables are important piece of this and so Tskr has only a few
              tables. All tables adhere to this standard.
            </p>
            <ul>
              <li>Each table has a id, createdAt and updatedAt column.</li>
              <li>Column names are camel case.</li>
              <li>
                References are named after the Source table. E.g.
                GroupMember.User
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Roles</summary>
            <p>
              Roles are currently declared in the table schema. `admin` is the
              only role that doesn&apos;t follow the pattern of the CRUD roles.
              Roles are named in camelCase table then level. e.g. taskCreate
            </p>
          </details>
        </li>
        <li>
          <details>
            <summary>Role Based Access Controls</summary>
            <p>
              Everything above is built to support Role Based Access
              Controls.Access can be granted in the application to
            </p>
          </details>
        </li>
      </ul>
      <h2>I&apos;m in, where do I start?</h2>
      <a href="https://github.com/tskrio/tskr#contributing">
        Contributing docs
      </a>*/}
    </>
  )
}

export default AboutComponent

//import './AboutComponent.css'
//import styles from './AboutComponent.module.css'
const AboutComponent = () => {
  let altText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'
  let done = (
    <>
      <span role="img" aria-label="Check mark">
        ✅
      </span>{' '}
      DONE:{' '}
    </>
  )
  let notDone = (
    <>
      <span role="img" aria-label="X mark">
        ❌
      </span>{' '}
      WORK NOT STARTED:{' '}
    </>
  )
  let workInProgress = (
    <>
      <span role="img" aria-label="Hourglass">
        ⏳
      </span>{' '}
      WORK IN PROGRESS:{' '}
    </>
  )
  return (
    <>
      <h1 alt={altText}>What is TskrBase</h1>
      <p>
        TskrBase is a open source system to allow for users, groups, and roles
        to be managed in one system. The idea here is, Start with this
        repository and add the tables you need to track.
      </p>
      <p>
        This will be the base for the Tskr system. Tskr will add Tasks to this
        mix.
      </p>
      <p>
        Imagine a low-cost system where you define complex rules to execute the
        business needs you have — that&apos;s Tskr. We are an opinionated
        system. We make the decisions so you don&apos;t have to.
      </p>
      <h2>What TskrBase is built on</h2>
      <ul>
        <li>RedwoodJS (React, Prisma, GraphQL, and Postgres)</li>
        <li>RedwoodJS&apos;s dbAuth</li>
        <li>Role Based Access Control managed within TskrBase</li>
      </ul>
      <h2>Features</h2>
      <ul>
        <li>
          <details>
            <summary>Pages</summary>
            <ul>
              <li>{done}Signup (generated)</li>
              <li>{done}Login (custom)</li>
              <li>{notDone}Logout</li>
              <li>{done}About</li>
              <li>{done}NotFound</li>
              <li>{workInProgress}Home</li>
            </ul>
          </details>
          <details>
            <summary>Components</summary>
            <ul>
              <li>{done}LoginComponent (custom)</li>
              <li>{notDone}EnumSelect (reusable)</li>
              <li>{notDone}QuerySelect</li>
              <li>{workInProgress}AsideNavigator</li>
              <li>
                {workInProgress}RoleSelectCell (iterates over enum, make this
                more generic, replace with EnumSelect)
              </li>
              <li>
                {workInProgress}UserSelectCell (iterates over User, make this
                more generic, replace with QuerySelect)
              </li>
              <li>
                {notDone}ListCell (reusable) will replace TablePluralCell
                components
              </li>
            </ul>
          </details>

          <details>
            <summary>Layouts</summary>
            <ul>
              <li>Standard</li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Base user tables</summary>
            <ul>
              <li>
                <details>
                  <summary>User</summary>
                  <p>Here we have the users who can use this system</p>
                  <p>We track the name, email, and preferences here.</p>
                </details>
              </li>
            </ul>
          </details>
          <details>
            <summary>
              Role Based Access. What does that mean? There&apos;s a lot of
              places you have to secure to ensure a safe system.
            </summary>
            <ul>
              <li>
                {done}Routes, Services, and Components are secured for the
                initial tables. Users, User Roles, Groups, Group Roles, and
                Group Members.
              </li>
              <li>
                {done}When adding a user to a group, we add roles to the user
                based on the group they are in.{' '}
                <sup>*We do not ensure they already have that role yet.*</sup>
              </li>
              <li>
                {notDone}If you add a role to the group, the role will be added
                to all users in that group.
              </li>
              <li>
                {notDone}If you remove a role from the group, the role will be
                removed from all users in that group.
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>
              Logic Rules. What are rules? Rules are bits of code that can
              execute to make outbound calls, update records, or modify what was
              submitted.
            </summary>
            <p>Here&apos;s the default rules for each table to start with.</p>
            <ul>
              <details>
                <summary>GroupMember</summary>
                <ul>
                  <li>{done} addRolesToUserAfterCreate</li>
                  <li>{notDone} removeRolesFromUserAfterDelete</li>
                </ul>
              </details>
              <details>
                <summary>GroupRole</summary>
                <ul>
                  <li>{notDone}addRolesToUsersAfterCreate</li>
                  <li>{notDone}removeRolesFromUsersAfterDelete</li>
                </ul>
              </details>
              <details>
                <summary>Group</summary>
                <ul>
                  <li>{notDone}removeGroupRolesAfterDelete</li>
                </ul>
              </details>

              <details>
                <summary>User</summary>
                <ul>
                  <li>{notDone}deleteRelatedGroupMembershipsBeforeDelete</li>
                </ul>
              </details>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Form Abstraction</summary>
            <p>
              We use the form abstraction pattern to make forms easier to work
              with.
            </p>
            <ul>
              <li>{notDone}Form abstraction for all tables.</li>
            </ul>
          </details>
        </li>
        <li>
          <p>
            Created with the
            <a href="https://www.netlify.com/jamstack/">JAMStack</a> in mind,
            this is a great way to spin up something that has low risk, low
            cost, and a lot of potential upsides.
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

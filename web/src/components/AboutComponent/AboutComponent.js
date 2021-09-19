//import './AboutComponent.css'
//import styles from './AboutComponent.module.css'
const AboutComponent = () => {
  let altText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'
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
            <summary>
              Role Based Access. What does that mean? There&apos;s a lot of
              places you have to secure to ensure a safe system.
            </summary>
            <ul>
              <li>
                <span role="img" aria-label="Check mark">
                  ✅
                </span>
                DONE: Routes, Services, and Components are secured for the
                initial tables. Users, User Roles, Groups, Group Roles, and
                Group Members.
              </li>
              <li>
                <span role="img" aria-label="Check mark">
                  ✅
                </span>
                DONE: When adding a user to a group, we add roles to the user
                based on the group they are in.{' '}
                <sup>We do not ensure they already have that role yet.</sup>
              </li>
              <li>
                <span
                  role="img"
                  aria-label="Red circle with a diagonal line through the middle"
                >
                  🚫
                </span>
                NOT DONE: If you add a role to the group, the role will be added
                to all users in that group.
              </li>
              <li>
                <span
                  role="img"
                  aria-label="Red circle with a diagonal line through the middle"
                >
                  🚫
                </span>
                NOT DONE: If you remove a role from the group, the role will be
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
                  <li>
                    <span role="img" aria-label="Check mark">
                      ✅
                    </span>
                    DONE: addRolesToUserAfterCreate
                  </li>
                  <li>
                    <span
                      role="img"
                      aria-label="Red circle with a diagonal line through the middle"
                    >
                      🚫
                    </span>
                    NOT DONE:removeRolesFromUserAfterDelete
                  </li>
                </ul>
              </details>
              <details>
                <summary>GroupRole</summary>
                <ul>
                  <li>
                    <span
                      role="img"
                      aria-label="Red circle with a diagonal line through the middle"
                    >
                      🚫
                    </span>
                    NOT DONE:addRolesToUsersAfterCreate
                  </li>
                  <li>
                    <span
                      role="img"
                      aria-label="Red circle with a diagonal line through the middle"
                    >
                      🚫
                    </span>
                    NOT DONE:removeRolesFromUsersAfterDelete
                  </li>
                </ul>
              </details>
              <details>
                <summary>Group</summary>
                <ul>
                  <li>
                    <span
                      role="img"
                      aria-label="Red circle with a diagonal line through the middle"
                    >
                      🚫
                    </span>
                    NOT DONE:removeGroupRolesAfterDelete
                  </li>
                </ul>
              </details>
              <details>
                <summary>UserRole</summary>
                <ul>
                  <li>
                    <span
                      role="img"
                      aria-label="Red circle with a diagonal line through the middle"
                    >
                      🚫
                    </span>
                    NOT DONE:disallowDeleteIfRoleFromGroupBeforeDelete
                  </li>
                </ul>
              </details>

              <details>
                <summary>User</summary>
                <ul>
                  <li>
                    <span
                      role="img"
                      aria-label="Red circle with a diagonal line through the middle"
                    >
                      🚫
                    </span>
                    NOT DONE:deleteRelatedUserRolesBeforeDelete
                  </li>

                  <li>
                    <span
                      role="img"
                      aria-label="Red circle with a diagonal line through the middle"
                    >
                      🚫
                    </span>
                    NOT DONE:deleteRelatedGroupMembershipsBeforeDelete
                  </li>
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
              <li>
                <span
                  role="img"
                  aria-label="Red circle with a diagonal line through the middle"
                >
                  🚫
                </span>
                NOT DONE: Form abstraction for all tables.
              </li>
            </ul>
          </details>
        </li>
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

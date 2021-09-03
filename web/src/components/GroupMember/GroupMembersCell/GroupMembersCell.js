import { Link, routes } from '@redwoodjs/router'

import GroupMembers from 'src/components/GroupMember/GroupMembers'

export const QUERY = gql`
  query FindGroupMembers {
    groupMembers {
      id
      createdAt
      updatedAt
      userId
      user {
        name
      }
      groupId
      group {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No groupMembers yet. '}
      <Link to={routes.newGroupMember()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groupMembers }) => {
  return <GroupMembers groupMembers={groupMembers} />
}

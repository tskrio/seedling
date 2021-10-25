import { Link, routes } from '@redwoodjs/router'
import Table from 'src/components/Table/Table'
import GroupMembers from 'src/components/GroupMember/GroupMembers'
const DELETE_GROUP_MEMBER_MUTATION = gql`
  mutation DeleteGroupMemberMutation($id: Int!) {
    deleteGroupMember(id: $id) {
      id
    }
  }
`
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
  let meta = {
    title: 'Group Members',
    routes: {
      newItem: (prop) => {
        return routes.newGroupMember()
      },
      view: (prop) => {
        return routes.groupMember(prop)
      },
      edit: (prop) => {
        return routes.editGroupMember(prop)
      },
    },
    labels: {
      single: 'groupmember',
      multiple: 'groupmembers',
    },
    key: 'id',
    display: 'name',
    columns: [
      { key: 'user.name', label: 'User', type: 'reference' },
      { key: 'group.name', label: 'Group', type: 'reference' },
      { key: 'createdAt', label: 'Created', type: 'date' },
      { key: 'updatedAt', label: 'Updated', type: 'date' },
    ],
    createRoles: ['groupMemberCreate'],
    readRoles: ['groupMemberRead'],
    updateRoles: ['groupMemberUpdate'],
    deleteRoles: ['groupMemberDelete'],
  }
  return (
    <>
      <Table
        data={groupMembers}
        meta={meta}
        query={QUERY}
        deleteMutation={DELETE_GROUP_MEMBER_MUTATION}
      />
    </>
  )
  //return <GroupMembers groupMembers={groupMembers} />
}

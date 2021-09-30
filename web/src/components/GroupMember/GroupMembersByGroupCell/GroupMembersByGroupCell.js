import GroupMembers from 'src/components/GroupMember/GroupMembers'
import GroupMembersLayout from 'src/layouts/GroupMembersLayout'
import Table from 'src/components/Table/Table'
export const beforeQuery = (props) => {
  //console.log('variables', props)
  props.id = props.groupID.id
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }
}

import { UPDATE_GROUP_MEMBER_MUTATION } from 'src/components/GroupMember/EditGroupMemberCell'
const DELETE_GROUP_MEMBER_MUTATION = gql`
  mutation DeleteGroupMemberMutation($id: Int!) {
    deleteGroupMember(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query getGroupMembersFromGroup($id: Int!) {
    groupMembers: groupMembersByGroup(id: $id) {
      id
      createdAt
      updatedAt
      userId
      groupId
      user {
        name
        id
      }
      group {
        name
        id
        createdAt
        updatedAt
        description
      }
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <GroupMembersLayout />
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groupMembers }) => {
  // let query = `Where group = ${groupMembers[0].group.name}`
  // return (
  //   <GroupMembersLayout query={query}>
  //     <GroupMembers groupMembers={groupMembers} />
  //   </GroupMembersLayout>
  // )

  let meta = {
    title: 'Group Members',
    routes: {
      newItem: 'newGroupMember',
      view: 'groupMember',
      edit: 'editGroupMember',
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
  }
  const DELETE_GROUP_MUTATION = gql`
    mutation DeleteGroupMutation($id: Int!) {
      deleteGroup(id: $id) {
        id
      }
    }
  `
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

}

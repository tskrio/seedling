import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'

export const QUERY = gql`
  query EditGroupMemberById($id: Int!) {
    groupMember: groupMember(id: $id) {
      id
      createdAt
      updatedAt
      userId
      groupId
      group {
        name
      }
    }
    groups {
      id
      name
    }
    users {
      id
      name
    }
  }
`
const DELETE_GROUP_MEMBER_MUTATION = gql`
  mutation DeleteGroupMemberMutation($id: Int!) {
    deleteGroupMember(id: $id) {
      id
    }
  }
`
export const UPDATE_GROUP_MEMBER_MUTATION = gql`
  mutation UpdateGroupMemberMutation(
    $id: Int!
    $input: UpdateGroupMemberInput!
  ) {
    updateGroupMember(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      userId
      groupId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groupMember, groups, users }) => {
  console.log('groupmember', groupMember)
  const [updateGroup, { loading, error }] = useMutation(
    UPDATE_GROUP_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Group Membership updated')
        navigate(routes.groupMembers())
      },
    }
  )

  const onSave = (input, id) => {
    if (input?.groupId) {
      input.groupId = parseInt(input.groupId, 10)
    }
    updateGroup({ variables: { id, input } })
  }
  const [deleteGroup] = useMutation(DELETE_GROUP_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('Group Membership deleted')
      navigate(routes.users())
    },
  })

  const onDelete = (id) => {
    if (
      confirm('Are you sure you want to delete group membership ' + id + '?')
    ) {
      deleteGroup({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'id',
      prettyName: 'ID',
      readOnly: true,
    },
    {
      name: 'createdAt',
      prettyName: 'Created At',
      readOnly: true,
      type: 'dateTime',
    },
    {
      name: 'updatedAt',
      prettyName: 'Updated At',
      readOnly: true,
      type: 'dateTime',
    },
    {
      name: 'groupId',
      prettyName: 'Group',
      type: 'reference',
      display: 'name',
      value: 'id',
      data: groups,
    },

    {
      name: 'userId',
      prettyName: 'User',
      type: 'reference',
      display: 'name',
      value: 'id',
      data: users,
    },
  ]
  const roles = {
    update: ['groupUpdate'],
    delete: ['groupDelete'],
  }
  const mutations = {
    deleteRecord: DELETE_GROUP_MEMBER_MUTATION,
  }
  return (
    <FormComponent
      record={groupMember}
      fields={fields}
      roles={roles}
      onSave={onSave}
      onDelete={onDelete}
      mutations={mutations}
      loading={loading}
      error={error}
      returnLink={routes.groups()}
    />
  )
}

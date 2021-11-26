import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'

export const QUERY = gql`
  query EditGroupMemberById($id: Int!) {
    groupMember: groupMember(id: $id) {
      id
      userId
      groupId
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
      userId
      groupId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groupMember }) => {
  const [updateGroup, { loading, error }] = useMutation(
    UPDATE_GROUP_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Group Membership updated')
        navigate(routes.groupMembers())
      },
    }
  )

  const onSubmit = (data) => {
    /**TODO: Client Rules go here */
    onSave(data, groupMember.id)
  }
  const onSave = (input, id) => {
    if (input.groupId) {
      input.groupId = parseInt(input.groupId, 10)
    }
    if (input.userId) {
      input.userId = parseInt(input.userId, 10)
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
      prettyName: 'Group',
      name: 'groupId',
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindReferenceFieldQuery($filter: String, $skip: Int) {
          search: groups(filter: $filter, skip: $skip) {
            count
            take
            skip
            results {
              id
              name
            }
          }
        }
      `,
    },

    {
      prettyName: 'Users',
      name: 'userId',
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindReferenceFieldQuery($filter: String, $skip: Int) {
          search: users(filter: $filter, skip: $skip) {
            count
            take
            skip
            results {
              id
              name
            }
          }
        }
      `,
    },
  ]
  const roles = {
    update: ['groupMemberUpdate'],
    delete: ['groupMemberDelete'],
  }
  return (
    <FormComponent
      record={groupMember}
      fields={fields}
      roles={roles}
      onSubmit={onSubmit}
      onDelete={onDelete}
      loading={loading}
      error={error}
      returnLink={routes.groups()}
    />
  )
}

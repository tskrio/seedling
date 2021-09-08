import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import GroupRoleForm from 'src/components/GroupRole/GroupRoleForm'

export const QUERY = gql`
  query EditGroupRoleById($id: Int!) {
    groupRole: groupRole(id: $id) {
      id
      createdAt
      updatedAt
      role
      groupId
    }
  }
`
const UPDATE_GROUP_ROLE_MUTATION = gql`
  mutation UpdateGroupRoleMutation($id: Int!, $input: UpdateGroupRoleInput!) {
    updateGroupRole(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      role
      groupId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ groupRole }) => {
  const [updateGroupRole, { loading, error }] = useMutation(
    UPDATE_GROUP_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupRole updated')
        navigate(routes.groupRoles())
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { groupId: parseInt(input.groupId) })
    updateGroupRole({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit GroupRole {groupRole.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <GroupRoleForm
          groupRole={groupRole}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}

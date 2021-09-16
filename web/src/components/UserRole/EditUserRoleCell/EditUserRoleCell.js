import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import UserRoleForm from 'src/components/UserRole/UserRoleForm'

export const QUERY = gql`
  query EditUserRoleById($id: Int!) {
    userRole: userRole(id: $id) {
      id
      createdAt
      updatedAt
      userId
      role
    }
  }
`
const UPDATE_USER_ROLE_MUTATION = gql`
  mutation UpdateUserRoleMutation($id: Int!, $input: UpdateUserRoleInput!) {
    updateUserRole(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      userId
      role
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userRole }) => {
  const [updateUserRole, { loading, error }] = useMutation(
    UPDATE_USER_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserRole updated')
        navigate(routes.userRoles())
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId) })
    updateUserRole({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserRole {userRole.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserRoleForm
          userRole={userRole}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}

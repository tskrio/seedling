import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import UserForm from 'src/components/User/UserForm'
import GroupMembersByUserCell from 'src/components/GroupMember/GroupMembersByUserCell'

export const QUERY = gql`
  query EditUserById($id: Int!) {
    user: user(id: $id) {
      id
      createdAt
      updatedAt
      email
      name
    }
  }
`
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      email
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ user }) => {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated')
      navigate(routes.users())
    },
  })

  const onSave = (input, id) => {
    console.log(`onSave of edit`, input, id)
    updateUser({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <div className="rw-segment-main">
        <UserForm user={user} onSave={onSave} error={error} loading={loading} />
      </div>
      <GroupMembersByUserCell userID={user} />
    </div>
  )
}

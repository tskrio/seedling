import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import GroupRoleForm from 'src/components/GroupRole/GroupRoleForm'

const CREATE_GROUP_ROLE_MUTATION = gql`
  mutation CreateGroupRoleMutation($input: CreateGroupRoleInput!) {
    createGroupRole(input: $input) {
      id
    }
  }
`

const NewGroupRole = () => {
  const [createGroupRole, { loading, error }] = useMutation(
    CREATE_GROUP_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupRole created')
        navigate(routes.groupRoles())
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, { groupId: parseInt(input.groupId) })
    createGroupRole({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New GroupRole</h2>
      </header>
      <div className="rw-segment-main">
        <GroupRoleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewGroupRole

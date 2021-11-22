import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
export const CREATE_GROUP_ROLE_MUTATION = gql`
  mutation CreateGroupRoleMutation($input: CreateGroupRoleInput!) {
    createGroupRole(input: $input) {
      id
    }
  }
`
const DELETE_GROUP_ROLE_MUTATION = gql`
  mutation DeleteGroupRoleMutation($id: Int!) {
    deleteGroupRole(id: $id) {
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
  const [deleteGroup] = useMutation(DELETE_GROUP_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Group role deleted')
      navigate(routes.users())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete group role ' + id + '?')) {
      deleteGroup({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'groupId',
      prettyName: 'Group',
      type: 'reference',
      display: 'name',
      value: 'id',
      data: [
        {
          name: 'Administrators',
          id: 1,
        },
      ],
    },
    {
      name: 'role',
      prettyName: 'Role',
      type: 'reference',
      display: 'name',
      value: 'name',
      data: [
        { name: 'userCreate' },
        { name: 'userRead' },
        { name: 'userUpdate' },
        { name: 'userDelete' },
        { name: 'groupCreate' },
        { name: 'groupRead' },
        { name: 'groupUpdate' },
        { name: 'groupDelete' },
        { name: 'groupMemberCreate' },
        { name: 'groupMemberRead' },
        { name: 'groupMemberUpdate' },
        { name: 'groupMemberDelete' },
        { name: 'groupRoleCreate' },
        { name: 'groupRoleRead' },
        { name: 'groupRoleUpdate' },
        { name: 'groupRoleDelete' },
        { name: 'admin' },
      ],
    },
  ]
  const roles = {
    update: ['groupUpdate'],
    delete: ['groupDelete'],
  }

  const mutations = {
    deleteRecord: DELETE_GROUP_ROLE_MUTATION,
  }
  return (
    <FormComponent
      fields={fields}
      roles={roles}
      onSave={onSave}
      onDelete={onDelete}
      mutations={mutations}
      loading={loading}
      error={error}
      returnLink={routes.groupRoles()}
    />
  )

  //  return (
  //    <div className="rw-segment">
  //      <header className="rw-segment-header">
  //        <h2 className="rw-heading rw-heading-secondary">New GroupRole</h2>
  //      </header>
  //      <div className="rw-segment-main">
  //        <GroupRoleForm onSave={onSave} loading={loading} error={error} />
  //      </div>
  //    </div>
  //  )
}

export default NewGroupRole

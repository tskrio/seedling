import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import GroupMembersByGroupCell from 'src/components/GroupMember/GroupMembersByGroupCell'
import GroupRolesByGroupCell from 'src/components/GroupRole/GroupRolesByGroupCell'
const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query EditGroupById($id: Int!) {
    group: group(id: $id) {
      id
      createdAt
      updatedAt
      name
      description
    }
  }
`
export const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroupMutation($id: Int!, $input: UpdateGroupInput!) {
    updateGroup(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ group }) => {
  const [updateGroup, { loading, error }] = useMutation(UPDATE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Group updated')
      navigate(routes.groups())
    },
  })
  const onSubmit = (data) => {
    /**TODO: Client RUles go here */
    onSave(data, group.id)
  }
  const onSave = (input, id) => {
    updateGroup({ variables: { id, input } })
  }
  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Group deleted')
      navigate(routes.groups())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete group ' + id + '?')) {
      deleteGroup({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',
    },
    {
      name: 'description',
      prettyName: 'Description',
      //type: 'dateTime',
      //type: 'textArea',
    },
  ]
  const roles = {
    update: ['groupUpdate'],
    delete: ['groupDelete'],
  }
  return (
    <>
      <FormComponent
        record={group}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.groups()}
      />
      <GroupMembersByGroupCell groupID={group} />
      <GroupRolesByGroupCell groupID={group} />
    </>
  )
}

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import GroupForm from 'src/components/Group/GroupForm'

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
const UPDATE_GROUP_MUTATION = gql`
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

  const onSave = (input, id) => {
    updateGroup({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Group {group.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <GroupForm
          group={group}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}

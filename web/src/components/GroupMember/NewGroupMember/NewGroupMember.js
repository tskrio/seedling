import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import GroupMemberForm from 'src/components/GroupMember/GroupMemberForm'

const CREATE_GROUP_MEMBER_MUTATION = gql`
  mutation CreateGroupMemberMutation($input: CreateGroupMemberInput!) {
    createGroupMember(input: $input) {
      id
    }
  }
`

const NewGroupMember = () => {
  const [createGroupMember, { loading, error }] = useMutation(
    CREATE_GROUP_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupMember created')
        navigate(routes.groupMembers())
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      userId: parseInt(input.userId),
      groupId: parseInt(input.groupId),
    })
    createGroupMember({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New GroupMember</h2>
      </header>
      <div className="rw-segment-main">
        <GroupMemberForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewGroupMember

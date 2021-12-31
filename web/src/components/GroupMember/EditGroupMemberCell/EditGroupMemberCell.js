import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'

import { Fragment } from 'react'

export const QUERY = gql`
  query EditGroupMemberById($id: Int!) {
    groupMember: groupMember(id: $id) {
      id
      createdAt
      updatedAt
      userId
      groupId
    }
  }
`
const UPDATE_GROUP_MEMBER_MUTATION = gql`
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
export const DELETE_GROUP_MEMBER_MUTATION = gql`
  mutation DeleteGroupMemberMutation($id: Int!) {
    deleteGroupMember(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ groupMember }) => {
  const [updateGroupMember, { loading, error }] = useMutation(
    UPDATE_GROUP_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupMember updated')
        navigate(routes.groupMembers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    console.log('saving', data)
    /**TODO: FEAT Client Rules go here */
    onSave(data, groupMember.id)
  }
  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      userId: parseInt(input.userId),
      groupId: parseInt(input.groupId),
    })
    updateGroupMember({ variables: { id, input: castInput } })
  }

  const [deleteGroupMember] = useMutation(DELETE_GROUP_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('GroupMember deleted')
      navigate(routes.groupMembers())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete GroupMember ' + id + '?')) {
      deleteGroupMember({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'field',
      prettyName: 'Field',
      required: 'message to show when empty',
    },
  ]

  const roles = {
    update: ['groupMemberUpdate'],
    delete: ['groupMemberDelete'],
  }

  return (
    <Fragment>
      <MetaTags
        title={`groupMember.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={groupMember}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.groupMembers()}
      />
    </Fragment>
  )
}

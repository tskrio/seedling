import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'

import { Fragment } from 'react'

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
export const DELETE_GROUP_ROLE_MUTATION = gql`
  mutation DeleteGroupRoleMutation($id: Int!) {
    deleteGroupRole(id: $id) {
      id
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
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    console.log('saving', data)
    /**TODO: FEAT Client Rules go here */
    onSave(data, groupRole.id)
  }
  const onSave = (input, id) => {
    const castInput = Object.assign(input, { groupId: parseInt(input.groupId) })
    updateGroupRole({ variables: { id, input: castInput } })
  }

  const [deleteGroupRole] = useMutation(DELETE_GROUP_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('GroupRole deleted')
      navigate(routes.groupRoles())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete GroupRole ' + id + '?')) {
      deleteGroupRole({ variables: { id } })
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
    update: ['groupRoleUpdate'],
    delete: ['groupRoleDelete'],
  }

  return (
    <Fragment>
      <MetaTags
        title={`groupRole.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={groupRole}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.groupRoles()}
      />
    </Fragment>
  )
}

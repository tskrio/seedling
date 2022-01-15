import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'

import { Fragment } from 'react'

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
export const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ group }) => {
  const [updateGroup, { loading, error }] = useMutation(UPDATE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Group updated')
      navigate(routes.groups())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    /**TODO: FEAT Client Rules go here */
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
    if (confirm('Are you sure you want to delete Group ' + id + '?')) {
      deleteGroup({ variables: { id } })
    }
  }
  const fields = [
    {
      // {"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"type":"String","hasDefaultValue":false,"isGenerated":false,"isUpdatedAt":false,"label":"Name","component":"TextField","defaultProp":"defaultValue","deserilizeFunction":"","validation":"{{ required: true }}","listDisplayFunction":"truncate"}
      name: 'name',
      prettyName: 'Name',
      required: 'This is required',
    },

    {
      // {"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"type":"String","hasDefaultValue":false,"isGenerated":false,"isUpdatedAt":false,"label":"Description","component":"TextField","defaultProp":"defaultValue","deserilizeFunction":"","validation":"{{ required: true }}","listDisplayFunction":"truncate"}
      name: 'description',
      prettyName: 'Description',
      required: 'This is required',
    },
  ]

  const roles = {
    update: ['groupUpdate'],
    delete: ['groupDelete'],
  }

  return (
    <Fragment>
      <MetaTags
        title={`group.id`}
        description="Replace me with 155 charactes about this page"
      />

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
    </Fragment>
  )
}

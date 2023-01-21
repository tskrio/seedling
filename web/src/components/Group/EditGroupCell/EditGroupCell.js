import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'
export const QUERY = gql`
  query EditGroupById($cuid: String!) {
    group: group(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      name
      description
    }
  }
`
const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroupMutation($cuid: String!, $input: UpdateGroupInput!) {
    updateGroup(cuid: $cuid, input: $input) {
      cuid
      createdAt
      updatedAt
      name
      description
    }
  }
`
export const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($cuid: String!) {
    deletedRow: deleteGroup(cuid: $cuid) {
      cuid
      name
    }
  }
`

export const Loading = () => <FormSkeleton />

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
    onSave(data, group.cuid)
  }
  const onSave = (input, cuid) => {
    updateGroup({ variables: { cuid, input } })
  }

  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Group deleted')
      navigate(routes.groups())
    },
  })

  const onDelete = (/*id*/) => {
    let cuid = group.cuid
    if (confirm('Are you sure you want to delete Group ' + group.name + '?')) {
      deleteGroup({ variables: { cuid } })
    }
  }
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',
      required: 'This is required',
    },

    {
      name: 'description',
      prettyName: 'Description',
      required: 'This is required',
    },
  ]

  const roles = {
    update: ['groupUpdate'],
    delete: ['groupDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`group.cuid`}
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
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

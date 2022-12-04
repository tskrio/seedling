import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

export const QUERY = gql`
  query EditLogById($id: String!) {
    log: log(id: $id) {
      id
      createdAt
      message
      source
      context
    }
  }
`
const UPDATE_LOG_MUTATION = gql`
  mutation UpdateLogMutation($id: String!, $input: UpdateLogInput!) {
    updateLog(id: $id, input: $input) {
      id
      createdAt
      message
      source
      context
    }
  }
`
export const DELETE_LOG_MUTATION = gql`
  mutation DeleteLogMutation($id: String!) {
    deletedRow: deleteLog(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ log }) => {
  const [updateLog, { loading, error }] = useMutation(UPDATE_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('Log updated')
      navigate(routes.logs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    onSave(data, log.id)
  }
  const onSave = (input, id) => {
    updateLog({ variables: { id, input } })
  }

  const [deleteLog] = useMutation(DELETE_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('Log deleted')
      navigate(routes.logs())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete Log ' + id + '?')) {
      deleteLog({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'createdAt',
      prettyName: 'Created At',
      required: 'This is required',
    },
    {
      name: 'message',
      prettyName: 'Message',
      required: 'This is required',
    },
    {
      name: 'source',
      prettyName: 'Source',
      required: 'This is required',
    },
    {
      name: 'context',
      prettyName: 'Context',
      required: 'This is required',
      type: 'json',
    },
  ]

  const roles = {
    update: ['logUpdate'],
    delete: ['logDelete'],
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`log.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={log}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.logs()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      >
        <></>
      </FormComponent>
    </Fragment>
  )
}

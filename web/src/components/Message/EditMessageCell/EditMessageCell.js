import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'

export const QUERY = gql`
  query EditMessageById($id: Int!) {
    message: message(id: $id) {
      id
      createdAt
      updatedAt
      language
      entity
      value
    }
  }
`
const UPDATE_MESSAGE_MUTATION = gql`
  mutation UpdateMessageMutation($id: Int!, $input: UpdateMessageInput!) {
    updateMessage(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      language
      entity
      value
    }
  }
`
export const DELETE_MESSAGE_MUTATION = gql`
  mutation DeleteMessageMutation($id: Int!) {
    deletedRow: deleteMessage(id: $id) {
      id
      entity
    }
  }
`

export const Loading = () => <FormSkeleton />

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ message }) => {
  const [updateMessage, { loading, error }] = useMutation(
    UPDATE_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Message updated')
        navigate(routes.messages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, message.id)
  }
  const onSave = (input, id) => {
    updateMessage({ variables: { id, input } })
  }

  const [deleteMessage] = useMutation(DELETE_MESSAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Message deleted')
      navigate(routes.messages())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete Message ' + id + '?')) {
      deleteMessage({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'entity',
      prettyName: 'Entity',
      required: 'This is required',
    },
    {
      name: 'value',
      prettyName: 'Value',
      required: 'This is required',
    },
    {
      name: 'language',
      prettyName: 'Language',
      required: 'This is required',
    },
  ]

  const roles = {
    update: ['messageUpdate'],
    delete: ['messageDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  return (
    <Fragment>
      <MetaTags
        title={`message.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={message}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.messages()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

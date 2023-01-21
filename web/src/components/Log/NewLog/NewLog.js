import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_LOG_MUTATION = gql`
  mutation CreateLogMutation($input: CreateLogInput!) {
    createLog(input: $input) {
      cuid
    }
  }
`

const NewLog = () => {
  const [createLog, { loading, error }] = useMutation(CREATE_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('Log created')
      navigate(routes.logs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    onSave(data)
  }

  const onSave = (input) => {
    createLog({ variables: { input } })
  }
  const fields = [
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
        title="New Log"
        description="New Log form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        returnLink={routes.logs()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

export default NewLog

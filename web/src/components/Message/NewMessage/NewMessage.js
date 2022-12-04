import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessageMutation($input: CreateMessageInput!) {
    message: createMessage(input: $input) {
      id
      entity
    }
  }
`

const NewMessage = () => {
  const [createMessage, { loading, error }] = useMutation(
    CREATE_MESSAGE_MUTATION,
    {
      onCompleted: (data) => {
        toast.success(`Message "${data.message.entity}" created`)
        //navigate(routes.editMessage({ id: data.message.id }))
        navigate(routes.messages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data)
  }

  const onSave = (input) => {
    createMessage({ variables: { input } })
  }
  const fields = [
    {
      name: 'entity',
      prettyName: 'Entity',
      required: 'This is required',
    },
    {
      name: 'language',
      prettyName: 'Language',
      required: 'This is required',
    },
    {
      name: 'value',
      prettyName: 'Value',
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
        title="New Message"
        description="New Message form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
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

export default NewMessage

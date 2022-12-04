import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_PROPERTY_MUTATION = gql`
  mutation CreatePropertyMutation($input: CreatePropertyInput!) {
    createProperty(input: $input) {
      id
    }
  }
`

const NewProperty = () => {
  const [createProperty, { loading, error }] = useMutation(
    CREATE_PROPERTY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Property created')
        navigate(routes.properties())
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
    createProperty({ variables: { input } })
  }
  const fields = [
    {
      name: 'entity',
      prettyName: 'Entity',
      required: 'This is required',
    },

    {
      name: 'type',
      prettyName: 'Type',
      required: 'This is required',
      type: 'select',
      options: ['string', 'number', 'boolean', 'date', 'hidden'],
    },

    {
      name: 'value',
      placeholder: "If type is hidden, this won't be visible after save",
      prettyName: 'Value',
    },
  ]

  const roles = {
    update: ['propertyUpdate'],
    delete: ['propertyDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title="New Property"
        description="New Property form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        returnLink={routes.properties()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

export default NewProperty

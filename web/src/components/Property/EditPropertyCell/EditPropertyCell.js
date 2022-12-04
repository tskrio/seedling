import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'
export const QUERY = gql`
  query EditPropertyById($id: Int!) {
    property: property(id: $id) {
      id
      createdAt
      updatedAt
      entity
      type
      value
    }
  }
`
const UPDATE_PROPERTY_MUTATION = gql`
  mutation UpdatePropertyMutation($id: Int!, $input: UpdatePropertyInput!) {
    updateProperty(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      entity
      type
      value
    }
  }
`
export const DELETE_PROPERTY_MUTATION = gql`
  mutation DeletePropertyMutation($id: Int!) {
    deletedRow: deleteProperty(id: $id) {
      id
      entity
    }
  }
`

export const Loading = () => <FormSkeleton />

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ property }) => {
  const [updateProperty, { loading, error }] = useMutation(
    UPDATE_PROPERTY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Property updated')
        navigate(routes.properties())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, property.id)
  }
  const onSave = (input, id) => {
    updateProperty({ variables: { id, input } })
  }

  const [deleteProperty] = useMutation(DELETE_PROPERTY_MUTATION, {
    onCompleted: () => {
      toast.success('Property deleted')
      navigate(routes.properties())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete Property ' + id + '?')) {
      deleteProperty({ variables: { id } })
    }
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
      prettyName: 'Value',
      placeholder: 'Only change if you want to set this.',
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
        title={`property.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={property}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
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

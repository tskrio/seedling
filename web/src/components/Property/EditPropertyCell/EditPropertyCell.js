import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'
export const QUERY = gql`
  query EditPropertyById($cuid: String!) {
    property: property(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      name
      type
      value
    }
  }
`
const UPDATE_PROPERTY_MUTATION = gql`
  mutation UpdatePropertyMutation(
    $cuid: String!
    $input: UpdatePropertyInput!
  ) {
    updateProperty(cuid: $cuid, input: $input) {
      cuid
      createdAt
      updatedAt
      name
      type
      value
    }
  }
`
export const DELETE_PROPERTY_MUTATION = gql`
  mutation DeletePropertyMutation($cuid: String!) {
    deletedRow: deleteProperty(cuid: $cuid) {
      cuid
      name
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
    console.log({ function: 'onSubmit', data, property })
    onSave(data, property.cuid)
  }
  const onSave = (input, cuid) => {
    updateProperty({ variables: { cuid, input } })
  }

  const [deleteProperty] = useMutation(DELETE_PROPERTY_MUTATION, {
    onCompleted: () => {
      toast.success('Property deleted')
      navigate(routes.properties())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDelete = (cuid) => {
    console.log({ function: 'onDelete', property })
    if (confirm('Are you sure you want to delete Property ' + cuid + '?')) {
      deleteProperty({ variables: { cuid: property.cuid } })
    }
  }
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',
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
        title={`${property.cuid}`}
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

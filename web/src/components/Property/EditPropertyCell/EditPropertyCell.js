import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'

import { Fragment } from 'react'

export const QUERY = gql`
  query EditPropertyById($id: Int!) {
    property: property(id: $id) {
      id
      createdAt
      updatedAt
      entity
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
      value
    }
  }
`
export const DELETE_PROPERTY_MUTATION = gql`
  mutation DeletePropertyMutation($id: Int!) {
    deleteProperty(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

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
    console.log('saving', data)
    /**TODO: FEAT Client Rules go here */
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
      required: 'message to show when empty',
    },
    {
      name: 'value',
      prettyName: 'Value',
      required: 'message to show when empty',
    },
  ]

  const roles = {
    update: ['propertyUpdate'],
    delete: ['propertyDelete'],
  }

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
      />
    </Fragment>
  )
}

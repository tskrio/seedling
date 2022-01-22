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
      // {"name":"entity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"type":"String","hasDefaultValue":false,"isGenerated":false,"isUpdatedAt":false,"label":"Entity","component":"TextField","defaultProp":"defaultValue","deserilizeFunction":"","validation":"{{ required: true }}","listDisplayFunction":"truncate"}
      name: 'entity',
      prettyName: 'Entity',
      required: 'This is required',
    },

    {
      // {"name":"type","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"type":"String","hasDefaultValue":true,"default":"string","isGenerated":false,"isUpdatedAt":false,"label":"Type","component":"TextField","defaultProp":"defaultValue","deserilizeFunction":"","validation":"{{ required: true }}","listDisplayFunction":"truncate"}
      name: 'type',
      prettyName: 'Type',
      required: 'This is required',
      type: 'select',
      options: ['string', 'number', 'boolean', 'date', 'encrypted'],
    },

    {
      // {"name":"value","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"type":"String","hasDefaultValue":false,"isGenerated":false,"isUpdatedAt":false,"label":"Value","component":"TextField","defaultProp":"defaultValue","deserilizeFunction":"","validation":null,"listDisplayFunction":"truncate"}
      name: 'value',
      prettyName: 'Value',
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

import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'

export const QUERY = gql`
  query EditPreferenceById($id: Int!) {
    preference: preference(id: $id) {
      id
      createdAt
      updatedAt
      entity
      value
      userId
      user {
        id
        name
      }
    }
  }
`
const UPDATE_PREFERENCE_MUTATION = gql`
  mutation UpdatePreferenceMutation($id: Int!, $input: UpdatePreferenceInput!) {
    updatePreference(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      entity
      value
      userId
    }
  }
`
export const DELETE_PREFERENCE_MUTATION = gql`
  mutation DeletePreferenceMutation($id: Int!) {
    deletedRow: deletePreference(id: $id) {
      id
      entity
    }
  }
`

export const Loading = () => <FormSkeleton />

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ preference }) => {
  const [updatePreference, { loading, error }] = useMutation(
    UPDATE_PREFERENCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Preference updated')
        navigate(routes.preferences())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, preference.id)
  }
  const onSave = (input, id) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId) })
    updatePreference({ variables: { id, input: castInput } })
  }

  const [deletePreference] = useMutation(DELETE_PREFERENCE_MUTATION, {
    onCompleted: () => {
      toast.success('Preference deleted')
      navigate(routes.preferences())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete Preference ' + id + '?')) {
      deletePreference({ variables: { id } })
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
      // {"name":"value","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"type":"String","hasDefaultValue":false,"isGenerated":false,"isUpdatedAt":false,"label":"Value","component":"TextField","defaultProp":"defaultValue","deserilizeFunction":"","validation":null,"listDisplayFunction":"truncate"}
      name: 'value',
      prettyName: 'Value',
    },

    {
      // {"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"type":"Int","hasDefaultValue":false,"isGenerated":false,"isUpdatedAt":false,"label":"User id","component":"NumberField","defaultProp":"defaultValue","deserilizeFunction":"","validation":"{{ required: true }}","listDisplayFunction":"truncate"}
      name: 'userId',
      prettyName: 'User id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // update the query above "EditPreferenceById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'id',
      defaultValue: preference.user.id,
      defaultDisplay: preference.user.name,
      QUERY: gql`
        query FindUserFromPreferences($filter: String, $skip: Int, $take: Int) {
          search: users(filter: $filter, skip: $skip, take: $take) {
            count
            take
            skip
            results {
              id
              name
            }
          }
        }
      `,
    },
  ]

  const roles = {
    update: ['preferenceUpdate'],
    delete: ['preferenceDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`preference.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={preference}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.preferences()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

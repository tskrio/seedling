import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'

export const QUERY = gql`
  query EditPreferenceById($cuid: String!) {
    preference: preference(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      entity
      value
      userCuid
      User {
        cuid
        name
      }
    }
  }
`
const UPDATE_PREFERENCE_MUTATION = gql`
  mutation UpdatePreferenceMutation(
    $cuid: String!
    $input: UpdatePreferenceInput!
  ) {
    updatePreference(cuid: $cuid, input: $input) {
      cuid
      createdAt
      updatedAt
      entity
      value
      userCuid
    }
  }
`
export const DELETE_PREFERENCE_MUTATION = gql`
  mutation DeletePreferenceMutation($cuid: String!) {
    deletedRow: deletePreference(cuid: $cuid) {
      cuid
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
    onSave(data, preference.cuid)
  }
  const onSave = (input, cuid) => {
    console.log({ function: 'onSave', input, cuid })
    const castInput = Object.assign(input, {
      userCuid: input.userCuid,
    })
    updatePreference({ variables: { cuid, input: castInput } })
  }

  const [deletePreference] = useMutation(DELETE_PREFERENCE_MUTATION, {
    onCompleted: () => {
      toast.success('Preference deleted')
      navigate(routes.preferences())
    },
  })

  const onDelete = (id) => {
    let cuid = preference.cuid
    if (confirm('Are you sure you want to delete Preference ' + id + '?')) {
      deletePreference({ variables: { cuid } })
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
    },

    {
      name: 'userCuid',
      prettyName: 'User id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // update the query above "EditPreferenceById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'cuid',
      defaultValue: preference.user.cuid,
      defaultDisplay: preference.user.name,
      QUERY: gql`
        query FindUserFromPreferences($filter: String, $skip: Int, $take: Int) {
          search: users(filter: $filter, skip: $skip, take: $take) {
            count
            take
            skip
            results {
              cuid
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
        title={`preference.cuid`}
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

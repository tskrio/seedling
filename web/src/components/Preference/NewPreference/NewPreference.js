import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_PREFERENCE_MUTATION = gql`
  mutation CreatePreferenceMutation($input: CreatePreferenceInput!) {
    createPreference(input: $input) {
      id
    }
  }
`

const NewPreference = () => {
  const [createPreference, { loading, error }] = useMutation(
    CREATE_PREFERENCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Preference created')
        navigate(routes.preferences())
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
    const castInput = Object.assign(input, { userId: parseInt(input.user) })
    delete castInput.user
    createPreference({ variables: { input: castInput } })
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
      name: 'user',
      prettyName: 'User',
      required: 'This is required',
      // If this is a reference you probably want this below
      // uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindUsersFromPreferences(
          $filter: String
          $skip: Int
          $take: Int
        ) {
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
        title="New Preference"
        description="New Preference form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
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

export default NewPreference

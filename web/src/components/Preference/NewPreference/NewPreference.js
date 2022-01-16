import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
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
    /**TODO: FEAT Client Rules go here */
    onSave(data)
  }

  const onSave = (input) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId) })
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
      name: 'userId',
      prettyName: 'User id',
      required: 'This is required',
    },
  ]

  const roles = {
    update: ['preferenceUpdate'],
    delete: ['preferenceDelete'],
  }

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
      />
    </Fragment>
  )
}

export default NewPreference

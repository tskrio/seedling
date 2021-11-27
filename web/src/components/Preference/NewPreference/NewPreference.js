import { useMutation, MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
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
    if (input.userId) {
      input.userId = parseInt(input.userId, 10)
    }
    createPreference({ variables: { input } })
  }
  const fields = [
    {
      name: 'entity',
      prettyName: 'Entity',
      placeHolder: 'Give us a preference name!',
    },
    {
      name: 'value',
      prettyName: 'Value',
    },

    {
      prettyName: 'Users',
      name: 'userId',
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindReferenceFieldQuery($filter: String, $skip: Int) {
          search: users(filter: $filter, skip: $skip) {
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
    update: [],
    delete: [],
  }
  return (
    <>
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
        returnLink={routes.users()}
      />
    </>
  )
}

export default NewPreference

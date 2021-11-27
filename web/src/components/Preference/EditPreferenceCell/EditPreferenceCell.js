import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
const DELETE_GROUP_MUTATION = gql`
  mutation DeletePreferenceMutation($id: Int!) {
    deleteGroup(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query EditPreferenceById($id: Int!) {
    preference: preference(id: $id) {
      id
      entity
      value
      user {
        id
        name
      }
    }
  }
`
export const UPDATE_PREFERENCE_MUTATION = gql`
  mutation UpdatePreferenceMutation($id: Int!, $input: UpdatePreferenceInput!) {
    updatePreference(id: $id, input: $input) {
      id
      entity
      value
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ preference }) => {
  const [updatePreference, { loading, error }] = useMutation(
    UPDATE_PREFERENCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Preference updated')
        navigate(routes.preferences())
      },
    }
  )
  const onSubmit = (data) => {
    /**TODO: FEAT Client Rules go here */
    onSave(data, preference.id)
  }
  const onSave = (input, id) => {
    if (input.userId) {
      input.userId = parseInt(input.userId, 10)
    }
    updatePreference({ variables: { id, input } })
  }
  const [deletePreference] = useMutation(DELETE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Preference deleted')
      navigate(routes.preferences())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete preference ' + id + '?')) {
      deletePreference({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'entity',
      prettyName: 'Entity',
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
        title={preference.entity}
        description={`${preference.entity}`}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
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
      />
    </>
  )
}

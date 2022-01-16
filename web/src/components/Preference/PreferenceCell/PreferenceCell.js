import Preference from 'src/components/Preference/Preference'

export const QUERY = gql`
  query FindPreferenceById($id: Int!) {
    preference: preference(id: $id) {
      id
      createdAt
      updatedAt
      entity
      value
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Preference not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ preference }) => {
  return <Preference preference={preference} />
}

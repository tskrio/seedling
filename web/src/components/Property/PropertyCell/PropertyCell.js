import Property from 'src/components/Property/Property'

export const QUERY = gql`
  query FindPropertyById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Property not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ property }) => {
  return <Property property={property} />
}

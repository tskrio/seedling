import Property from 'src/components/Property/Property'

export const QUERY = gql`
  query FindPropertyById($cuid: String!) {
    property: property(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      name
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

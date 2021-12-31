import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Property/PropertiesCell'

const DELETE_PROPERTY_MUTATION = gql`
  mutation DeletePropertyMutation($id: Int!) {
    deleteProperty(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const PropertiesList = ({ properties }) => {
  const [deleteProperty] = useMutation(DELETE_PROPERTY_MUTATION, {
    onCompleted: () => {
      toast.success('Property deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete property ' + id + '?')) {
      deleteProperty({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Entity</th>
            <th>Value</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{truncate(property.id)}</td>
              <td>{timeTag(property.createdAt)}</td>
              <td>{timeTag(property.updatedAt)}</td>
              <td>{truncate(property.entity)}</td>
              <td>{truncate(property.value)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.property({ id: property.id })}
                    title={'Show property ' + property.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editProperty({ id: property.id })}
                    title={'Edit property ' + property.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete property ' + property.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(property.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PropertiesList

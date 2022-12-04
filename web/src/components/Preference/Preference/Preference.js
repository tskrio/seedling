import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { DELETE_PREFERENCE_MUTATION } from 'src/components/Preference/EditPreferenceCell'

// const jsonDisplay = (obj) => {
//   return (
//     <pre>
//       <code>{JSON.stringify(obj, null, 2)}</code>
//     </pre>
//   )
// }

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

// const checkboxInputTag = (checked) => {
//   return <input type="checkbox" checked={checked} disabled />
// }

const Preference = ({ preference }) => {
  const [deletePreference] = useMutation(DELETE_PREFERENCE_MUTATION, {
    onCompleted: () => {
      toast.success('Preference deleted')
      navigate(routes.preferences())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete preference ' + id + '?')) {
      deletePreference({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Preference {preference.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{preference.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(preference.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(preference.updatedAt)}</td>
            </tr>
            <tr>
              <th>Entity</th>
              <td>{preference.entity}</td>
            </tr>
            <tr>
              <th>Value</th>
              <td>{preference.value}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{preference.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPreference({ id: preference.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(preference.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Preference

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { DELETE_MESSAGE_MUTATION } from 'src/components/Message/EditMessageCell'

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

const Message = ({ message }) => {
  const [deleteMessage] = useMutation(DELETE_MESSAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Message deleted')
      navigate(routes.messages())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete message ' + id + '?')) {
      deleteMessage({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Message {message.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{message.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(message.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(message.updatedAt)}</td>
            </tr>
            <tr>
              <th>Language</th>
              <td>{message.language}</td>
            </tr>
            <tr>
              <th>Entity</th>
              <td>{message.entity}</td>
            </tr>
            <tr>
              <th>Value</th>
              <td>{message.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMessage({ id: message.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(message.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Message

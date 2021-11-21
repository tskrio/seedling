import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const User2 = ({ user }) => {
  const { hasRole } = useAuth()
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  var preferenceFields = []
  if (user?.preferences) {
    for (let key in user?.preferences) {
      preferenceFields.push(
        <label
          key={key}
          className="flex border-b border-gray-200 h-12 py-3 items-center"
        >
          <span className="text-right px-2">{key}</span>
          <input
            name={'preference.' + key}
            className="focus:outline-none px-3 w-full"
            placeholder="Card number MM/YY CVC"
            value={user?.preferences[key]}
            required=""
          />
        </label>
      )
    }
  }
  return (
    <>
      <div className="rounded-md">
        <form id="payment-form" method="POST" action="">
          <section>
            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
              {user.name}
            </h2>
            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2 w-1/6">Id</span>
                <input
                  name="name"
                  className="focus:outline-none px-3 w-5/6"
                  placeholder="System Generated"
                  readOnly=""
                  value={user.id}
                />
              </label>
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2 w-1/6">Name</span>
                <input
                  name="email"
                  type="email"
                  className="focus:outline-none px-3 w-5/6"
                  placeholder="try@example.com"
                  required=""
                  value={user.name}
                />
              </label>
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2 w-1/6">Email</span>
                <input
                  name="email"
                  type="email"
                  className="focus:outline-none px-3 w-5/6"
                  placeholder="try@example.com"
                  required=""
                  value={user.email}
                />
              </label>
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2 w-1/6">Updated</span>
                <input
                  name="createdAt"
                  className="focus:outline-none px-3 w-5/6"
                  placeholder="YYYY-MM-DD HH:MM:SS"
                  required=""
                  value={user.updatedAt}
                />
              </label>
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2 w-1/6">Created</span>
                <input
                  name="createdAt"
                  className="focus:outline-none px-3 w-5/6"
                  placeholder="YYYY-MM-DD HH:MM:SS"
                  required=""
                  value={user.createdAt}
                />
              </label>
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2 w-1/6">Password</span>
                <input
                  name="city"
                  className="focus:outline-none px-3 w-5/6"
                  placeholder="Only put something here if you want to change it"
                />
              </label>
            </fieldset>
          </section>
        </form>
      </div>
      <div className="rounded-md">
        <section>
          <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
            Preferences
          </h2>
          <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
              <span className="text-right px-2 w-1/6">Card</span>
              <input
                name="card"
                className="focus:outline-none px-3 w-5/6"
                placeholder="Card number MM/YY CVC"
                required=""
              />
            </label>
            {preferenceFields}
          </fieldset>
        </section>
      </div>
      <div className="flex">
        <button
          className="submit-button px-4 py-3 rounded-full bg-blue-400 hover:bg-blue-700 text-white focus:ring focus:outline-none w-2/3 text-xl font-semibold transition-colors"
          to={routes.editUser({ id: user.id })}
        >
          Save
        </button>
        {hasRole(['userDelete', 'admin']) && (
          <button
            type="button"
            className="submit-button px-4 py-3 rounded-full bg-red-400 hover:bg-red-700 text-white focus:ring focus:outline-none w-1/3 text-xl font-semibold transition-colors"
            onClick={() => onDeleteClick(user.id)}
          >
            Delete
          </button>
        )}
      </div>
    </>
  )
}

export default User2

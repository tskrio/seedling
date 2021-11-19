import { Link, routes, navigate } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { webProperties } from 'src/lib/webProperties'
//import Table from 'src/components/Table/Table'
//import { UPDATE_USER_MUTATION } from 'src/components/User/EditUserCell'
export const QUERY = gql`
  query FindUsers {
    users {
      id
      createdAt
      updatedAt
      email
      name
      md5Email
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
      <Link to={routes.newUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ users }) => {
  //let meta = {
  //  title: 'Users',
  //  routes: {
  //    newItem: () => {
  //      return routes.newUser()
  //    },
  //    view: (prop) => {
  //      return routes.user(prop)
  //    },
  //    edit: (prop) => {
  //      return routes.editUser(prop)
  //    },
  //  },
  //  labels: {
  //    single: 'user',
  //    multiple: 'users',
  //  },
  //  key: 'id',
  //  display: 'name',
  //  columns: [
  //    { key: 'name', label: 'Name', type: 'string' },
  //    { key: 'email', label: 'Email', type: 'string' },
  //    { key: 'createdAt', label: 'Created', type: 'date' },
  //    { key: 'updatedAt', label: 'Updated', type: 'date' },
  //  ],
  //  createRoles: ['userCreate'],
  //  readRoles: ['userRead'],
  //  updateRoles: ['userUpdate'],
  //  deleteRoles: ['userDelete'],
  //}
  const DELETE_USER_MUTATION = gql`
    mutation DeleteUserMutation($id: Int!) {
      deleteUser(id: $id) {
        id
      }
    }
  `
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onError: (error) => {
      console.log('onError', error, error.message)
      toast.error(error.message || `error occured`)
    },
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }
  return (
    <>
      {/*<Table
        data={users}
        meta={meta}
        query={QUERY}
        deleteMutation={DELETE_USER_MUTATION}
      />*/}
      <div className="bg-white pb-4 px-4 rounded-md w-full">
        <div className="flex justify-between w-full pt-6 ">
          <p className="ml-3"> Users Table</p>
          <svg
            width="14"
            height="4"
            viewBox="0 0 14 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.4">
              <circle cx="2.19796" cy="1.80139" r="1.38611" fill="#222222" />
              <circle cx="11.9013" cy="1.80115" r="1.38611" fill="#222222" />
              <circle cx="7.04991" cy="1.80115" r="1.38611" fill="#222222" />
            </g>
          </svg>
        </div>
        <div className="w-full flex justify-end px-2 mt-2">
          <div className="w-full sm:w-64 inline-block relative ">
            <input
              type=""
              name=""
              className="leading-snug border border-gray-300 block w-full appearance-none bg-gray-100 text-sm text-gray-600 py-1 px-4 pl-8 rounded-lg"
              placeholder="Search"
            />

            <div className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">
              <svg
                className="fill-current h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 511.999 511.999"
              >
                <path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                <th className="px-4 py-2 ">Name</th>
                <th className="px-4 py-2 ">Updated</th>
                <th className="px-4 py-2 ">Created</th>
                <th className="px-4 py-2 "></th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td className="border px-4 py-2 align-bottom">
                      <Link to={routes.user({ id: user.id })}>
                        <div className="flex">
                          {webProperties.avatars.active && (
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src={webProperties.avatars.image(user.md5Email)}
                                alt={user.name}
                              />
                            </div>
                          )}
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="border px-4 py-2">{user.updatedAt}</td>
                    <td className="border px-4 py-2">{user.createdAt}</td>
                    <td className="border px-4 py-2 text-red-300 hover:text-red-700">
                      <button onClick={() => onDeleteClick(user.id)}>
                        <svg
                          className="h-10"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          stroke="currentColor"
                        >
                          <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              })}
              <tr>
                <td colSpan="4" className="border px-4 py-2 align-bottom">
                  <Link to={routes.newUser()}>
                    <div className="">
                      <div className="ml-3">
                        <p className="submit-button px-4 py-3 rounded-full bg-green-400 hover:bg-green-700 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                          Create User
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          id="pagination"
          className="w-full flex justify-center border-t border-gray-100 pt-4 items-center"
        >
          <svg
            className="h-6 w-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.4">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 12C9 12.2652 9.10536 12.5196 9.29289 12.7071L13.2929 16.7072C13.6834 17.0977 14.3166 17.0977 14.7071 16.7072C15.0977 16.3167 15.0977 15.6835 14.7071 15.293L11.4142 12L14.7071 8.70712C15.0977 8.31659 15.0977 7.68343 14.7071 7.29289C14.3166 6.90237 13.6834 6.90237 13.2929 7.29289L9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12Z"
                fill="#2C2C2C"
              />
            </g>
          </svg>

          <p className="leading-relaxed cursor-pointer mx-2 text-blue-600 hover:text-blue-600 text-sm">
            1
          </p>
          <p className="leading-relaxed cursor-pointer mx-2 text-sm hover:text-blue-600">
            2
          </p>
          <p className="leading-relaxed cursor-pointer mx-2 text-sm hover:text-blue-600">
            {' '}
            3{' '}
          </p>
          <p className="leading-relaxed cursor-pointer mx-2 text-sm hover:text-blue-600">
            {' '}
            4{' '}
          </p>
          <svg
            className="h-6 w-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 12C15 11.7348 14.8946 11.4804 14.7071 11.2929L10.7071 7.2929C10.3166 6.9024 9.6834 6.9024 9.2929 7.2929C8.9024 7.6834 8.9024 8.3166 9.2929 8.7071L12.5858 12L9.2929 15.2929C8.9024 15.6834 8.9024 16.3166 9.2929 16.7071C9.6834 17.0976 10.3166 17.0976 10.7071 16.7071L14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12Z"
              fill="#18A0FB"
            />
          </svg>
        </div>
      </div>
    </>
  )
}

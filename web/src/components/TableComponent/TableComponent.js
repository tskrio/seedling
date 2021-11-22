import { useTable, useSortBy } from 'react-table'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { Link } from '@redwoodjs/router'

const TableComponent = ({
  title,
  columns,
  data,
  queries,
  routes,
  display,
  roles,
  queryVariables,
}) => {
  //  console.log('columns', columns)
  //  console.log('data', data)
  //  console.log('queries', queries)
  //  console.log('routes', routes)
  //  console.log('display', display)
  //  console.log('roles', roles)
  //  console.log('queryVariables', queryVariables)

  const { hasRole } = useAuth()

  data = data.map((row) => {
    return {
      ...row,
      actions: (
        <div className="flex">
          {hasRole(roles.updateRecord.concat(['admin'])) && (
            <span className="p-1 w-full">
              <Link
                className="rw-button rw-button-blue"
                to={routes.editRecord({ id: row.id })}
                title={`Edit ${row[display]}`}
              >
                Edit
              </Link>
            </span>
          )}
          {hasRole(roles.deleteRecord.concat(['admin'])) && (
            <span className="p-1 w-full">
              <button
                type="button"
                title={'Delete ' + row[display]}
                className="rw-button rw-button-red w-full"
                onClick={() => onDeleteClick(row.id, `${row[display]}`)}
              >
                Delete
              </button>
            </span>
          )}
        </div>
      ),
    }
  })

  columns = React.useMemo(() => columns, [])
  data = React.useMemo(() => data, [])
  const [deleteRecord] = useMutation(queries.DELETEMUTATION, {
    onError: (error) => {
      console.log('onError', error, error.message)
      toast.error(error.message || `Error - not deleted`)
    },
    onCompleted: (something) => {
      console.log(`${JSON.stringify(something)}`)
      toast.success(`deleted`)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [
      {
        query: queries.QUERY,
        variables: {
          id: queryVariables,
          /*not sure how to get the query variables */
        },
      },
    ],
    awaitRefetchQueries: true,
  })
  const onDeleteClick = (id, display) => {
    if (confirm(`Are you sure you want to delete ${display}?`)) {
      deleteRecord({ variables: { id } })
    }
  }

  const tableInstance = useTable({ columns, data }, useSortBy)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  /**
     * if (hasRole(roles.createRecord.concat(['admin']))) {
    data.push({
      actions: (
        <div className="flex">
          <span className="pt-1 pl-1 pr-1 w-full">
            <Link
              className="rw-button rw-button-green"
              to={routes.createRecord({ id: queryVariables })}
            >
              New Record
            </Link>
          </span>
        </div>
      ),
    })
  }
     */
  return (
    <div className="pt-4">
      <div className="bg-white pb-4 px-4 rounded-md w-full shadow-lg">
        {/**Title Below */}
        <div className="flex justify-between w-full pt-6 ">
          <p className="ml-3"> {title}</p>
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
        {/**Title Above */}
        {/**Search Below */}
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
        {/**Search Above */}
        <div className="overflow-x-auto mt-6">
          {/*/ apply the table props*/}
          <table
            {...getTableProps()}
            className="table-auto border-collapse w-full"
          >
            <thead>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup) => (
                  // Apply the header row props
                  <tr
                    key={headerGroup.key}
                    {...headerGroup.getHeaderGroupProps()}
                    className="rounded-lg text-sm font-medium text-gray-700 text-left"
                  >
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props
                        <th
                          key={column.key}
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {
                            // Render the header
                            column.render('Header')
                          }
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' Z➡️A'
                                : ' A➡️Z'
                              : ''}
                          </span>
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
              {
                // Loop over the table rows
                rows.map((row) => {
                  // Prepare the row for display
                  prepareRow(row)
                  return (
                    // Apply the row props
                    <tr
                      key={row.key}
                      {...row.getRowProps()}
                      className="border px-4 py-2"
                    >
                      {
                        // Loop over the rows cells
                        row.cells.map((cell) => {
                          // Apply the cell props
                          return (
                            <td key={cell.key} {...cell.getCellProps()}>
                              {
                                // Render the cell contents
                                cell.render('Cell')
                              }
                            </td>
                          )
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="flex flex-row-reverse">
          <span className="p-1 w-full">
            <Link
              className="rw-button rw-button-green w-full"
              to={routes.createRecord({ id: queryVariables })}
            >
              New Record
            </Link>
          </span>
        </div>
        {/**Pagination Below */}
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
        {/**Pagination Above */}
      </div>
    </div>
  )
}

export default TableComponent

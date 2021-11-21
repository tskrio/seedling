import { useTable } from 'react-table'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { Link } from '@redwoodjs/router'

const TableComponent = ({
  columns,
  data,
  queries,
  routes,
  display,
  roles,
  queryVariables,
}) => {
  console.log('columns', columns)
  console.log('data', data)
  console.log('queries', queries)
  console.log('routes', routes)
  console.log('display', display)
  console.log('roles', roles)
  console.log('queryVariables', queryVariables)

  const { hasRole } = useAuth()

  data = data.map((row) => {
    return {
      ...row,
      actions: (
        <>
          {hasRole(roles.updateRecord.concat(['admin'])) && (
            <span>
              <Link
                className="rw-button rw-button-blue"
                to={routes.editRecord({ id: row.id })}
                title={`Edit ${row[display]}`}
              >
                Edit {row[display]}
              </Link>
            </span>
          )}
          {hasRole(roles.deleteRecord.concat(['admin'])) && (
            <span>
              <button
                type="button"
                title={'Delete ' + row[display]}
                className="rw-button rw-button-red"
                onClick={() => onDeleteClick(row.id, `${row[display]}`)}
              >
                Delete {row[display]}
              </button>
            </span>
          )}
        </>
      ),
    }
  })
  if (hasRole(roles.createRecord.concat(['admin']))) {
    data.push({
      actions: (
        <Link
          className="rw-button rw-button-green"
          to={routes.createRecord({ id: queryVariables })}
        >
          New Record
        </Link>
      ),
    })
  }
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

  const tableInstance = useTable({ columns, data })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    // apply the table props
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr key={headerGroup.key} {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th key={column.key} {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render('Header')
                    }
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
              <tr key={row.key} {...row.getRowProps()}>
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
  )
}

export default TableComponent

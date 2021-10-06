import { useMutation } from '@redwoodjs/web'
import { Link } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { UPDATE_USER_MUTATION } from 'src/components/User/EditUserCell'
import TableHeaderColumn from 'src/components/TableHeaderColumn'
import TableCell from 'src/components/TableCell'
import UserPreferencesModal from 'src/components/UserPreferencesModal'
const Table = ({ data, meta, query, deleteMutation }) => {
  const { currentUser } = useAuth()
  let altText = 'Find me in ./web/src/components/Table/Table.js'
  const [updateUserPreferences] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User preferences updated.')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const [deleteGroup] = useMutation(deleteMutation, {
    onCompleted: () => {
      toast.success(`${meta.labels.single} deleted`)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: query }],
    awaitRefetchQueries: true,
  })
  let filteredColumns = (columns, userColumns) => {
    //console.log('columns', typeof columns, columns)
    //console.log('userColumns', typeof userColumns, userColumns)
    if (userColumns) {
      if (typeof userColumns === 'string') {
        userColumns = userColumns.split(',')
      }
      let userColumnsArr = []
      userColumns.forEach((columnName) => {
        columns.forEach((column) => {
          if (column.key === columnName) {
            userColumnsArr.push(column)
          }
        })
      })
      return userColumnsArr
    } else {
      return columns
    }
  }
  let usersColumns = filteredColumns(
    meta.columns,
    currentUser.preferences[meta.labels.single + 'Fields']
  )
  const onDeleteClick = (id, display) => {
    if (confirm('Are you sure you want to delete group ' + display + '?')) {
      deleteGroup({ variables: { id } })
    }
  }

  let tableHeaderRow = (columns) => {
    return (
      <thead>
        <tr>
          {columns.map((column, index) => {
            return (
              <TableHeaderColumn
                key={index}
                column={column}
                meta={meta}
                query={query}
                userColumns={usersColumns}
              />
            )
          })}

          <th key="actions">
            Actions
            <button onClick={resetUserFields}>Reset Columns</button>
            <UserPreferencesModal
              allColumns={meta.columns}
              myColumns={columns}
            />
          </th>
        </tr>
      </thead>
    )
  }
  let tableBodyRows = (rows, columns) => {
    return (
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row.id}>
              {columns.map((column, columnIndex) => {
                {
                  if (columnIndex === 0) {
                    return (
                      <td key={column.key}>
                        <Link to={meta.routes.view({ id: row.id })}>
                          <TableCell
                            type={column.type}
                            row={row}
                            column={column}
                          />
                        </Link>
                      </td>
                    )
                  } else {
                    return (
                      <td key={column.key}>
                        <TableCell
                          type={column.type}
                          row={row}
                          column={column}
                        />
                      </td>
                    )
                  }
                }
                //return <td key={column.key}>{row[column.key]}</td>
              })}
              <td key="actions">
                <div className="table-actions">
                  <Link
                    to={meta.routes.edit({ id: row[meta.key] })}
                    title={
                      'Edit ' + row[meta.display] + ' ' + meta.labels.single
                    }
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={
                      'Delete ' + row[meta.display] + ' ' + meta.labels.single
                    }
                    className="table-action-delete"
                    onClick={() =>
                      onDeleteClick(row[meta.key], row[meta.display])
                    }
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
        <tr>
          <td colSpan={meta.columns.length + 1}>
            <Link to={meta.routes.newItem()}>
              Create new {meta.labels.single}
            </Link>
          </td>
        </tr>
      </tbody>
    )
  }

  let resetUserFields = () => {
    //updateUser ({id, input})
    //{"groupFields":["createdAt","name"]}
    if (
      typeof currentUser.preferences[meta.labels.single + 'Fields'] !==
      'undefined'
    ) {
      console.log(currentUser)
      delete currentUser.preferences[meta.labels.single + 'Fields']
      console.log(currentUser)
      updateUserPreferences({
        variables: {
          id: currentUser.id,
          input: { preferences: currentUser.preferences },
        },
        // This refetches the query on the list page. Read more about other ways to
        // update the cache over here:
        // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
        refetchQueries: [{ query: query }],
        awaitRefetchQueries: true,
      })
    }
  }
  return (
    <div src={altText}>
      <h2>{meta.title}</h2>
      <div className="hidden">
        Fields from User preferences:
        {JSON.stringify(currentUser.preferences[meta.labels.single + 'Fields'])}
        <br />
        Fields after filtering:
        {JSON.stringify(usersColumns)}
      </div>
      <table>
        {tableHeaderRow(usersColumns)}
        {tableBodyRows(data, usersColumns)}
      </table>
    </div>
  )
}

export default Table

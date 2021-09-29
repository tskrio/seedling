import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
const Table = ({ data, meta, query, deleteMutation, updateMutation }) => {
  const { currentUser } = useAuth()
  let altText = 'Find me in ./web/src/components/Table/Table.js'
  const [updateUserPreferences] = useMutation(updateMutation, {
    onCompleted: () => {
      toast.success('User preferences updated.')
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
  const onDeleteClick = (id, display) => {
    if (confirm('Are you sure you want to delete group ' + display + '?')) {
      deleteGroup({ variables: { id } })
    }
  }
  const timeTag = (datetime) => {
    return (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime)
          .toLocaleString('en-CA', { hour12: false })
          .replace(',', '')
          .replace(/:\d{2}$/, ' ')}
      </time>
    )
  }
  let tableHeaderRow = (columns) => {
    return (
      <thead>
        <tr>
          {columns.map((column) => {
            return (
              <th key={column.key}>
                {column.label}
                <button onClick={() => removeField(column.key)}>Remove</button>
              </th>
            )
          })}
          <th key="actions">
            Actions ...
            <button onClick={resetUserFields}>Reset Columns</button>
          </th>
        </tr>
      </thead>
    )
  }
  let tableCell = (type, value) => {
    if (type === 'date') {
      return timeTag(value)
    } else if (type === 'boolean') {
      return value ? 'Yes' : 'No'
    } else {
      return value
    }
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
                        <Link to={routes[meta.routes.view]({ id: row.id })}>
                          {tableCell(column.type, row[column.key])}
                        </Link>
                      </td>
                    )
                  } else {
                    return (
                      <td key={column.key}>
                        {tableCell(column.type, row[column.key])}
                      </td>
                    )
                  }
                }
                //return <td key={column.key}>{row[column.key]}</td>
              })}
              <td key="actions">
                <div className="table-actions">
                  <Link
                    to={routes[meta.routes.edit]({ id: row[meta.key] })}
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
            <Link to={routes[meta.routes.newItem]()}>
              Create new {meta.labels.single}
            </Link>
          </td>
        </tr>
      </tbody>
    )
  }
  let filteredColumns = (columns, userColumns) => {
    if (userColumns) {
      return columns.filter((column) => {
        return userColumns.includes(column.key)
      })
    } else {
      return columns
    }
  }
  let usersColumns = filteredColumns(
    meta.columns,
    currentUser.preferences[meta.labels.single + 'Fields']
  )
  let removeField = (field) => {
    console.log('removing field', field, usersColumns)
    let newColumns = usersColumns.filter((column) => {
      return column.key !== field
    })
    console.log('newColumns', newColumns)
    let justColumns = newColumns.map((column) => {
      return column.key
    })
    currentUser.preferences[meta.labels.single + 'Fields'] = justColumns
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
      <div>Query?</div>
      <div>
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

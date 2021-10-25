import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { UPDATE_USER_MUTATION } from 'src/components/User/EditUserCell'

import './table.css'
const Table = ({ data, meta, query, queryVariables, deleteMutation }) => {
  let queryList
  if (typeof queryVariables === 'undefined') {
    queryVariables = {}
    queryList = ''
  } else {
    queryList = JSON.stringify(queryVariables)
  }
  const { currentUser, hasRole } = useAuth()
  //console.log(data)
  let altText = 'Find me in ./web/src/components/Table/Table.js'
  const [updateUserPreferences] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User preferences updated.')
    },
  })
  const [deleteRecord] = useMutation(deleteMutation, {
    onError: () => {
      toast.error(`${meta.labels.single} not deleted - error occured`)
    },
    onCompleted: () => {
      toast.success(`${meta.labels.single} deleted`)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: query, variables: queryVariables }],
    awaitRefetchQueries: true,
  })
  const onDeleteClick = (id, display) => {
    if (confirm(`Are you sure you want to delete ${display}?`)) {
      deleteRecord({ variables: { id } })
    }
  }

  const getProps = (path, context) => {
    context = context || this
    path = path.split('.')
    path.forEach((pathString, index) => {
      context = context[path[index]]
    })
    return context
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
                <span>{column.label}</span>
                <span className="context-menu">
                  <button
                    id={meta.labels.single + '.' + column.key + '._button'}
                    onClick={() =>
                      showActions(meta.labels.single + '.' + column.key)
                    }
                  >
                    ⋮
                  </button>
                  <ul
                    id={meta.labels.single + '.' + column.key}
                    className="hidden"
                  >
                    <li>
                      <button
                        onClick={() =>
                          showActions(meta.labels.single + '.' + column.key)
                        }
                      >
                        Close Menu
                      </button>
                    </li>
                    <li>
                      <button onClick={() => removeField(column.key)}>
                        Hide {column.label}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          toast.success(`MOCK:Sorted ${column.key} Ascending`)
                        }
                      >
                        Sort Ascending
                      </button>
                    </li>
                  </ul>
                </span>
              </th>
            )
          })}
          <th key="actions">
            <span>Actions</span>
            <span className="context-menu">
              <button
                className=""
                id={meta.labels.single + '._actions._button'}
                onClick={() => showActions(meta.labels.single + '._actions')}
              >
                ⋮
              </button>
              <ul id={meta.labels.single + '._actions'} className="hidden">
                <li>
                  <button
                    onClick={() =>
                      showActions(meta.labels.single + '._actions')
                    }
                  >
                    Close Menu
                  </button>
                </li>
                <li>
                  <button onClick={resetUserFields}>Reset Columns</button>
                </li>
              </ul>
            </span>
          </th>
        </tr>
      </thead>
    )
  }
  let tableCell = (type, row, key) => {
    if (type === 'date') {
      return timeTag(row[key])
    } else if (type === 'boolean') {
      return row[key] ? 'Yes' : 'No'
    } else if (type === 'reference') {
      return getProps(key, row)
    } else {
      return row[key]
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
                        <Link to={meta.routes.view({ id: row.id })}>
                          {tableCell(column.type, row, column.key)}
                        </Link>
                      </td>
                    )
                  } else {
                    return (
                      <td key={column.key}>
                        {tableCell(column.type, row, column.key)}
                        {/*TODO: Add Context menu here...*/}
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
        {hasRole(meta.createRoles.concat(['admin'])) && (
          <tr>
            <td colSpan={meta.columns.length + 1}>
              <Link to={meta.routes.newItem()}>
                Create new {meta.labels.single}
              </Link>
            </td>
          </tr>
        )}
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
    //console.log('newColumns', newColumns)
    let justColumns = newColumns.map((column) => {
      return column.key
    })
    currentUser.preferences[meta.labels.single + 'Fields'] = justColumns
    //console.log('queryVariables', queryVariables)
    updateUserPreferences({
      variables: {
        id: currentUser.id,
        input: { preferences: currentUser.preferences },
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: query, variables: queryVariables }],
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
      //console.log(currentUser)
      delete currentUser.preferences[meta.labels.single + 'Fields']
      //console.log(currentUser)
      updateUserPreferences({
        variables: {
          id: currentUser.id,
          input: { preferences: currentUser.preferences },
        },
        // This refetches the query on the list page. Read more about other ways to
        // update the cache over here:
        // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
        refetchQueries: [{ query: query, variables: queryVariables }],
        awaitRefetchQueries: true,
      })
    }
  }
  let showActions = (key) => {
    let menu = document.getElementById(key)
    menu.classList.toggle('hidden')
    let button = document.getElementById(key + '._button')
    button.classList.toggle('hidden')
  }
  return (
    <div src={altText}>
      <header className="rw-header">
        <h2>{meta.title}</h2>
        {hasRole(meta.createRoles.concat(['admin'])) && (
          <Link
            to={meta.routes.newItem()}
            className="rw-button rw-button-green"
          >
            <div className="rw-button-icon">+</div> New {meta.labels.single}
          </Link>
        )}
      </header>
      <div>Query: {queryList}</div>
      <table>
        {tableHeaderRow(usersColumns)}
        {tableBodyRows(data, usersColumns)}
      </table>
    </div>
  )
}

export default Table

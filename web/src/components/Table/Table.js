import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

const Table = ({ data, meta, query, deleteMutation }) => {
  let altText = 'Find me in ./web/src/components/Table/Table.js'
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
  return (
    <div src={altText}>
      <h2>{meta.title}</h2>
      <table>
        <thead>
          <tr>
            {meta.columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            <th key="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row[meta.key]}>
              {meta.columns.map((column, columnIndex) => (
                <td key={column.key}>
                  {columnIndex === 0 ? (
                    <>
                      <Link to={routes.group({ id: row.id })}>
                        {row[column.key]}
                      </Link>
                    </>
                  ) : (
                    <>
                      {column.type === 'date' && (
                        <>{timeTag(row[column.key])}</>
                      )}
                      {column.type === 'string' && <>{row[column.key]}</>}
                    </>
                  )}
                </td>
              ))}
              <td key="actions">
                <div className="table-actions">
                  <Link
                    to={routes.editGroup({ id: row[meta.key] })}
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
          ))}
          <tr>
            <td colSpan={meta.columns.length + 1}>
              <Link to={routes.newGroup()}>
                Create new {meta.labels.single}
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table

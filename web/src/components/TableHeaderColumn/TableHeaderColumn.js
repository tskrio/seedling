import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { UPDATE_USER_MUTATION } from 'src/components/User/EditUserCell'
const TableHeaderColumn = (data) => {
  const { currentUser } = useAuth()
  let altText =
    'Find me in ./web/src/components/TableHeaderColumn/TableHeaderColumn.js'
  const [updateUserPreferences] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User preferences updated.')
    },
  })
  let removeField = (field) => {
    console.log('userColumns', data.userColumns)
    let columnsArray = data.userColumns.map((column) => {
      return column.key
    })
    console.log('columnsArray', columnsArray)
    ///let usersColumns =
    //  currentUser.preferences[data.meta.labels.single + 'Fields']
    console.log('removing field', field)
    let newColumns = data.userColumns.filter((column) => {
      return column.key !== field
    })
    console.log('newColumns', newColumns)
    let justColumns = newColumns.map((column) => {
      return column.key
    })
    currentUser.preferences[data.meta.labels.single + 'Fields'] = justColumns
    updateUserPreferences({
      variables: {
        id: currentUser.id,
        input: { preferences: currentUser.preferences },
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: data.query }],
      awaitRefetchQueries: true,
    })
  }
  return (
    <th alt={altText} key={data.column.key}>
      <span>{data.column.label}</span>
      <span>⋮</span>
      <button
        alt={`Hiding ${data.column.key} on ${data.meta.labels.single} table`}
        title={`Hiding ${data.column.key} on ${data.meta.labels.single} table`}
        onClick={() => removeField(data.column.key)}
      >
        Remove
      </button>
    </th>
  )
}

export default TableHeaderColumn

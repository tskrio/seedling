import { Link } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { Button, Tbody, Td } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const TableRows = ({
  columns,
  deleteRoles,
  setData,
  data,
  deleteMutation,
  displayColumn,
}) => {
  const { hasRole /*currentUser*/ } = useAuth()
  let handleDeleteItem = (event) => {
    let id = parseInt(event.target.value, 10)
    let foundRow = data.results.filter((user) => {
      return user.id === id
    })
    let question = `Are you sure you want to delete ${foundRow[0][displayColumn]}?`
    if (confirm(question)) {
      deleteRecord({ variables: { id } })
      setData({
        ...data,
        results: data.results.filter((row) => {
          return !(row.id === id)
        }),
        count: data.count - 1,
      })
    }
  }

  const [deleteRecord] = useMutation(deleteMutation, {
    onError: (error) => {
      toast.error(error.message || `Error - not deleted`)
    },
    onCompleted: (del) => {
      toast.success(`Deleted ${del.deletedRow[displayColumn]}`)
    },
  })

  let rowsOutput = data.results.map((row) => {
    //console.log(row)
    if (hasRole(deleteRoles.concat(['admin']))) {
      try {
        row.actions = (
          <Button
            value={row.id}
            onClick={handleDeleteItem}
            leftIcon={<CloseIcon />}
            colorScheme="red"
            variant="solid"
            type="button"
            size="xs"
          >
            Remove
          </Button>
        )
      } catch (e) {
        console.log('error', e)
      }
    }
    let _elements = columns.map((column) => {
      let key = `${row.id}_${column.accessor}`

      if (column.aggregate) {
        let _value = row[column.accessor]
        //let nestedElements = _value.map((relatedRecord) => {
        //  console.log(relatedRecord)
        //  return relatedRecord?.[column.model]?.[column.field]
        //})
        let nestedElements = row[column.accessor].length
        if (column.link) {
          nestedElements = (
            <Link to={column.link(row.id)}>{nestedElements}</Link>
          )
        }
        return <Td key={key}>{nestedElements}</Td>
      } else if (column.reference) {
        return <Td key={key}>{row[column.accessor][column.field]}</Td>
      } else if (column.link) {
        return (
          <Td key={key}>
            <Link title={row[column.accessor]} to={column.link(row.id)}>
              {row[column.accessor]}
            </Link>
          </Td>
        )
      } else {
        return <Td key={key}>{row[column.accessor]}</Td>
      }
    })
    return (
      <tr className={`${row.id}_row`} key={row.id}>
        {_elements}
      </tr>
    )
  })

  return <Tbody>{rowsOutput}</Tbody>
}

export default TableRows

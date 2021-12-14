import { Link, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import {
  Button,
  Tbody,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const TableRows = ({
  columns,
  roles,
  setData,
  data,
  deleteMutation,
  displayColumn,
  model,
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
    if (hasRole([roles.deleteRecord].concat(['admin']))) {
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
      let showMatchingOrFilterOut = column.showMatching || column.filterOut
      let showMatchingOrFilterOutMenu = (() => {
        if (column.showMatching || column.filterOut) {
          //console.log(row, column)
          let value = row[column.accessor]
          if (column.field) value = row[column.accessor][column.field]
          return (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                {column.showMatching && (
                  <MenuItem
                    onClick={() => {
                      navigate(column.showMatching(model, column, value))
                    }}
                  >
                    Show Matching
                  </MenuItem>
                )}

                {column.filterOut && (
                  <MenuItem
                    onClick={() => {
                      navigate(column.filterOut(model, column, value))
                    }}
                  >
                    Filter Out
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          )
        }
      })()
      if (column.aggregate) {
        let nestedElements = row[column.accessor].length
        if (column.link) {
          nestedElements = (
            <Link to={column.link(row.id)}>{nestedElements}</Link>
          )
        }
        return <Td key={key}>{nestedElements}</Td>
      } else if (column.reference) {
        return (
          <Td key={key}>
            <Text>{row[column.accessor][column.field]}</Text>
            {showMatchingOrFilterOut && showMatchingOrFilterOutMenu}
          </Td>
        )
      } else if (column.link) {
        return (
          <Td key={key}>
            <Link title={row[column.accessor]} to={column.link(row.id)}>
              {row[column.accessor]}
            </Link>

            {showMatchingOrFilterOut && showMatchingOrFilterOutMenu}
          </Td>
        )
      } else {
        return (
          <Td key={key}>
            <Text>{row[column.accessor]}</Text>
            {showMatchingOrFilterOut && showMatchingOrFilterOutMenu}
          </Td>
        )
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

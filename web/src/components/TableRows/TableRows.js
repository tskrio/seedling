import { Link, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import {
  Button,
  Box,
  Flex,
  Tbody,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
    let foundRow = data.results?.filter((user) => {
      return user.id === id
    })
    let question = `Are you sure you want to delete ${foundRow[0][displayColumn]}?`
    if (confirm(question)) {
      deleteRecord({ variables: { id } })
      setData({
        ...data,
        results: data.results?.filter((row) => {
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
  let menu = (row, column) => {
    let value = row[column.accessor]
    if (column.field) value = row[column.accessor][column.field]
    let rowActions = []
    if (column.showMatching)
      rowActions.push(
        <MenuItem
          key={'showMatching'}
          onClick={() => {
            navigate(column.showMatching(model, column, value))
          }}
        >
          Show Matching {column.Header}
        </MenuItem>
      )
    if (column.filterOut)
      rowActions.push(
        <MenuItem
          key={'filterOut'}
          onClick={() => {
            navigate(column.filterOut(model, column, value))
          }}
        >
          Filter Out {column.Header}
        </MenuItem>
      )
    if (column.copy)
      rowActions.push(
        <MenuItem
          key={'copy'}
          onClick={() => {
            column.copy(value)
          }}
        >
          Copy {value}
        </MenuItem>
      )
    if (rowActions.length > 0)
      return (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            size="sm"
          />
          <MenuList>{rowActions}</MenuList>
        </Menu>
      )
    return <></>
  }
  let element = (row, column) => {
    let nestedElements = row[column?.accessor]?.length
    if (column.aggregate && column.link)
      return <Link to={column.link(row.id)}>{nestedElements}</Link>
    if (column.aggregate) return { nestedElements }
    if (column.reference && column.link)
      return (
        <>
          {menu(row, column)}
          <Box p="2">
            <Link to={column.link(row.id)}>
              {row[column.accessor][column.field]}
            </Link>
          </Box>
        </>
      )
    if (column.reference) {
      return (
        <>
          {menu(row, column)}
          <Box p="2">{row[column.accessor][column.field]}</Box>
        </>
      )
    }
    if (column.link)
      return (
        <>
          {menu(row, column)}
          <Box p="2">
            <Link title={row[column.accessor]} to={column.link(row.id)}>
              {row[column.accessor]}
            </Link>
          </Box>
        </>
      )
    if (row?.[column.accessor])
      return (
        <>
          {menu(row, column)}
          <Box p="2">{row[column.accessor]}</Box>
        </>
      )

    if (column.accessor === 'actions') {
      if (hasRole([roles.deleteRecord].concat(['admin']))) {
        return (
          <Box p="2">
            <Button
              value={row.id}
              onClick={handleDeleteItem}
              leftIcon={<CloseIcon />}
              colorScheme="red"
              variant="solid"
              type="button"
              size="sm"
            >
              Remove
            </Button>
          </Box>
        )
      }
    }
  }

  return (
    <Tbody>
      {data.results?.map((row) => {
        return (
          <tr className={`${row.id}_row`} key={row.id}>
            {columns.map((column) => {
              return (
                <Td key={`${row.id}_${column.accessor}`}>
                  <Flex>{element(row, column)}</Flex>
                </Td>
              )
            })}
          </tr>
        )
      })}
    </Tbody>
  )
}

export default TableRows

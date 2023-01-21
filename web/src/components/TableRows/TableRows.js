import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Tbody,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
} from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link, navigate } from '@redwoodjs/router'

import DeleteButton from '../DeleteButton/DeleteButton'
import EditButton from '../EditButton/EditButton'
import ShareButton from '../ShareButton/ShareButton'

const TableRows = ({
  columns,
  roles,
  setData,
  data,
  deleteMutation,
  displayColumn,
  model,
}) => {
  const { hasRole } = useAuth()

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
            marginLeft={1}
            marginTop={1}
            marginRight={1}
          />
          <MenuList>{rowActions}</MenuList>
        </Menu>
      )
    return <></>
  }
  let element = (row, column) => {
    let buttonProps = {
      column,
      row,
      roles,
      data,
      setData,
      hasRole,
      deleteMutation, //only needed for delete
      displayColumn, //only needed for delete
    }
    let nestedElements = row[column?.accessor]?.length
    if (column.aggregate && column.link)
      return <Link to={column.link(row.cuid)}>{nestedElements}</Link>
    if (column.aggregate) return { nestedElements }
    if (column.reference && column.link) {
      return (
        <>
          {menu(row, column)}
          <Box p="2">
            <Link to={column.link(row[column.accessor].cuid)}>
              {row[column.accessor][column.field]}
            </Link>
          </Box>
        </>
      )
    }
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
            <Link title={row[column.accessor]} to={column.link(row.cuid)}>
              {column.dataType === 'timestamp' && (
                <Badge>
                  {new Date(row[column.accessor]).toLocaleString('en-CA')}{' '}
                </Badge>
              )}
              {column.dataType !== 'timestamp' && <>{row[column.accessor]}</>}
            </Link>
          </Box>
        </>
      )
    if (column.dataType === 'timestamp')
      return (
        <Badge colorScheme={'white'}>
          {new Date(row[column.accessor]).toLocaleString()}
        </Badge>
      )
    if (column.dataType === 'boolean') {
      let bool = 'false'
      if (row[column.accessor] === true) bool = 'true'
      return <Box p="2">{bool}</Box>
    }
    if (row?.[column.accessor])
      return (
        <>
          {menu(row, column)}
          <Box p="2">{row[column.accessor].toString()}</Box>
        </>
      )

    if (column.accessor === 'actions') {
      return (
        <Box p="2">
          <Flex gap={1}>
            <ShareButton {...buttonProps} />
            <EditButton {...buttonProps} />
            <DeleteButton {...buttonProps} />
          </Flex>
        </Box>
      )
    }
  }

  return (
    <Tbody>
      {data.results?.map((row) => {
        return (
          <tr className={`${row.cuid}_row`} key={row.cuid}>
            {columns.map((column) => {
              return (
                <Td key={`${row.cuid}_${column.accessor}`}>
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

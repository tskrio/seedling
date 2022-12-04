import { Fragment } from 'react'

import {
  TriangleUpIcon,
  TriangleDownIcon,
  CloseIcon,
  RepeatIcon,
  ChevronDownIcon,
  // DownloadIcon,
} from '@chakra-ui/icons'
import {
  Tr,
  Th,
  Thead,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Box,
} from '@chakra-ui/react'
const TableColumns = ({
  columns,
  orderBy,
  setOrderBy,
  setColumns,
  initialColumns,
  //take,
  setTake,
}) => {
  let headers = columns.map((column) => {
    let sortedAscending =
      JSON.stringify({ [column.accessor]: 'asc' }) === JSON.stringify(orderBy)
        ? 'a-z'
        : ''
    let sortedDescending =
      JSON.stringify({ [column.accessor]: 'desc' }) === JSON.stringify(orderBy)
        ? 'z-a'
        : ''
    let sorted = sortedAscending || sortedDescending
    let canDoSomething =
      column.canSort != false ||
      column.canRemove != false ||
      column.canReset === true ||
      column.canExport === true

    return (
      <Th p={3} bg={'grey.100'} key={column.accessor}>
        {!canDoSomething && <Text>{column.Header}</Text>}
        {canDoSomething && (
          <Menu p={0} m={0}>
            <MenuButton
              pl={2}
              pr={2}
              transition="all 0.2s"
              borderRadius="md"
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'gray.50' }}
              _focus={{ boxShadow: 'outline' }}
              fontSize={24}
            >
              <Box display="flex" w="100%">
                <Text>{column.Header}</Text>
                <ChevronDownIcon />
              </Box>
              <Box>{sorted}</Box>
            </MenuButton>
            <MenuList>
              {column.canSort != false && (
                <Fragment>
                  <MenuItem
                    icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({
                        [column.accessor]: 'asc',
                      })
                    }}
                  >
                    Sort A-Z
                  </MenuItem>

                  <MenuItem
                    icon={<TriangleDownIcon />}
                    onClick={() => {
                      setOrderBy({
                        [column.accessor]: 'desc',
                      })
                    }}
                  >
                    Sort Z-A
                  </MenuItem>
                </Fragment>
              )}
              {column.canRemove != false && (
                <MenuItem
                  icon={<CloseIcon />}
                  onClick={() => {
                    setColumns(
                      columns.filter((_column) => {
                        return _column.accessor != column.accessor
                      })
                    )
                  }}
                >
                  Remove Column
                </MenuItem>
              )}
              {column.canReset && (
                <MenuItem
                  icon={<RepeatIcon />}
                  onClick={() => {
                    setColumns(initialColumns)
                  }}
                >
                  Reset Columns
                </MenuItem>
              )}
              {/*{column.canExport && (
                <MenuItem
                  icon={<DownloadIcon />}
                  onClick={() => {
                    setColumns(initialColumns)
                  }}
                >
                  TODO:Export
                </MenuItem>
              )}*/}
              {column.canSetTake && (
                <Fragment>
                  {[10, 20, 50, 100].map((takeSize) => {
                    return (
                      <MenuItem
                        key={`take_${takeSize}`}
                        onClick={() => {
                          setTake(takeSize)
                        }}
                      >
                        Show {takeSize}
                      </MenuItem>
                    )
                  })}
                </Fragment>
              )}
            </MenuList>
          </Menu>
        )}
      </Th>
    )
  })
  return (
    <Thead>
      <Tr px={4} py={2} m={4}>
        {headers}
      </Tr>
    </Thead>
  )
}

export default TableColumns

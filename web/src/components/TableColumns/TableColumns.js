import { Fragment } from 'react'
import {
  Tr,
  Th,
  Thead,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import {
  TriangleUpIcon,
  TriangleDownIcon,
  CloseIcon,
  RepeatIcon,
  ChevronDownIcon,
  DownloadIcon,
} from '@chakra-ui/icons'
const TableColumns = ({
  columns,
  orderBy,
  setOrderBy,
  setColumns,
  initialColumns,
  take,
  setTake,
}) => {
  let headers = columns.map((column) => {
    let canDoSomething =
      column.canSort != false ||
      column.canRemove != false ||
      column.canReset === true ||
      column.canExport === true
    return (
      <Th key={column.accessor}>
        {!canDoSomething && <Text>{column.Header}</Text>}
        {canDoSomething && (
          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}
            >
              {column.Header} <ChevronDownIcon />
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
              {column.canExport && (
                <MenuItem
                  icon={<DownloadIcon />}
                  onClick={() => {
                    setColumns(initialColumns)
                  }}
                >
                  TODO:Export
                </MenuItem>
              )}
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
      <Tr>{headers}</Tr>
    </Thead>
  )
}

export default TableColumns

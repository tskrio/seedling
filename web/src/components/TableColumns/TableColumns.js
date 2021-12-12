import { Fragment } from 'react'
import { Tr, Th, IconButton } from '@chakra-ui/react'
import { TriangleUpIcon, TriangleDownIcon, CloseIcon } from '@chakra-ui/icons'
const TableColumns = ({ columns, orderBy, setOrderBy, setColumns }) => {
  let headers = columns.map((column) => {
    return (
      <Th key={column.accessor}>
        {column.Header}
        {column.canSort != false && (
          <Fragment>
            <IconButton
              onClick={() => {
                setOrderBy({
                  [column.accessor]: 'asc',
                })
              }}
              aria-label="Sort A-Z"
              size="xs"
              colorScheme={
                (JSON.stringify(orderBy) ==
                  JSON.stringify({ [column.accessor]: 'asc' }) &&
                  'teal') ||
                'blue'
              }
              icon={<TriangleUpIcon />}
            />
            <IconButton
              onClick={() => {
                setOrderBy({
                  [column.accessor]: 'desc',
                })
              }}
              aria-label="Sort Z-A"
              size="xs"
              colorScheme={
                (JSON.stringify(orderBy) ==
                  JSON.stringify({ [column.accessor]: 'desc' }) &&
                  'teal') ||
                'blue'
              }
              icon={<TriangleDownIcon />}
            />
          </Fragment>
        )}

        {column.canRemove != false && (
          <IconButton
            onClick={() => {
              setColumns(
                columns.filter((_column) => {
                  return _column.accessor != column.accessor
                })
              )
            }}
            aria-label="Remove Column"
            size="xs"
            colorScheme="red"
            icon={<CloseIcon />}
          />
        )}
      </Th>
    )
  })
  return <Tr>{headers}</Tr>
}

export default TableColumns

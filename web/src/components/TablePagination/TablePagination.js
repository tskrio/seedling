import { Fragment } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const TablePagination = ({ skip, setSkip }) => {
  return (
    <Fragment>
      <IconButton
        onClick={() => {
          setSkip(skip - 10)
        }}
        aria-label="Previous Page"
        icon={<ChevronLeftIcon />}
      />

      <IconButton
        onClick={() => {
          setSkip(skip + 10)
        }}
        aria-label="Next Page"
        icon={<ChevronRightIcon />}
      />
    </Fragment>
  )
}

export default TablePagination

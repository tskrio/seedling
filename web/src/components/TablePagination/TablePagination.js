import { Fragment } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const TablePagination = ({ skip, setSkip, take }) => {
  return (
    <Fragment>
      <IconButton
        onClick={() => {
          setSkip(skip - take)
        }}
        aria-label="Previous Page"
        icon={<ChevronLeftIcon />}
      />

      <IconButton
        onClick={() => {
          setSkip(skip + take)
        }}
        aria-label="Next Page"
        icon={<ChevronRightIcon />}
      />
    </Fragment>
  )
}

export default TablePagination

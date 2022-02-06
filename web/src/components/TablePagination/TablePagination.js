import { Fragment } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { MdFirstPage, MdLastPage } from 'react-icons/md'
const TablePagination = ({ count, skip, setSkip, take }) => {
  return (
    <Fragment>
      <Box>
        <Flex gap={1}>
          <IconButton
            onClick={() => {
              setSkip(0)
            }}
            aria-label="First Page"
            disabled={skip < take}
            icon={<MdFirstPage />}
          />
          <IconButton
            onClick={() => {
              setSkip(skip - take)
            }}
            aria-label="Previous Page"
            disabled={skip < take}
            icon={<ChevronLeftIcon />}
          />
          <IconButton
            onClick={() => {
              setSkip(skip + take)
            }}
            aria-label="Next Page"
            disabled={skip + take > count}
            icon={<ChevronRightIcon />}
          />
          <IconButton
            onClick={() => {
              setSkip(count - take)
            }}
            aria-label="Last Page"
            disabled={skip + take > count}
            icon={<MdLastPage />}
          />
        </Flex>
        <Text>
          {skip} - {take + skip} of {count}
        </Text>
      </Box>
    </Fragment>
  )
}

export default TablePagination

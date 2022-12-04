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
            colorScheme={'green'}
          />
          <IconButton
            onClick={() => {
              setSkip(skip - take)
            }}
            aria-label="Previous Page"
            disabled={skip < take}
            icon={<ChevronLeftIcon />}
            colorScheme={'green'}
          />
          <IconButton
            onClick={() => {
              setSkip(skip + take)
            }}
            aria-label="Next Page"
            disabled={skip + take > count}
            icon={<ChevronRightIcon />}
            colorScheme={'green'}
          />
          <IconButton
            onClick={() => {
              // results = 103
              // take = 10
              // i want to get 100-110
              // today  this results to 93
              // if 93%10 === 0 then return else
              // // figure out 3
              // return take + 93%10
              let calculatedTake = count - take
              if (calculatedTake % take === 0) {
                setSkip(count - take)
              }
              if (calculatedTake % take !== 0) {
                setSkip(count - (calculatedTake % take))
              }
            }}
            aria-label="Last Page"
            disabled={skip + take > count}
            icon={<MdLastPage />}
            colorScheme={'green'}
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

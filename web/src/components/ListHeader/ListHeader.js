import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'

import { ListContext } from 'src/App.js'

import ModalUpdatePageSize from './ModalUpdatePageSize'
const ListHeader = ({ table, count, total }) => {
  const { page, setPage, take, setTake, orderBy, setOrderBy } =
    React.useContext(ListContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
      <Heading>
        <Flex>
          {table}
          <Spacer />
          <Box fontSize={'sm'}>
            Showing{' '}
            <Button
              variant={'ghost'}
              size={'sm'}
              onClick={() => {
                onOpen()
              }}
            >
              {count}
              <ModalUpdatePageSize isOpen={isOpen} onClose={onClose} />
            </Button>{' '}
            of {total}
          </Box>
        </Flex>
      </Heading>
    </Box>
  )
}

export default ListHeader

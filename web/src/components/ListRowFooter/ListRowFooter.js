import {
  Box,
  Button,
  useDisclosure,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react'

import { ListContext } from 'src/App.js'
import FormCell from 'src/components/FormCell'

import ModalCreateNew from './ModalCreateNew'
import ModalJumpToPage from './ModalJumpToPage'
const ListRowFooter = ({ total }) => {
  const { table, page, setPage, take, setTake, orderBy, setOrderBy } =
    React.useContext(ListContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const totalPage = Math.ceil(total / take)
  const currentPage = parseInt(page, 10) || 1
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()
  return (
    <Flex>
      {/**WE're building first page, previous page, current page / total page, next page, last page row*/}
      <Button
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => {
          setPage(1)
        }}
      >
        First
      </Button>
      <Button
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => {
          setPage(currentPage - 1)
        }}
      >
        Previous
      </Button>
      <Box
        display={'inline-block'}
        fontWeight={'semibold'}
        /*align text on the bottom */
        alignItems={'center'}
      >
        <Button
          variant="ghost"
          alignItems={'center'}
          onClick={() => {
            onOpen()
            // openModal to select the page
          }}
        >
          {currentPage}
        </Button>
        <Text display={'inline-block'} alignItems={'center'}>
          {' '}
          / {totalPage}
        </Text>
      </Box>
      <ModalJumpToPage
        isOpen={isOpen}
        onClose={onClose}
        currentPage={currentPage}
      />
      <Button
        disabled={currentPage === totalPage}
        variant="ghost"
        onClick={() => {
          setPage(currentPage + 1)
        }}
      >
        Next
      </Button>
      <Button
        disabled={currentPage === totalPage}
        variant="ghost"
        onClick={() => {
          setPage(totalPage)
        }}
      >
        Last
      </Button>
      <Spacer />
      <Button variant="ghost" onClick={onCreateOpen}>
        Create New
      </Button>
      <ModalCreateNew isOpen={isCreateOpen} onClose={onCreateClose}>
        <FormCell table={table} />
      </ModalCreateNew>
    </Flex>
  )
}

export default ListRowFooter

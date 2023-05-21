import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Input,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { ListContext } from 'src/App.js'
const JumpToPageModal = ({ isOpen, onClose, currentPage }) => {
  const { page, setPage, take, setTake, orderBy, setOrderBy } =
    React.useContext(ListContext)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const onSubmit = async (data) => {
    console.log({ function: 'onSubmit', data })
    setPage(data.footerPage)
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Jump to Page</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl htmlFor={'footerPage'} isInvalid={errors.footerPage}>
              <Input
                id={'footerPage'}
                placeholder={`Enter Page Number (currently ${page})`}
                {...register('footerPage', { required: true })}
                defaultValue={currentPage}
                onChange={(e) => {
                  // if value > totalPage, set value to totalPage
                  if (e.target.value > totalPage) {
                    e.target.value = totalPage
                  }
                }}
              />
              <FormErrorMessage>
                {errors.footerPage && errors.footerPage.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default JumpToPageModal

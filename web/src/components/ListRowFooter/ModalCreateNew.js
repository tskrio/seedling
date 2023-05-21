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
const ModalCreateNew = ({ isOpen, onClose, table, children }) => {
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
  // TODO: Update this
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={'white'}>
        <ModalHeader>Create New</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/**figrue out how to allow closing modals from children */}
          {React.cloneElement(children, { onClose: onClose })}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalCreateNew

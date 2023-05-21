import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
const ModalEditRow = ({ isOpen, onClose, children, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
      <ModalOverlay />
      <ModalContent bg={'white'}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {/**<ModalBody>{children}</ModalBody>*/}
        {/*we need to pass along the onClose to the children*/}
        {/*children is not a function */}
        <ModalBody>{React.cloneElement(children, { onClose: onClose })}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalEditRow

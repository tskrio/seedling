import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Select,
} from '@chakra-ui/react'

import { ListContext } from 'src/App.js'
const UpdatePageSizeModal = ({ isOpen, onClose }) => {
  const { page, setPage, take, setTake, orderBy, setOrderBy } =
    React.useContext(ListContext)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Page Size</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            placeholder={`Select option (currently ${take})`}
            onChange={(e) => {
              setTake(e.target.value)
            }}
          >
            {[5, 10, 25, 50, 100].map((takeOption, index) => {
              return (
                <option key={index} value={takeOption}>
                  {takeOption}
                </option>
              )
            })}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default UpdatePageSizeModal

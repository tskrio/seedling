import { EditIcon, QuestionIcon } from '@chakra-ui/icons'
import { Tr, Td, IconButton, Code, useDisclosure, Flex } from '@chakra-ui/react'

import FormCell from 'src/components/FormCell'

import ModalDebug from './ModalDebug'
import ModalEditRow from './ModalEditRow'

const ListRow = ({ record, fields, table }) => {
  // loop over each record and return a <Tr> with <Td> for each property
  //console.log({ file: 'ListRow.js', function: 'ListRow', record, fields, table })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()
  let listKey = `listrow-${record.cuid}`
  return (
    <Tr key={`{listKey}-row`}>
      <Td>
        <Flex gap={1}>
          <IconButton
            colorScheme="blue"
            icon={<EditIcon />}
            onClick={onEditOpen}
          />
          <ModalEditRow
            isOpen={isEditOpen}
            onClose={onEditClose}
            title={`Edit ${table}`}
          >
            <FormCell table={table} cuid={record.cuid} />
          </ModalEditRow>
          <IconButton
            colorScheme="blue"
            icon={<QuestionIcon />}
            onClick={onOpen}
          />
        </Flex>
        <ModalDebug isOpen={isOpen} onClose={onClose}>
          <Code whiteSpace={'pre-wrap'}>{JSON.stringify(fields, null, 2)}</Code>
        </ModalDebug>
      </Td>
      {fields.map((field, index) => {
        // detaulf value is record[field.name]?.name || record[field.name]
        let value = record[field.name]?.name || record[field.name]
        if (field.type === 'DateTime') value = new Date(value).toLocaleString()
        return <Td key={`${listKey}-${field.name}-${index}`}>{value}</Td>
      })}
    </Tr>
  )
  //
}

export default ListRow

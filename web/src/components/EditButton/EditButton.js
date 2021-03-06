import { Box, IconButton } from '@chakra-ui/react'
import { navigate } from '@redwoodjs/router'
import { MdEditNote } from 'react-icons/md'
import { useAuth } from '@redwoodjs/auth'
const EditButton = ({ row, column, roles }) => {
  const { hasRole } = useAuth()
  return (
    <Box>
      {column.canEdit && hasRole([roles?.editRecord].concat(['admin'])) && (
        <IconButton
          aria-label="Edit"
          value={JSON.stringify(row)}
          onClick={() => {
            navigate(column.editLink(row.id))
          }}
          icon={<MdEditNote />}
          colorScheme="green"
          type="button"
        />
      )}
    </Box>
  )
}

export default EditButton

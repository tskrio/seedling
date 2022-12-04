import { Box, IconButton, useToast } from '@chakra-ui/react'
import { MdContentCopy, MdIosShare } from 'react-icons/md'

import { copy } from 'src/lib/atomicFunctions'
const ShareButton = ({ column, row }) => {
  const toast = useToast()
  let handleShareClick = (item) => {
    try {
      if (navigator.canShare) {
        navigator
          .share({
            title: item.title,
            text: `${item.title} from ${window.location.origin}`,
            url: item.url,
          })
          .then(() => {
            toast({
              status: 'success',
              title: `Shared!`,
              description: '...',
            })
          })
        return
      }
      if (!navigator.canShare) {
        copy(`${item.title} - ${item.url}`)

        toast({
          status: 'info',
          duration: 1000,
          title: 'Copied to clipboard',
        })
        return
      }

      if (!item) {
        toast({
          status: 'error',
          title: 'We had an issue when trying to share',
          duration: 1000,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box>
      {column?.canShare && (
        <IconButton
          aria-label="Share"
          onClick={() => {
            handleShareClick(row)
          }}
          icon={
            <>
              {navigator.canShare && <MdIosShare />}
              {!navigator.canShare && <MdContentCopy />}
            </>
          }
          colorScheme="blue"
          variant="solid"
          type="button"
          size="md"
        />
      )}
    </Box>
  )
}

export default ShareButton

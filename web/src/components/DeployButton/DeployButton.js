import { useEffect, useState } from 'react'

import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Button,
  //Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
const DeployButton = () => {
  function randomString(len, charSet) {
    charSet =
      charSet ||
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var randomString = ''
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length)
      randomString += charSet.substring(randomPoz, randomPoz + 1)
    }
    return randomString
  }
  let [secret, setSecret] = useState(randomString(64))
  let [database, setDatabase] = useState('HELLO')
  let updateSecret = (event) => {
    setSecret(event.target.value)
  }
  let updateDatabase = (event) => {
    setDatabase(event.target.value)
  }
  useEffect(() => {})
  let seedlingRepoUrl = `https://github.com/tskrio/seedling`
  let netlifyDeployUrl = `https://app.netlify.com/start/deploy?repository=${seedlingRepoUrl}#DATABASE_URL=${database}&SESSION_SECRET=${secret}`
  let netlifyDeployUrlWoSecret = `https://app.netlify.com/start/deploy?repository=${seedlingRepoUrl}#DATABASE_URL=ReplaceMe&SESSION_SECRET=ReplaceMe`
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor={'green'}
        rounded={'full'}
        size={'lg'}
        fontWeight={'normal'}
        px={6}
      >
        Deploy to Netlify
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Stack direction={{ base: 'column', sm: 'row' }}>
              <Heading>One more thing</Heading>
            </Stack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>
              Not quite a one-click setup as you will need a database, so go to
              your postgresql provider, if you{"'"}re not sure what one, try{' '}
              <Link href="https://railway.app/" isExternal>
                Railway
                <ExternalLinkIcon mx="2px" />
              </Link>{' '}
              These fields just update the link generated
            </Text>
            <FormControl>
              <FormLabel>Postgres Connection String</FormLabel>
              <Input
                //ref={initialRef}
                placeholder="postgres://user:password@server:port/postgres"
                onChange={(event) => updateDatabase(event)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Session Secret</FormLabel>
              <Input
                placeholder="Session Secret"
                defaultValue={secret}
                onChange={(event) => updateSecret(event)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Stack
              width={'100%'}
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Button
                as={Link}
                href={netlifyDeployUrl}
                backgroundColor={'green'}
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
              >
                Deploy Link with secrets
              </Button>
              <Spacer />

              <Button
                as={Link}
                href={netlifyDeployUrlWoSecret}
                backgroundColor={'green'}
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
              >
                Deploy Link without secrets
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeployButton

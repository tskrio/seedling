import { useState, useRef, useEffect, Fragment } from 'react'

import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from '@chakra-ui/react'
import Cookies from 'js-cookie'

const CookieModal = () => {
  let previouslyAccepted = Cookies.get('acceptCookies') == 'true'
  const [acceptedCookies, setCookies] = useState(previouslyAccepted)
  const buttonRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure(true)
  const [placement /*setPlacement*/] = useState('bottom')

  useEffect(() => {
    if (!acceptedCookies) {
      onOpen()
    }
  }, [acceptedCookies, onOpen])

  return (
    <Fragment>
      {!acceptedCookies && (
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Your Privacy</DrawerHeader>
            <DrawerBody>
              <Box pb={4}>
                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                  We use cookies and similiar technologies to allow you the
                  ability to log in, as well as track if you have accepted this
                  notice.
                </Text>
                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                  By clicking {'"'}OK{'"'}, or by using our site, you consent to
                  the use of cookies unless you have disabled them.
                </Text>
              </Box>
              <Flex>
                <Spacer />
                <Button
                  colorScheme="green"
                  ref={buttonRef}
                  onClick={() => {
                    Cookies.set('acceptCookies', true, {
                      secure: true,
                      sameSite: 'strict',
                      expires: 364, //a year
                    })
                    setCookies(true)
                  }}
                >
                  OK
                </Button>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Fragment>
  )
}

export default CookieModal

import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Stack direction={'row'} spacing={6}>
          <Link href={'/'}>Home</Link>
          <Link href={'https://tskr.io/about/'}>About</Link>
          <Link href={'https://tskr.io/docs/'}>Blog</Link>
          <Link href={'https://twitter.com/IoTskr'}>Twitter</Link>
        </Stack>
        <Text>© 2022 Tskr. All rights reserved</Text>
      </Container>
    </Box>
  )
}

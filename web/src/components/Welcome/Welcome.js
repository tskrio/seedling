import { CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react'
/*const logo = (
  <Box
    ref={svgRef}
    backgroundColor={'#7ed957'}
    maxWidth={'200px'}
    maxHeight={'200px'}
  >
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      //width="553.000000pt"
      //height="544.000000pt"
      viewBox="0 0 553.000000 544.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,544.000000) scale(0.100000,-0.100000)"
        fill="#00275b"
        stroke="none"
      >
        <path
          d="M0 2720 l0 -2720 2765 0 2765 0 0 2720 0 2720 -2765 0 -2765 0 0
-2720z m2870 2277 c20 -10 278 -260 600 -582 l565 -565 -602 -602 -603 -603
-298 298 -297 297 -145 -145 -145 -145 440 -440 440 -440 747 747 748 748 376
-375 c248 -247 382 -389 395 -415 24 -52 24 -138 0 -190 -13 -28 -356 -377
-1112 -1131 -1027 -1025 -1097 -1092 -1141 -1104 -56 -15 -114 -8 -166 20 -56
29 -2198 2176 -2217 2222 -19 48 -19 128 0 176 11 26 333 355 1098 1121 860
860 1092 1088 1132 1107 58 29 127 29 185 1z"
        />
      </g>
    </svg>
  </Box>
)*/
// Replace test data with your own

//const features = Array.apply(null, Array(8)).map(function (x, i) {
//  return {
//    id: i,
//    title: 'Lorem ipsum dolor sit amet',
//    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
//  }
//})

const Welcome = () => {
  const features = [
    {
      title: 'Convention over configuration',
      text: 'We want a clear way to solve most problems, if it can be solved it should be done in a repeatable way.',
    },
    {
      title: 'Authentication providers',
      text: 'Today we support dbAuth, and Auth0.  Just change your environment variables to switch.',
    },
    {
      title: 'Beautiful Responsive Emails',
      text: 'No one likes the minefield that is email.  MJML helps build your templates and make them beautiful on every client.',
    },
    {
      title: 'Privacy is important to us',
      text: "We've taken steps to ensure that your users' privacy is respected.",
    },
    {
      title: 'Security Roles',
      text: 'Table and field level roles by default are set so you can simply give them out and not figure them out.',
    },
    {
      title: 'Row Level Security',
      text: 'Row Level Security is hard, we a convention for how to do this that makes sense.',
    },
    {
      title: 'Automate with rules',
      text: 'Rules are api side logic that run before and after create, read, update and delete operations.',
    },
    {
      title: 'Accessibility',
      text: 'We use Chakra-UI to make these sites as accessible as possible.',
    },
    {
      title: 'Forms and Lists',
      text: 'When generating pages and components from models, we build out sortable, searchable, filterable lists, and common forms.',
    },
    {
      title: 'Own your data',
      text: (
        <>
          When you own it, you can do{' '}
          <Text display={'inline'} fontWeight={'bold'}>
            whatever
          </Text>{' '}
          you want with it. That{"'"}s a tool hard to replace when you give away
          your keys.
        </>
      ),
    },
  ]

  return (
    <Box p={4} backgroundColor={'white'}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Welcome to Seedling</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          These important features are critical to building a great solution.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.title} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Box color={'gray.600'}>{feature.text}</Box>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Welcome

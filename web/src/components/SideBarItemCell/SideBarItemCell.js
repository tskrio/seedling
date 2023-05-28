import { Box, Icon, Link, Text, Flex, Spacer } from "@chakra-ui/react"
import { NavLink } from "@redwoodjs/router"
import { ListContext } from 'src/App.js'
/**I need to import all the react-icons/md and allow access to them dynamically */
//https://react-icons.github.io/react-icons/icons?name=md
import * as MdIcons from 'react-icons/md'
import * as FaIcons from "react-icons/fa"
import * as SiIcons from "react-icons/si";
export const QUERY = gql`
  query FindRecordsForSideBar(
    $table: String!
    $page: Int
    $take: Int
    $where: String
    $orderBy: String
  )  {
    sideBarItem: readRecords(
      table: $table
      page: $page
      take: $take
      where: $where
      orderBy: $orderBy
    ) {
      table
      page
      take
      where
      filter
      orderBy
      order
      fields
      select
      total
      results
    }
  }
  `

export const beforeQuery = () => {
  return {
    variables: {
      table: 'SideBarItem',
      page: 1,
      take: 100,
      where: 'active/is/true',
      orderBy: 'order/asc'
    },
  }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

// lets make a function that will return the icon
const getIcon = (iconFamily, icon) => {
  if (iconFamily == 'FaIcons') {
    return FaIcons[icon]
  }
  if (iconFamily == 'SiIcons') {
    return SiIcons[icon]
  }
  if (iconFamily == 'MdIcons') {
    return MdIcons[icon]
  }
  return null
}


export const Success = ({ sideBarItem }) => {
  const { table, setTable } = React.useContext(ListContext)
  //return <div>{JSON.stringify(sideBarItem.results)}</div>
  return (
    <Box bg={'white'} m={2} rounded={'md'} p={2}>
      {sideBarItem.results.map((sideBarItem) => {
        let isListLink = sideBarItem.link.split('/')[1] == 'list'
        let givenTable = sideBarItem.link.split('/')[2]
        let bgColor = table == sideBarItem.link.split('/')[2] ? 'green.200' : 'white'
        return (
        <Box key={sideBarItem.cuid}>
          {/*<details>
            <summary>Debug {sideBarItem.name}</summary>
            <pre>{JSON.stringify(sideBarItem, null, 2)}</pre>
          </details>*/}
          {/*<Text>{sideBarItem.name}</Text>*/}
          {sideBarItem.type == 'link' && (
            <NavLink to={`${sideBarItem.link}`}

              activeClassName="activeLink"
              bg={bgColor}
              _focus={{ boxShadow: 'none' }}
              onClick={() => {
                if (isListLink) {
                  setTable(givenTable)
                }
              }}
              size={'sm'}
            >
              <Flex
                gap={'1'}
                alignItems={'center'}
                bg={bgColor}
                p={2}
                borderRadius="lg"
              >
                {sideBarItem.icon && (
                  <Icon mx={2} as={getIcon(sideBarItem.iconFamily, sideBarItem.icon)} />
                )}
                <Box>
                  {sideBarItem.name}
                </Box>
              </Flex>


            </NavLink>
          )}
          {sideBarItem.type == 'externalLink' && (
            <Box>
              <Link href={sideBarItem.link} isExternal>
                {/**Here we'll use the mdIcons */}
                {/**<Icon as={MdIcons[sideBarItem.icon]} /> */}
                <Flex
                  gap={'1'}
                  alignItems={'center'}

                bg={bgColor}
                p={2}
                borderRadius="lg"
                >
                  {sideBarItem.icon && (
                    <Icon mx={2} as={getIcon(sideBarItem.iconFamily, sideBarItem.icon)} />
                  )}
                  <Box>
                    {sideBarItem.name}
                  </Box>
                </Flex>
              </Link></Box>
          )}



        </Box>
      )})}
    </Box>
  )
}

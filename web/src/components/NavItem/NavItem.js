import { Box, Flex, Icon } from '@chakra-ui/react'

import { NavLink, routes } from '@redwoodjs/router'

import { ListContext } from 'src/App.js'
const NavItem = ({ icon, navigateTo, query, children, ...rest }) => {
  const { table, setTable } = React.useContext(ListContext)
  if (!query) {
    query = {}
    if (rest?.table) query = { table: rest.table }
  }
  let backgroundColor = 'transparent'
  if (rest?.table == table) backgroundColor = 'green.200'
  return (
    <NavLink
      to={routes?.[navigateTo](query)}
      activeClassName="activeLink"
      _focus={{ boxShadow: 'none' }}
      onClick={() => {
        if (rest?.table) setTable(rest.table)
      }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        background={backgroundColor}
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        <Box rounded={'md'} py={2}>
          {children}
        </Box>
      </Flex>
    </NavLink>
  )
}
export default NavItem

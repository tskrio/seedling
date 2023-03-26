import { Flex, Icon } from '@chakra-ui/react'

import { NavLink, routes } from '@redwoodjs/router'
const NavItem = ({ icon, navigateTo, query, children, table, ...rest }) => {
  let route = routes?.[navigateTo] || routes?.list({table})
  if (typeof table!=='undefined'){
    query = {table}
  }
  if (!query) {
    query = {}
  }
  return (
    <NavLink
      to={route}
      className="link"
      activeClassName="activeLink"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
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
        {children}
      </Flex>
    </NavLink>
  )
}
export default NavItem

import { Flex, Icon } from '@chakra-ui/react'

import { NavLink, routes } from '@redwoodjs/router'
const NavItem = ({ icon, navigateTo, query, children, ...rest }) => {
  if (!query) {
    query = {}
  }
  return (
    <NavLink
      to={routes?.[navigateTo](query)}
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

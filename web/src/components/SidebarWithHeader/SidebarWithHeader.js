import React from 'react'

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Button,
  Spacer,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  MdGroups,
  MdPerson,
  MdHome,
  MdPersonOutline,
  MdWork,
  MdRoomPreferences,
  MdSettings,
  MdLanguage,
  MdLogout,
  MdMenu,
  MdDoorbell,
  MdOutlineKeyboardArrowDown,
  MdSettingsApplications,
} from 'react-icons/md'

import { useAuth } from '@redwoodjs/auth'
import { routes, navigate } from '@redwoodjs/router'

import NavItem from '../NavItem/NavItem'
const SidebarWithHeader = ({ brand, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        brand={brand}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav brand={brand} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

// interface SidebarProps extends BoxProps {
//   onClose: () => void;
// }

//const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
const SidebarContent = ({ brand, onClose, ...rest }) => {
  const { hasRole, isAuthenticated } = useAuth()
  const LinkItems = [
    { name: 'Home', icon: MdHome, navigateTo: 'home' },
    { name: 'Users', icon: MdPerson, role: 'userRead', navigateTo: 'users' },
    { name: 'Groups', icon: MdGroups, role: 'groupRead', navigateTo: 'groups' },
    {
      name: 'Group Members',
      icon: MdPersonOutline,
      role: 'groupMemberRead',
      navigateTo: 'groupMembers',
    },
    {
      name: 'Group roles',
      icon: MdWork,
      role: 'groupRoleRead',
      navigateTo: 'groupRoles',
    },
    {
      name: 'Preferences',
      icon: MdRoomPreferences,
      roles: 'preferenceRead',
      navigateTo: 'preferences',
    },
    {
      name: 'Properties',
      icon: MdSettings,
      role: 'propertyRead',
      navigateTo: 'properties',
    },
    {
      name: 'Messages',
      icon: MdLanguage,
      role: 'messageRead',
      navigateTo: 'messages',
    },
    {
      name: 'Logs',
      icon: MdSettingsApplications,
      role: 'admin',
      navigateTo: 'logs',
    },
    { name: 'Logout', icon: MdLogout, navigateTo: 'logout' },
  ].filter((item) => {
    if (item?.requireAuth === true && isAuthenticated) {
      return (
        item?.requireAuth === true || hasRole(item.role) || hasRole('admin')
      )
    }
    return hasRole(item.role) || hasRole('admin')
  })

  return (
    <Box
      overflowY={'scroll'}
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {brand}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          pt={0}
          pb={0}
          size={'sm'}
          key={link.name}
          icon={link.icon}
          navigateTo={link.navigateTo}
          onClick={onClose}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
const MobileNav = ({ brand, onOpen, ...rest }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<MdMenu />}
      />
      <Spacer />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {brand}
      </Text>
      <Spacer />

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<MdDoorbell />}
        />
        <Flex alignItems={'center'}>
          {!isAuthenticated && (
            <Button
              backgroundColor={'green'}
              onClick={() => {
                navigate(routes.login())
              }}
            >
              Log in
            </Button>
          )}
          {isAuthenticated && (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{currentUser?.name || 'You'}</Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <MdOutlineKeyboardArrowDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <Box>
                  <MenuItem
                    onClick={() => {
                      navigate(routes.myProfile())
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuDivider />
                </Box>
                <MenuItem
                  onClick={() => {
                    logOut()
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </HStack>
    </Flex>
  )
}

export default SidebarWithHeader

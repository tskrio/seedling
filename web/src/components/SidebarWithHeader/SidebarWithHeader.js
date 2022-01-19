import React from 'react'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
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
import { Link, NavLink, routes, navigate } from '@redwoodjs/router'
import {
  MdGroups,
  MdPerson,
  MdHome,
  MdPersonOutline,
  MdWork,
  MdRoomPreferences,
  MdSettings,
  MdLanguage,
  MdSettingsApplications,
  MdLogout,
  MdMenu,
  MdDoorbell,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md'
import { useAuth } from '@redwoodjs/auth'
// interface LinkItemProps {
//   name: string;
//   icon: IconType;
// }
//const LinkItems: Array<LinkItemProps> = [

// export default function SidebarWithHeader({
//   children,
// }: {
//   children: ReactNode;
// }) {
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
  const { isAuthenticated, currentUser, hasRole, logOut } = useAuth()
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
    { name: 'Preferences', icon: MdRoomPreferences, navigateTo: 'preferences' },
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
    // {
    //   name: 'Settings',
    //   icon: MdSettingsApplications,
    //   role: 'settingRead',
    //   navigateTo: 'settings',
    // },
    { name: 'Logout', icon: MdLogout, navigateTo: 'logout' },
  ].filter((item) => {
    return hasRole(item.role) || hasRole('admin') || !item.role
  })

  return (
    <Box
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
        <NavItem key={link.name} icon={link.icon} navigateTo={link.navigateTo}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

// interface NavItemProps extends FlexProps {
//   icon: IconType;
//   children: ReactText;
// }
// const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
const NavItem = ({ icon, navigateTo, children, ...rest }) => {
  return (
    <NavLink
      to={routes[navigateTo]()}
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

// interface MobileProps extends FlexProps {
//   onOpen: () => void;
// }
// const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
const MobileNav = ({ brand, onOpen, ...rest }) => {
  const { isAuthenticated, currentUser, hasRole, logOut } = useAuth()
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

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {brand}
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<MdDoorbell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{currentUser.name}</Text>
                  {/*<Text fontSize="xs" color="gray.600">
                    {JSON.stringify(currentUser)}
                  </Text>*/}
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <MdOutlineKeyboardArrowDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem
                onClick={() => {
                  navigate(routes.user({ id: currentUser.id }))
                }}
              >
                Profile
              </MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  logOut()
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default SidebarWithHeader

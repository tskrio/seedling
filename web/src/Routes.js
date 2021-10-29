// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'
import GroupRolesLayout from 'src/layouts/GroupRolesLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import GroupMembersLayout from 'src/layouts/GroupMembersLayout'
import GroupsLayout from 'src/layouts/GroupsLayout'
import Standard from './layouts/Standard/Standard'

const Routes = () => {
  return (
    <Router>
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Set wrap={Standard}>
        <Route path="/logout" page={LogoutPage} name="logout" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={AboutPage} name="about" />
        <Private unauthenticated="home">
          <Set wrap={GroupsLayout}>
            <Private unauthenticated="home" role={['admin', 'groupCreate']}>
              <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupUpdate']}>
              <Route path="/groups/{id:Int}/edit" page={GroupEditGroupPage} name="editGroup" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupRead']}>
              <Route path="/groups/{id:Int}" page={GroupGroupPage} name="group" />
              <Route path="/groups" page={GroupGroupsPage} name="groups" />
            </Private>
          </Set>
          <Set wrap={UsersLayout}>
            <Private unauthenticated="home" role={['admin', 'userCreate']}>
              <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'userUpdate']}>
              <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'userRead']}>
              <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
              <Route path="/users" page={UserUsersPage} name="users" />
            </Private>
          </Set>
          <Set wrap={GroupMembersLayout}>
            <Private unauthenticated="home" role={['admin', 'groupMemberCreate']}>
              <Route path="/group-members/new" page={GroupMemberNewGroupMemberPage} name="newGroupMember" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupMemberUpdate']}>
              <Route path="/group-members/{id:Int}/edit" page={GroupMemberEditGroupMemberPage} name="editGroupMember" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupMemberRead']}>
              <Route path="/group-members/{id:Int}" page={GroupMemberGroupMemberPage} name="groupMember" />
              <Route path="/group-members" page={GroupMemberGroupMembersPage} name="groupMembers" />
            </Private>
          </Set>
          <Set wrap={GroupRolesLayout}>
            <Private unauthenticated="home" role={['admin', 'groupRoleCreate']}>
              <Route path="/group-roles/new" page={GroupRoleNewGroupRolePage} name="newGroupRole" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupRoleUpdate']}>
              <Route path="/group-roles/{id:Int}/edit" page={GroupRoleEditGroupRolePage} name="editGroupRole" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupRoleRead']}>
              <Route path="/group-roles/{id:Int}" page={GroupRoleGroupRolePage} name="groupRole" />
              <Route path="/group-roles" page={GroupRoleGroupRolesPage} name="groupRoles" />
            </Private>
          </Set>
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

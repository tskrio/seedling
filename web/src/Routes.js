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
import StandardLayout from './layouts/StandardLayout/StandardLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Set wrap={StandardLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={AboutPage} name="about" />
        <Private unauthenticated="home">
          <Set wrap={GroupsLayout}>
            <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
            <Route path="/groups/{id:Int}/edit" page={GroupEditGroupPage} name="editGroup" />
            <Route path="/groups/{id:Int}" page={GroupGroupPage} name="group" />
            <Route path="/groups" page={GroupGroupsPage} name="groups" /> d
          </Set>
          <Set wrap={UsersLayout}>
            <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
            <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
            <Route path="/users" page={UserUsersPage} name="users" />
          </Set>
          <Set wrap={GroupMembersLayout}>
            <Route path="/group-members/new" page={GroupMemberNewGroupMemberPage} name="newGroupMember" />
            <Route path="/group-members/{id:Int}/edit" page={GroupMemberEditGroupMemberPage} name="editGroupMember" />
            <Route path="/group-members/{id:Int}" page={GroupMemberGroupMemberPage} name="groupMember" />
            <Route path="/group-members" page={GroupMemberGroupMembersPage} name="groupMembers" />
          </Set>
          <Set wrap={GroupRolesLayout}>
            <Route path="/group-roles/new" page={GroupRoleNewGroupRolePage} name="newGroupRole" />
            <Route path="/group-roles/{id:Int}/edit" page={GroupRoleEditGroupRolePage} name="editGroupRole" />
            <Route path="/group-roles/{id:Int}" page={GroupRoleGroupRolePage} name="groupRole" />
            <Route path="/group-roles" page={GroupRoleGroupRolesPage} name="groupRoles" />
          </Set>
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

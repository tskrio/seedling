// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import GroupMembersLayout from 'src/layouts/GroupMembersLayout'
import GroupRolesLayout from 'src/layouts/GroupRolesLayout'
import GroupsLayout from 'src/layouts/GroupsLayout'
import LogsLayout from 'src/layouts/LogsLayout'
import MessagesLayout from 'src/layouts/MessagesLayout'
import PreferencesLayout from 'src/layouts/PreferencesLayout'
import PropertiesLayout from 'src/layouts/PropertiesLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import AboutPage from 'src/pages/AboutPage'
import HomePage from 'src/pages/HomePage'

import Standard from './layouts/Standard/Standard'
import  { useAuth } from 'src/auth'
const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/forgot-password" whileLoadingAuth={() => <>Loading...</>} page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      {/*<Route path="/login" page={LoginPage} name="login" />*/}
      <Route path="/login" page={Login2Page} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Set wrap={Standard}>
        <Route path="/logout" page={LogoutPage} name="logout" />
        <Route path="/" page={HomePage} name="home" />
        <Private unauthenticated="home">
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/my-profile" page={MyProfilePage} name="myProfile" />
          <Set wrap={MessagesLayout}>
            <Route path="/messages/new" page={MessageNewMessagePage} name="newMessage" />
            <Route path="/messages/{cuid}" page={MessageEditMessagePage} name="message" />
          </Set>
          <Set wrap={LogsLayout}>
            <Route path="/logs/new" page={LogNewLogPage} name="newLog" />
            <Route path="/logs/{cuid}" page={LogEditLogPage} name="log" />
          </Set>
          <Set wrap={PropertiesLayout}>
            <Route path="/properties/new" page={PropertyNewPropertyPage} name="newProperty" />
            <Route path="/properties/{cuid}" page={PropertyEditPropertyPage} name="property" />
          </Set>

          <Set wrap={GroupsLayout}>
            <Private unauthenticated="home" role={['admin', 'groupCreate']}>
              <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupUpdate', 'groupRead']}>
              <Route path="/groups/{cuid}" page={GroupEditGroupPage} name="group" />
            </Private>
          </Set>
          <Set wrap={PreferencesLayout}>
            <Private unauthenticated="home">
              <Route path="/preferences/new" page={PreferenceNewPreferencePage} name="newPreference" />
            </Private>
            <Private unauthenticated="home">
              <Route path="/preferences/{cuid}" page={PreferenceEditPreferencePage} name="preference" />
            </Private>
          </Set>
          <Set wrap={UsersLayout}>
            <Private unauthenticated="home" role={['admin', 'userCreate']}>
              <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'userUpdate', 'userRead']}>
              <Route path="/users/{cuid}" page={UserEditUserPage} name="user" />
            </Private>
          </Set>
          <Set wrap={GroupMembersLayout}>
            <Private unauthenticated="home" role={['admin', 'groupMemberCreate']}>
              <Route path="/group-members/new" page={GroupMemberNewGroupMemberPage} name="newGroupMember" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupMemberUpdate', 'groupMemberRead']}>
              <Route path="/group-members/{cuid}" page={GroupMemberEditGroupMemberPage} name="groupMember" />
            </Private>
          </Set>
          <Set wrap={GroupRolesLayout}>
            <Private unauthenticated="home" role={['admin', 'groupRoleCreate']}>
              <Route path="/group-roles/new" page={GroupRoleNewGroupRolePage} name="newGroupRole" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupRoleUpdate', 'groupRoleRead']}>
              {/*<Route path="/group-roles/{cuid}" page={GroupRoleEditGroupRolePage} name="groupRole" />*/}
            </Private>
          </Set>
          <Set>
            {/*<Route path="/list/users" page={AboutPage} name="list" />{/*this is how to override one*/}
            <Route path="/list/{table}/{params...}" page={ListPage} name="list" />
            <Route path="/list/{table}" page={ListPage} name="list" />


            <Route path="/form/{table}/{cuid}" page={FormPage} name="formEdit" />
            <Route path="/form/{table}" page={FormPage} name="form" />

          </Set>
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import AboutPage from 'src/pages/AboutPage'
import HomePage from 'src/pages/HomePage'

import Standard from './layouts/Standard/Standard'

import { useAuth } from 'src/auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/form" page={FormPage} name="form" />
      <Route path="/forgot-password" whileLoadingAuth={() => <>Loading...</>} page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Set wrap={Standard}>
        <Route path="/logout" page={LogoutPage} name="logout" />
        <Route path="/" page={HomePage} name="home" />
        <Private unauthenticated="home">
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/my-profile" page={MyProfilePage} name="myProfile" />

          <Set>
            {/*<Route path="/list/users" page={AboutPage} name="list" />{/*this is how to override one*/}
            {/*<Route path="/list/{table}/{params...}" page={ListPage} name="list" />
            <Route path="/list/{table}" page={ListPage} name="list" />
            <Route path="/list" page={ListPage} name="formEdit" />*/}
            {/*<Route path="/list/users" page={AboutPage} name="list" />{/*this is how to override one*/}
            {/*page:int*/}
            <Route path="/list/{table}/page/{page:Int}/take/{take:Int}/orderBy/{orderBy...}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/take/{take:Int}/orderBy/{orderBy...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/take/{take:Int}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/take/{take:Int}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/orderBy/{orderBy...}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/orderBy/{orderBy...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/page/{page:Int}" page={ListPage} name="list" />
            {/*take:int*/}
            <Route path="/list/{table}/take/{take:Int}/orderBy/{orderBy...}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/take/{take:Int}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/take/{take:Int}" page={ListPage} name="list" />
            {/*orderBy:string*/}
            <Route path="/list/{table}/orderBy/{orderBy...}/where/{where...}" page={ListPage} name="list" />
            <Route path="/list/{table}/orderBy/{orderBy...}" page={ListPage} name="list" />
            {/*where:string*/}
            <Route path="/list/{table}/where/{where...}" page={ListPage} name="list" />
            {/*no params*/}
            <Route path="/list/{table}" page={ListPage} name="list" />
            {/*<Route path="/list/{table}/{params...}" page={ListPage} name="list" />*/}
            {/*<Route path="/list/{table}" page={ListPage} name="list" />*/}

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

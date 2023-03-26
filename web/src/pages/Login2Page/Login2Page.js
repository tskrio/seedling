import { useEffect, useState } from 'react'

import { useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import LoginPasswordLessForm from 'src/components/LoginPasswordLessForm/LoginPasswordLessForm'
import LoginPasswordLessTokenForm from 'src/components/LoginPasswordLessTokenForm/LoginPasswordLessTokenForm'

const Login2Page = () => {
  let [waitingForCode, setWaitingForCode] = useState(false)
  let [email, setEmail] = useState()
  let [code, setCode] = useState()
  // onload set email from query string
  let { search } = useLocation()
  useEffect(() => {
    let params = new URLSearchParams(search)
    // decode magic param
    let magic = params.get('magic')
    let decoded = atob(params.get('magic'))
    // if magic param exists, set email and waitingForCode
    if (magic) {
      // decoded is email:code
      let [email, code] = decoded.split(':')
      setEmail(email)
      setCode(code)
      setWaitingForCode(true)
    }
  }, [search])

  return (
    <>
      <MetaTags title="Login" description="Login page" />

      {!waitingForCode && (
        <LoginPasswordLessForm
          setWaitingForCode={setWaitingForCode}
          setEmail={setEmail}
        />
      )}
      {waitingForCode && (
        <LoginPasswordLessTokenForm
          email={email}
          setWaitingForCode={setWaitingForCode}
          code={code}
        />
      )}
    </>
  )
}

export default Login2Page

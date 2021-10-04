import { Link, navigate, routes } from '@redwoodjs/router'
import { useRef } from 'react'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useEffect } from 'react'

const LoginComponent = () => {
  let altText =
    'Find me in ./web/src/components/LoginComponent/LoginComponent.js'
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.about())
    }
  }, [isAuthenticated])

  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })
    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }
  return (
    <>
      <Toaster />
      <div className="rw-scaffold rw-login-container" alt={altText}>
        <div className="rw-segment">
          <header className="rw-segment-header">
            <h2 className="rw-heading rw-heading-secondary">Login</h2>
          </header>

          <div className="rw-segment-main">
            <div className="rw-form-wrapper">
              <Form onSubmit={onSubmit} className="rw-form-wrapper">
                <div className="text-left">
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                  />

                  <FieldError name="username" className="rw-field-error" />
                </div>

                <div className="text-left">
                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    config={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <FieldError name="password" className="rw-field-error" />
                </div>

                <div className="rw-button-group">
                  <Submit className="rw-button rw-button-blue">Login</Submit>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="rw-login-link">
          <span>Don&apos;t have an account?</span>{' '}
          <Link to={routes.signup()} className="rw-link">
            Sign up!
          </Link>
        </div>
      </div>
    </>
  )
}

export default LoginComponent

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes, Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'

const ForgotPasswordPage = () => {
  const [wait, setWait] = useState(false)
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef()
  useEffect(() => {
    if (!wait) usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.success(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
    }
    setWait(true)
    //navigate(routes.forgotPassword({ wait: true }))
  }

  return (
    <>
      <MetaTags title="Forgot Password" />
      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            {wait && (
              <>
                <header className="rw-segment-header">
                  <h2 className="rw-heading rw-heading-secondary">
                    Check your email
                  </h2>
                </header>
                <div className="rw-segment-main">
                  <div className="rw-form-wrapper">
                    <h3 className="rw-heading rw-heading-secondary">
                      An email with a password reset link has been sent
                    </h3>
                    <p>
                      <Link
                        className="rw-button rw-button-green w-full"
                        to={routes.login()}
                      >
                        Login
                      </Link>
                      <Link
                        className="rw-button rw-button-red w-full"
                        to={routes.forgotPassword()}
                      >
                        Re-request forgot password email
                      </Link>
                    </p>
                  </div>
                </div>
              </>
            )}
            {!wait && (
              <>
                <header className="rw-segment-header">
                  <h2 className="rw-heading rw-heading-secondary">
                    Forgot Password
                  </h2>
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
                          Username
                        </Label>
                        <TextField
                          name="username"
                          className="rw-input"
                          errorClassName="rw-input rw-input-error"
                          ref={usernameRef}
                          validation={{
                            required: true,
                          }}
                        />

                        <FieldError
                          name="username"
                          className="rw-field-error"
                        />
                      </div>

                      <div className="rw-button-group">
                        <Submit className="rw-button rw-button-blue">
                          Submit
                        </Submit>
                      </div>
                    </Form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage

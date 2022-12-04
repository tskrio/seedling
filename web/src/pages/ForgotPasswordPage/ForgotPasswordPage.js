import { MetaTags } from '@redwoodjs/web'

import ForgotPasswordForm from 'src/components/ForgotPasswordForm'

const ForgotPasswordPage = () => {
  return (
    <>
      <MetaTags title="Forgot Password" />
      <ForgotPasswordForm />
    </>
  )
}

export default ForgotPasswordPage

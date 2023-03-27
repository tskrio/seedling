import ResetPasswordForm from 'src/components/ResetPasswordForm'

const ResetPasswordPage = ({ resetToken, wait }) => {
  return <ResetPasswordForm resetToken={resetToken} wait={wait} />
}

export default ResetPasswordPage
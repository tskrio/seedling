import { useForm } from 'react-hook-form'

import PasswordField from './PasswordField'
export const Generated = () => {
  const {
    //handleSubmit,
    register,
    formState: { errors /*, isSubmitting*/ },
  } = useForm()
  let field = {
    name: 'customPassword',
    prettyName: 'Password',
    required: 'This is required',
    type: 'password',
  }
  return (
    <PasswordField
      field={field}
      register={register}
      errors={errors[field?.name]}
    />
  )
}

export default { title: 'Components/PasswordField' }

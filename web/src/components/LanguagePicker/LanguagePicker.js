import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { UPDATE_USER_MUTATION } from 'src/components/User/EditUserCell'
import { Form } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

const LanguagePicker = ({currentLanguage}) => {
  const { currentUser, hasRole } = useAuth()
  const [updateUserPreferences] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User preferences updated.')
    },
  })
  let updateLanguage = () => {
    let language = document.getElementById('languagePicker').value;
    console.log('set users language')
    currentUser.preferences['language'] = language
    //console.log('queryVariables', queryVariables)
    updateUserPreferences({
      variables: {
        id: currentUser.id,
        input: { preferences: currentUser.preferences },
      },
    })
  }
  return (
    <>
    🌐
    <Form>
    <select id="languagePicker" value={currentLanguage} onChange={()=>{updateLanguage()}}>
      <option value="en">en</option>
      <option value="es">es</option>
    </select>
    </Form>

    </>
  )
}

export default LanguagePicker

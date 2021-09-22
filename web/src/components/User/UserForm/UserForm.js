import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  PasswordField,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const titleCase = (str) => {
  str = str.toLowerCase().split(' ')
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
  }
  return str.join(' ')
}

function randomString(len, charSet) {
  charSet =
    charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var randomString = ''
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length)
    randomString += charSet.substring(randomPoz, randomPoz + 1)
  }
  return randomString
}

const UserForm = (props) => {
  const onSubmit = (data) => {
    //console.log('onsave data', data)
    /**Client RUles go here */
    if (data.preference) {
      data.preferences = data.preference
      delete data.preference
    }
    if (data.preferences == undefined) {
      data.preferences = {}
    }
    if (data.salt == '' || data.salt == undefined) {
      data.salt = randomString(32).trim()
    }
    console.log('onsave data modified', data)
    props.onSave(data, props?.user?.id)
  }

  var preferenceFields = []
  if (props?.user?.preferences) {
    for (let key in props?.user?.preferences) {
      console.log(`${key}: ${props?.user?.preferences[key]}`)
      preferenceFields.push(
        <div key={key}>
          <Label
            name={'preference.' + key}
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            {key}
          </Label>
          <TextField
            name={'preference.' + key}
            defaultValue={props?.user?.preferences[key]}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: false }}
          />

          <FieldError name={'preference.' + key} className="rw-field-error" />
        </div>
      )
    }
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>
        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="hashedPassword"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Password
        </Label>
        <PasswordField
          name="hashedPassword"
          defaultValue={props.user?.hashedPassword}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: false }}
        />

        <FieldError name="hashedPassword" className="rw-field-error" />

        <FieldError name="preferences" className="rw-field-error" />
        {preferenceFields}
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm

/*
        <Label
          name="preferences"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Preferences
        </Label>
        <TextField
          name="preferences"
          defaultValue={JSON.stringify(props.user?.preferences)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />


        <Label
          name="salt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Salt
        </Label>
        <TextField
          name="salt"
          defaultValue={props.user?.salt}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: false }}
        />

        <FieldError name="salt" className="rw-field-error" />
        */

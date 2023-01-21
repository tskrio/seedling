import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
/*
const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}
*/
const PreferenceForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.preference?.cuid)
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
          name="entity"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Entity
        </Label>
        <TextField
          name="entity"
          defaultValue={props.preference?.entity}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="entity" className="rw-field-error" />

        <Label
          name="value"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Value
        </Label>
        <TextField
          name="value"
          defaultValue={props.preference?.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="value" className="rw-field-error" />

        <Label
          name="userCuid"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User cuid
        </Label>
        <NumberField
          name="userCuid"
          defaultValue={props.preference?.userCuid}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userCuid" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PreferenceForm

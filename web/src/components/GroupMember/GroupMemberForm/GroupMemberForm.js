import {
  Form,
  FormError,
  FieldError,
  Label,
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
const GroupMemberForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.groupMember?.cuid)
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
          name="userCuid"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User cuid
        </Label>
        <NumberField
          name="userCuid"
          defaultValue={props.groupMember?.userCuid}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userCuid" className="rw-field-error" />

        <Label
          name="groupCuid"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Group cuid
        </Label>
        <NumberField
          name="groupCuid"
          defaultValue={props.groupMember?.groupCuid}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="groupCuid" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default GroupMemberForm

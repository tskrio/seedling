import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import RoleSelect from 'src/components/RoleSelect'
import { useLocation } from '@redwoodjs/router'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const GroupRoleForm = (props) => {
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  const onSubmit = (data) => {
    props.onSave(data, props?.groupRole?.id)
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

        <FieldError name="role" className="rw-field-error" />
        <RoleSelect
          label="Role"
          defaultValue={props.groupRole?.role}
          choices={[
            'admin',
            'userCreate',
            'userRead',
            'userUpdate',
            'userDelete',
            'groupCreate',
            'groupRead',
            'groupUpdate',
            'groupDelete',
            'groupMemberCreate',
            'groupMemberRead',
            'groupMemberUpdate',
            'groupMemberDelete',
            'groupRoleCreate',
            'groupRoleRead',
            'groupRoleUpdate',
            'groupRoleDelete',
            'userRoleCreate',
            'userRoleRead',
            'userRoleUpdate',
            'userRoleDelete',
          ]}
        />
        <FieldError name="role" className="rw-field-error" />
        <Label
          name="groupId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Group id
        </Label>
        <NumberField
          name="groupId"
          defaultValue={props.groupRole?.groupId || params.get('groupId')}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          config={{ required: true }}
        />

        <FieldError name="groupId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default GroupRoleForm

const fields = [
  {
    name: 'cuid',
    label: 'Cuid',
    type: 'text',
    required: true,
    initialValue: '',
    placeholder: 'Cuid',
    validation: {
      required: true,
    },
  },
  {
    name: 'createdAt',
    label: 'Created At',
    type: 'text',
    required: true,
    initialValue: '',
    placeholder: 'Created t',
    validation: {
      required: true,
    },
  },
  {
    name: 'updatedAt',
    label: 'Updated At',
    type: 'text',
    required: true,
    initialValue: '',
    placeholder: 'Updated At',
    validation: {
      required: true,
    },
  },
  {
    name: 'role',
    label: 'Role',
    type: 'text',
    required: true,
    initialValue: '',
    placeholder: 'Username',
    validation: {
      required: true,
    },
  },
  {
    name: 'groupCuid',
    label: 'Group Cuid',
    type: 'text',
    required: true,
    initialValue: '',
    placeholder: '',
    validation: {
      required: true,
    },
  },
]
export default fields
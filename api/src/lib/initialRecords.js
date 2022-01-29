export const groups = [
  {
    id: 1,
    name: 'Administrators',
    description: 'Can CRUD all records.',
    GroupRole: {
      create: {
        role: 'admin',
      },
    },
  },
]

export const properties = [
  {
    entity: 'email',
    type: 'string',
    value: 'inactive',
  },
  {
    entity: 'MAILGUN_DOMAIN',
    type: 'string',
    value: 'replaceMe',
  },
  {
    entity: 'MAILGUN_API_KEY',
    type: 'string',
    value: 'replaceMe',
  },
]

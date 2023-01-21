export const groups = [
  {
    cuid: 'qx784aq3cef0rsf5yytif7fq',
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
    name: 'email',
    type: 'string',
    value: 'inactive',
  },
  {
    name: 'MAILGUN_DOMAIN',
    type: 'string',
    value: 'replaceMe',
  },
  {
    name: 'MAILGUN_API_KEY',
    type: 'string',
    value: 'replaceMe',
  },
]

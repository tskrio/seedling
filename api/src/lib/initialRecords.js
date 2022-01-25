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
  {
    id: 2,
    name: 'Managers',
    description: 'Can CRU users, can CRU groups, can CRD group members',
    GroupRole: {
      create: [
        {
          role: 'userCreate',
        },
        {
          role: 'userRead',
        },
        {
          role: 'userUpdate',
        },
        {
          role: 'groupCreate',
        },
        {
          role: 'groupRead',
        },
        {
          role: 'groupUpdate',
        },
        {
          role: 'groupMemberCreate',
        },
        {
          role: 'groupMemberRead',
        },
        {
          role: 'groupMemberDelete',
        },
      ],
    },
  },
  {
    id: 3,
    name: 'Employees',
    description: 'Can CRU users, can R groups, can R group members',
    GroupRole: {
      create: [
        {
          role: 'userCreate',
        },
        {
          role: 'userRead',
        },
        {
          role: 'userUpdate',
        },
        {
          role: 'groupRead',
        },
        {
          role: 'groupMemberRead',
        },
      ],
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

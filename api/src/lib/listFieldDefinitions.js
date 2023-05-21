export const definitions = {
  User: {
    username: {
      label: 'User Name',
      canSort: false,
      canFilter: true,
      canShowMatching: true,
    },
    name: {
      canSort: true,
    },
  },
  Preference: {
    entity: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    value: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    User: {
      label: 'User',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      reference: true,
    },
  },
  Property: {
    name: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    type: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    value: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    //'cuid': {
    //  label: 'Cuid',
    //  fontFamily: 'mono',
    //  canSort: true,
    //  canFilter: true,
    //  canShowMatching: true,
    //},
  },
  Message: {
    language: {
      label: 'Language',
    },
    entity: {
      label: 'Entity',
    },
    value: {
      label: 'Value',
    },
  },
  Group: {
    name: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    description: {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
  },
  GroupRole: {
    createdAt: {
      label: 'Created At',
    },
    role: true,
  },
  GroupMember: {
    createdAt: {
      label: 'Created At',
      order: 50,
    },
    User: {
      reference: true,
      label: 'User',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      order: 100,
    },

    Group: {
      label: 'Group',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      order: 200,
    },
  },
  Log: {
    createdAt: {
      label: 'Created At',
    },
    updatedAt: {
      label: 'Updated At',
    },
    message: {
      label: 'Message',
    },
    source: {
      label: 'Source',
    },
  },

}
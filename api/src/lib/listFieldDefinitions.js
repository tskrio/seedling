export const definitions = {
  user: {
    'username': {
      label: 'User Name',
      canSort: false,
      canFilter: true,
      canShowMatching: true,
    },
    'name': {
      canSort: true,
    },
    'cuid': {
      label: 'Cuid',
      fontFamily: 'mono',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    }

  },
  preference: {
    'entity': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'value': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'User': {
      label: 'User',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid'
    },
  },
  property: {
    'name': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'type': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'value': {
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
  message: {
    'language': {
      label: 'Language',
    },
    'entity': {
      label: 'Entity',
    },
    'value': {
      label: 'Value',
    },
  },
  group: {
    'name': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },
    'description': {
      canSort: true,
      canFilter: true,
      canShowMatching: true,
    },

  },
  groupRole: {
    'createdAt': {
      label: 'Created At',
    },
    'role': true
  },
  groupMember: {
    'createdAt': {
      label: 'Created At',
    },
    'cuid': {
      label: 'Cuid',
    },
   'User': {
      label: 'User',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid'
    },

    'Group': {
      label: 'Group',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid'
    },
  },
  log: {
    'createdAt': {
      label: 'Created At',
    },
    'updatedAt': {
      label: 'Updated At',
    },
    'message': {
      label: 'Message',
    },
    source: {
      label: 'Source',
    }
  }
}
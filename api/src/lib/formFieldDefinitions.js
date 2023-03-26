export const definitions = {
  /**
   * Options
   * label
   * readOnly
   * required
   * minLength
   * onChange
   * defaultValue
   * defaultOptions (for simple lists) array of strings or objects with label and value
   *
   */
  user: {
    'username': {
      label: 'User Name',
      canSort: false,
      canFilter: true,
      canShowMatching: true,
    },
    'name': {
      label: 'Name',
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
      label: "Hello",
    },
    'description': {
      label: 'Description',
    },

  },
  groupRole: {
    'createdAt': {
      label: 'Created At',
    },
    'role': {
      label: 'Role',
      type: 'select',
      //options: [//this also works
      //  'admin','user','guest'
      //]
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Guest', value: 'guest' },
      ],
      value: 'cuid',

    },
    'Group': {
      label: 'Group',
      display: 'name',
      value: 'cuid',
      //type: 'reference2',
      // lets think about this
      // this will need the fields to query
      // this will need the table
      // this will need filter skip and take
      // this will need the default value
      // this will need the default display
      graphql: {
        table: 'group',
        fields: ['name','cuid'],
        filter: {},
        skip: 0,
        take: 10,
        defaultDisplay: 'name',
        defaultValue: 'cuid',
      }
    },
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
      type: 'reference2',
      label: 'Group',
      canSort: true,
      canFilter: true,
      canShowMatching: true,
      display: 'name',
      value: 'cuid',
      table: 'group',
      display: 'name',
      value: 'cuid',
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
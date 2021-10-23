// Define your own mock data here:
import { routes } from '@redwoodjs/router'
export const standard = () => ({
  users: [
    {
      id: 1,
      createdAt: '2021-09-23T06:08:40.050Z',
      updatedAt: '2021-10-15T08:13:27.555Z',
      email: 'admin@example.com',
      name: 'Adam Admin',
      __typename: 'User',
    },
    {
      id: 3,
      createdAt: '2021-09-23T06:08:40.050Z',
      updatedAt: '2021-10-15T08:13:40.854Z',
      email: 'employee@example.com',
      name: 'Eve Employee',
      __typename: 'User',
    },
    {
      id: 2,
      createdAt: '2021-09-23T06:08:40.050Z',
      updatedAt: '2021-10-15T08:13:53.967Z',
      email: 'manager@example.com',
      name: 'Mike Manager',
      __typename: 'User',
    },
    {
      id: 34,
      createdAt: '2021-10-16T00:46:08.563Z',
      updatedAt: '2021-10-16T00:46:08.564Z',
      email: 'EdwardEmployee@example.com',
      name: 'Edward Employee',
      __typename: 'User',
    },
  ],
  meta: {
    title: 'Users',
    routes: {
      newItem: () => {
        return routes.newUser()
      },
      view: (prop) => {
        return routes.user(prop)
      },
      edit: (prop) => {
        return routes.editUser(prop)
      },
    },
    labels: {
      single: 'user',
      multiple: 'users',
    },
    key: 'id',
    display: 'name',
    columns: [
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'email', label: 'Email', type: 'string' },
      { key: 'createdAt', label: 'Created', type: 'date' },
      { key: 'updatedAt', label: 'Updated', type: 'date' },
    ],
    createRoles: ['userCreate'],
  },
  QUERY: {
    kind: 'Document',
    definitions: [
      {
        kind: 'OperationDefinition',
        operation: 'query',
        name: {
          kind: 'Name',
          value: 'FindUsers',
        },
        variableDefinitions: [],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: {
                kind: 'Name',
                value: 'users',
              },
              arguments: [],
              directives: [],
              selectionSet: {
                kind: 'SelectionSet',
                selections: [
                  {
                    kind: 'Field',
                    name: {
                      kind: 'Name',
                      value: 'id',
                    },
                    arguments: [],
                    directives: [],
                  },
                  {
                    kind: 'Field',
                    name: {
                      kind: 'Name',
                      value: 'createdAt',
                    },
                    arguments: [],
                    directives: [],
                  },
                  {
                    kind: 'Field',
                    name: {
                      kind: 'Name',
                      value: 'updatedAt',
                    },
                    arguments: [],
                    directives: [],
                  },
                  {
                    kind: 'Field',
                    name: {
                      kind: 'Name',
                      value: 'email',
                    },
                    arguments: [],
                    directives: [],
                  },
                  {
                    kind: 'Field',
                    name: {
                      kind: 'Name',
                      value: 'name',
                    },
                    arguments: [],
                    directives: [],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
    loc: {
      start: 0,
      end: 107,
    },
  },
  DELETE_USER_MUTATION: {
    kind: 'Document',
    definitions: [
      {
        kind: 'OperationDefinition',
        operation: 'mutation',
        name: {
          kind: 'Name',
          value: 'DeleteUserMutation',
        },
        variableDefinitions: [
          {
            kind: 'VariableDefinition',
            variable: {
              kind: 'Variable',
              name: {
                kind: 'Name',
                value: 'id',
              },
            },
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
            },
            directives: [],
          },
        ],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: {
                kind: 'Name',
                value: 'deleteUser',
              },
              arguments: [
                {
                  kind: 'Argument',
                  name: {
                    kind: 'Name',
                    value: 'id',
                  },
                  value: {
                    kind: 'Variable',
                    name: {
                      kind: 'Name',
                      value: 'id',
                    },
                  },
                },
              ],
              directives: [],
              selectionSet: {
                kind: 'SelectionSet',
                selections: [
                  {
                    kind: 'Field',
                    name: {
                      kind: 'Name',
                      value: 'id',
                    },
                    arguments: [],
                    directives: [],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
    loc: {
      start: 0,
      end: 101,
    },
  },
})

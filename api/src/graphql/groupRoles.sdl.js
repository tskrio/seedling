export const schema = gql`
  type GroupRole {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    role: String!
    group: Group!
    groupId: Int!
  }

  type Query {
    groupRoles: [GroupRole!]!
    groupRole(id: Int!): GroupRole
    groupRolesByGroup(id: Int!): [GroupRole!]!
  }

  input CreateGroupRoleInput {
    role: String!
    groupId: Int!
  }

  input UpdateGroupRoleInput {
    role: String
    groupId: Int
  }

  type Mutation {
    createGroupRole(input: CreateGroupRoleInput!): GroupRole!
    updateGroupRole(id: Int!, input: UpdateGroupRoleInput!): GroupRole!
    deleteGroupRole(id: Int!): GroupRole!
  }
`

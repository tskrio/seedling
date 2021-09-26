export const schema = gql`
  type GroupRole {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    role: String!
    group: Group!
    groupId: Int!
  }

  enum Role {
    admin
    userCreate
    userRead
    userUpdate
    userDelete
    groupCreate
    groupRead
    groupUpdate
    groupDelete
    groupMemberCreate
    groupMemberRead
    groupMemberUpdate
    groupMemberDelete
    groupRoleCreate
    groupRoleRead
    groupRoleUpdate
    groupRoleDelete
  }

  type Query {
    groupRoles: [GroupRole!]! @requireAuth
    groupRole(id: Int!): GroupRole @requireAuth
    groupRolesByGroup(id: Int!): [GroupRole!]! @requireAuth
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
    createGroupRole(input: CreateGroupRoleInput!): GroupRole! @requireAuth
    updateGroupRole(id: Int!, input: UpdateGroupRoleInput!): GroupRole!
      @requireAuth
    deleteGroupRole(id: Int!): GroupRole! @requireAuth
  }
`

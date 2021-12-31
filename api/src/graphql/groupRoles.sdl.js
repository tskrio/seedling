export const schema = gql`
  type GroupRole {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    role: String!
    groupId: Int!
    group: Group!
  }

  type GroupRoles {
    results: [GroupRole!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    groupRoles(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): GroupRoles! @requireAuth(roles: ["groupRoleRead", "admin"])

    groupRole(id: Int!): GroupRole
      @requireAuth(roles: ["groupRoleRead", "admin"])
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
      @requireAuth(roles: ["groupRoleCreate", "admin"])
    updateGroupRole(id: Int!, input: UpdateGroupRoleInput!): GroupRole!
      @requireAuth(roles: ["groupRoleUpdate", "admin"])
    deleteGroupRole(id: Int!): GroupRole!
      @requireAuth(roles: ["groupRoleDelete", "admin"])
  }
`

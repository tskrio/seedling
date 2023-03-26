export const schema = gql`
  type GroupRole {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    role: String!
    groupCuid: String!
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

    groupRole(cuid: String!): GroupRole
      @requireAuth(roles: ["groupRoleRead", "admin"])
  }

  input CreateGroupRoleInput {
    role: String!
    groupCuid: String!
  }

  input UpdateGroupRoleInput {
    role: String
    groupCuid: String
  }

  type Mutation {
    createGroupRole(input: CreateGroupRoleInput!): GroupRole!
      @requireAuth(roles: ["groupRoleCreate", "admin"])
    updateGroupRole(cuid: String!, input: UpdateGroupRoleInput!): GroupRole!
      @requireAuth(roles: ["groupRoleUpdate", "admin"])
    deleteGroupRole(cuid: String!): GroupRole!
      @requireAuth(roles: ["groupRoleDelete", "admin"])
  }
`

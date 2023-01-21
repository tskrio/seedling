export const schema = gql`
  type Group {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    description: String!
    GroupMember: [GroupMember]!
    GroupRole: [GroupRole]!
  }

  type Groups {
    results: [Group!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    groups(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Groups! @requireAuth(roles: ["groupRead", "admin"])

    group(cuid: String!): Group @requireAuth(roles: ["groupRead", "admin"])
  }

  input CreateGroupInput {
    name: String!
    description: String!
  }

  input UpdateGroupInput {
    name: String
    description: String
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group!
      @requireAuth(roles: ["groupCreate", "admin"])
    updateGroup(cuid: String!, input: UpdateGroupInput!): Group!
      @requireAuth(roles: ["groupUpdate", "admin"])
    deleteGroup(cuid: String!): Group!
      @requireAuth(roles: ["groupDelete", "admin"])
  }
`

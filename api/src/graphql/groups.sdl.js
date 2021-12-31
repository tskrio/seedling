export const schema = gql`
  type Group {
    id: Int!
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

    group(id: Int!): Group @requireAuth(roles: ["groupRead", "admin"])
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
    updateGroup(id: Int!, input: UpdateGroupInput!): Group!
      @requireAuth(roles: ["groupUpdate", "admin"])
    deleteGroup(id: Int!): Group! @requireAuth(roles: ["groupDelete", "admin"])
  }
`

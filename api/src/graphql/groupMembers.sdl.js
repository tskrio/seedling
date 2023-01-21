export const schema = gql`
  type GroupMember {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userCuid: String!
    groupCuid: String!
    Group: Group!
    User: User!
  }

  type GroupMembers {
    results: [GroupMember!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    groupMembers(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): GroupMembers! @requireAuth(roles: ["groupMemberRead", "admin"])

    groupMember(cuid: String!): GroupMember
      @requireAuth(roles: ["groupMemberRead", "admin"])
  }

  input CreateGroupMemberInput {
    userCuid: String!
    groupCuid: String!
  }

  input UpdateGroupMemberInput {
    userCuid: String
    groupCuid: String
  }

  type Mutation {
    createGroupMember(input: CreateGroupMemberInput!): GroupMember!
      @requireAuth(roles: ["groupMemberCreate", "admin"])
    updateGroupMember(
      cuid: String!
      input: UpdateGroupMemberInput!
    ): GroupMember! @requireAuth(roles: ["groupMemberUpdate", "admin"])
    deleteGroupMember(cuid: String!): GroupMember!
      @requireAuth(roles: ["groupMemberDelete", "admin"])
  }
`

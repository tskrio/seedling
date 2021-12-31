export const schema = gql`
  type GroupMember {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: Int!
    groupId: Int!
    group: Group!
    user: User!
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

    groupMember(id: Int!): GroupMember
      @requireAuth(roles: ["groupMemberRead", "admin"])
  }

  input CreateGroupMemberInput {
    userId: Int!
    groupId: Int!
  }

  input UpdateGroupMemberInput {
    userId: Int
    groupId: Int
  }

  type Mutation {
    createGroupMember(input: CreateGroupMemberInput!): GroupMember!
      @requireAuth(roles: ["groupMemberCreate", "admin"])
    updateGroupMember(id: Int!, input: UpdateGroupMemberInput!): GroupMember!
      @requireAuth(roles: ["groupMemberUpdate", "admin"])
    deleteGroupMember(id: Int!): GroupMember!
      @requireAuth(roles: ["groupMemberDelete", "admin"])
  }
`

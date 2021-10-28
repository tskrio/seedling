export const schema = gql`
  type GroupMember {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: Int!
    group: Group!
    groupId: Int!
    GroupRole: [GroupRole]
  }

  type Query {
    groupMembers: [GroupMember!]! @requireAuth
    groupMember(id: Int!): GroupMember @requireAuth
    groupMembersByGroup(id: Int!): [GroupMember!]! @requireAuth
    groupMembersByUser(id: Int!): [GroupMember!]! @requireAuth
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
    createGroupMember(input: CreateGroupMemberInput!): GroupMember! @requireAuth
    updateGroupMember(id: Int!, input: UpdateGroupMemberInput!): GroupMember!
      @requireAuth
    deleteGroupMember(id: Int!): GroupMember! @requireAuth
  }
`

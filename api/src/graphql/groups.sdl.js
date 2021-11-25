export const schema = gql`
  "A collection GroupMembers and GroupRoles"
  type Group {
    "The unique key auto assigned on create"
    id: Int!
    "DateTime set when created by database"
    createdAt: DateTime!
    "DateTime set when updated by database"
    updatedAt: DateTime!
    "Identifer used for the group"
    name: String!
    "Description of the group"
    description: String!
    "GroupRoles are roles that are given to each member"
    GroupRole: [GroupRole]
    "GroupMembers are individuals who are associated with the group"
    GroupMember: [GroupMember]!
  }

  type Groups {
    results: [Group!]!
    count: Int!
    take: Int!
    skip: Int!
  }

  type Query {
    "To see Groups you must be authenticated and have groupRead role"
    groups(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
    ): Groups! @requireAuth(roles: ["groupRead", "admin"])
    "To see Groups you must be authenticated and have groupRead role"
    group(id: Int!): Group @requireAuth(roles: ["groupRead", "admin"])
  }

  "When creating a group all both name and description are needed"
  input CreateGroupInput {
    "The name of the group to be created is required"
    name: String!
    "The description of the group to be created is required"
    description: String!
  }

  "When updating a group you can only set name, and description optionally"
  input UpdateGroupInput {
    "The name of the group to be created is not required"
    name: String
    "The description of the group to be created is not required"
    description: String
  }

  type Mutation {
    "To create Groups you must be authenticated and have groupCreate role"
    createGroup(input: CreateGroupInput!): Group!
      @requireAuth(roles: ["groupRead", "admin"])
    "To update Groups you must be authenticated and have groupUpdate role"
    updateGroup(id: Int!, input: UpdateGroupInput!): Group!
      @requireAuth(roles: ["groupUpdate", "admin"])
    "To delete Groups you must be authenticated and have groupDelete role"
    deleteGroup(id: Int!): Group! @requireAuth(roles: ["groupDelete", "admin"])
  }
`

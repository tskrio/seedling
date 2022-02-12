export const schema = gql`
  type MyProfile {
    id: Int!
    name: String!
    username: String!
    email: String
    #createdAt: DateTime
    #updatedAt: DateTime
  }
  type Query {
    myProfile: MyProfile! @requireAuth
  }

  type Mutation {
    updateMyProfile(input: UpdateUserInput!): MyProfile! @requireAuth
    deleteMyProfile: MyProfile! @requireAuth
  }
`

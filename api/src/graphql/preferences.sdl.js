export const schema = gql`
  "Preferences control some parts of the site for the user"
  type Preference {
    "The unique key auto assigned on create"
    id: Int!
    "DateTime set when created by database"
    createdAt: DateTime!
    "DateTime set when updated by database"
    updatedAt: DateTime!
    "Identifer used for the preference"
    entity: String!
    "Value stored about the prefence, can be null"
    value: String
    "The user's ID"
    userId: Int!
    "The related user"
    user: User!
  }

  type Query {
    "To see preferences you only need to be logged in, sometimes we'll need to see other user's preferences"
    preferences: [Preference!]! @requireAuth
  }

  input CreatePreferenceInput {
    "Identifer used for the preference"
    entity: String!
    "Value stored about the prefence, can be null"
    value: String
    "The user's ID"
    userId: Int!
  }

  input UpdatePreferenceInput {
    "Identifer used for the preference, optional"
    entity: String
    "Value stored about the prefence, optional"
    value: String
    "The user's ID, optional"
    userId: Int
  }
`

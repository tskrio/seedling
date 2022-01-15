export const schema = gql`
  type Preference {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    entity: String!
    value: String
    userId: Int!
    user: User!
  }

  type Preferences {
    results: [Preference!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    preferences(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Preferences! @requireAuth(roles: ["preferenceRead", "admin"])

    preference(id: Int!): Preference
      @requireAuth(roles: ["preferenceRead", "admin"])
  }

  input CreatePreferenceInput {
    entity: String!
    value: String
    userId: Int!
  }

  input UpdatePreferenceInput {
    entity: String
    value: String
    userId: Int
  }

  type Mutation {
    createPreference(input: CreatePreferenceInput!): Preference!
      @requireAuth(roles: ["preferenceCreate", "admin"])
    updatePreference(id: Int!, input: UpdatePreferenceInput!): Preference!
      @requireAuth(roles: ["preferenceUpdate", "admin"])
    deletePreference(id: Int!): Preference!
      @requireAuth(roles: ["preferenceDelete", "admin"])
  }
`

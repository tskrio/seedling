export const schema = gql`
  type Preference {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    entity: String!
    value: String
    userCuid: String!
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

    preference(cuid: String!): Preference
      @requireAuth(roles: ["preferenceRead", "admin"])
  }

  input CreatePreferenceInput {
    entity: String!
    value: String
    userCuid: String!
  }

  input UpdatePreferenceInput {
    entity: String
    value: String
    userCuid: String
  }

  type Mutation {
    createPreference(input: CreatePreferenceInput!): Preference!
      @requireAuth(roles: ["preferenceCreate", "admin"])
    updatePreference(cuid: String!, input: UpdatePreferenceInput!): Preference!
      @requireAuth(roles: ["preferenceUpdate", "admin"])
    deletePreference(cuid: String!): Preference!
      @requireAuth(roles: ["preferenceDelete", "admin"])
  }
`

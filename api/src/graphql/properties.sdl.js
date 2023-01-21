export const schema = gql`
  type Property {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    type: String!
    value: String
  }

  type Properties {
    results: [Property!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    properties(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Properties! @requireAuth(roles: ["propertyRead", "admin"])

    property(cuid: String!): Property
      @requireAuth(roles: ["propertyRead", "admin"])
  }

  input CreatePropertyInput {
    name: String!
    type: String!
    value: String
  }

  input UpdatePropertyInput {
    name: String
    type: String
    value: String
  }

  type Mutation {
    createProperty(input: CreatePropertyInput!): Property!
      @requireAuth(roles: ["propertyCreate", "admin"])
    updateProperty(cuid: String!, input: UpdatePropertyInput!): Property!
      @requireAuth(roles: ["propertyUpdate", "admin"])
    deleteProperty(cuid: String!): Property!
      @requireAuth(roles: ["propertyDelete", "admin"])
  }
`

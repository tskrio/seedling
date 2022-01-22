export const schema = gql`
  type Property {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    entity: String!
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

    property(id: Int!): Property @requireAuth(roles: ["propertyRead", "admin"])
  }

  input CreatePropertyInput {
    entity: String!
    type: String!
    value: String
  }

  input UpdatePropertyInput {
    entity: String
    type: String
    value: String
  }

  type Mutation {
    createProperty(input: CreatePropertyInput!): Property!
      @requireAuth(roles: ["propertyCreate", "admin"])
    updateProperty(id: Int!, input: UpdatePropertyInput!): Property!
      @requireAuth(roles: ["propertyUpdate", "admin"])
    deleteProperty(id: Int!): Property!
      @requireAuth(roles: ["propertyDelete", "admin"])
  }
`

export const schema = gql`
  type Page {
    cuid: String!
    slug: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    content: String!
  }

  type Query {
    pages: [Page!]! @requireAuth
    page(cuid: String!): Page @requireAuth
    pageBySlug(slug: String!): Page @requireAuth
  }

  input CreatePageInput {
    cuid: String!
    slug: String!
    title: String!
    content: String!
  }

  input UpdatePageInput {
    cuid: String
    slug: String
    title: String
    content: String
  }

  type Mutation {
    createPage(input: CreatePageInput!): Page! @requireAuth
    updatePage(cuid: String!, input: UpdatePageInput!): Page! @requireAuth
    deletePage(cuid: String!): Page! @requireAuth
  }
`

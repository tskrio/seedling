import { Box } from "@chakra-ui/react"
import { MetaTags } from '@redwoodjs/web'
import PageComponent from 'src/components/PageComponent'
export const QUERY = gql`
  query PageQuery($slug: String!) {
    page: pageBySlug(slug: $slug) {
      cuid
      slug
      createdAt
      updatedAt
      title
      content
    }
  }
`

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'cache-and-network' }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No Page Found</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ page }) => {
  //return <div>{JSON.stringify(page)}</div>
  // this will return a CHakra UI Page rendering the content (markdown) formatted

  return (
    <Box>
      <MetaTags
        title={page.title}
        description={page.description}
      />
      <PageComponent page={page} />
    </Box>
  )
}

import { MetaTags } from '@redwoodjs/web'
import PageCell from 'src/components/PageCell'

const ThePage = ({slug}) => {
  return (
    <>
      <MetaTags
        title="The"
        description="The page"
      />

      <PageCell slug={slug} />
    </>
  )
}

export default ThePage

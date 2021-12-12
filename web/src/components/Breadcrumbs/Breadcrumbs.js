import { Link } from '@redwoodjs/router'

const Breadcrumbs = ({ crumbs, readRecords }) => {
  let parsed = JSON.parse(crumbs)
  if (parsed) {
    let top = parsed.OR || parsed.AND
    let links = top.map((crumb, index) => {
      let st = JSON.stringify(crumb).replace(/\\/gm, '')
      return (
        <Link
          key={index}
          to={readRecords({
            q: JSON.stringify({ AND: [JSON.parse(st)] }),
          })}
        >
          {st}
        </Link>
        //<Link key={index} to={readRecords({ q: crumb })}>
        //  {crumb}
        //</Link>
      )
    })
    return (
      <div>
        <h2>{'Breadcrumbs'}</h2>
        <p>{'Find me in ./web/src/components/Breadcrumbs/Breadcrumbs.js'}</p>
        <p>{links}</p>
      </div>
    )
  } else {
    return <></>
  }
}

export default Breadcrumbs

import { Link } from '@redwoodjs/router'

const Breadcrumbs = ({ crumbs, readRecords }) => {
  console.log('crumbs?', crumbs)
  let parsed = JSON.parse(crumbs)
  if (parsed) {
    let top = parsed.OR || parsed.AND
    console.log('top?', top)
    let links = top.map((crumb, index) => {
      console.log('crumb', JSON.stringify(crumb), crumb.key, index)
      let st = JSON.stringify(crumb).replace(/\\/gm, '')
      console.log('st', st)
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
    console.log(top)
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

/**
 * let qParsed = JSON.parse(q)
  let qQueries = []
  for (let qQuery in qParsed) {
    console.log(qQuery, qParsed[qQuery])
    //qQueries.push(qParsed[qQuery])
    console.log(qParsed[qQuery])
    qQueries.push(
      <Link key={qQuery} to={routes.readRecords({ q: qParsed[qQuery] })}>
        {qParsed[qQuery]}
      </Link>
    )
  }

 */

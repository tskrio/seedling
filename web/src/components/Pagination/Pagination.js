import { NavLink, Link } from '@redwoodjs/router'
import { icons } from 'src/lib/icons'
import { styles } from 'src/lib/styles'
const Pagination = ({ count, readRecord, pageSize, filter, currentPage }) => {
  pageSize = pageSize || 5
  const items = []
  items.push(
    <p key={'first'}>
      <Link
        to={readRecord({ filter: filter, offset: 0 * pageSize })}
        className={styles.notActive}
      >
        {icons.leftArrow}
      </Link>
    </p>
  )
  for (let i = 0; i < Math.ceil(count / pageSize); i++) {
    items.push(
      <p
        key={i}
        className="leading-relaxed cursor-pointer mx-2 text-blue-600 hover:text-blue-600 text-sm"
      >
        <NavLink
          to={readRecord({ filter: filter, offset: i * pageSize })}
          activeClassName={styles.active}
          className={styles.notActive}
        >
          {i + 1}
        </NavLink>
      </p>
    )
  }
  items.push(
    <p key={'last'}>
      <Link
        to={readRecord({
          filter: filter,
          offset: currentPage * pageSize,
        })}
        className={styles.notActive}
      >
        {icons.rightArrow}
      </Link>
    </p>
  )
  let paginate = (array, pageSize, pageNumber) => {
    return array.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
  }
  console.log('currentPage', currentPage)
  console.log('pageSize', pageSize)
  let reduced = paginate(items, pageSize, currentPage)
  //  console.log('items.length', items.length)
  //  items.splice(currentPage - 1, currentPage + 1)
  //  console.log('items.length', items.length)
  return <>{reduced}</>
}

export default Pagination

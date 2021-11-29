import { NavLink, Link } from '@redwoodjs/router'
import { icons } from 'src/lib/icons'
import { styles } from 'src/lib/styles'
const Pagination = ({ count, readRecord, pageSize, currentPage, offset }) => {
  function getPageOffsets(offset, pageSize, count) {
    count = parseInt(count, 10)
    offset = parseInt(offset, 10)
    pageSize = parseInt(pageSize, 10)
    var pageArray = [0, 0, 0]
    var pageCount = Math.ceil(count / pageSize) // get the number of pages in a whole number
    var current = parseInt(offset, 10)
    if (current <= 1) {
      pageArray[0] = current
      pageArray[1] = current + pageSize
      pageArray[2] = current + pageSize + pageSize
    }
    if (current > 1 && current < pageCount * pageSize) {
      pageArray[0] = current - pageSize
      pageArray[1] = current
      pageArray[2] = current + pageSize
    }
    if (current >= pageCount * pageSize - 1) {
      pageArray[0] = current - pageSize - pageSize
      pageArray[1] = current - pageSize
      pageArray[2] = current
    }
    let pageNameArray = pageArray.map((page) => {
      return page / count
    })
    return { pageArray, pageNameArray }
  }
  const items = []
  //items.push(
  //  <p key={'first'}>
  //    <Link
  //      to={readRecord({ offset: 0 * pageSize })}
  //      className={styles.notActive}
  //    >
  //      {icons.leftArrow}
  //    </Link>
  //  </p>
  //)
  let something = getPageOffsets(offset, pageSize, count)
  let output = something.pageArray.map((pagePosition, index) => {
    console.log('in pagination', pagePosition, index)

    return (
      <p
        key={index}
        className="leading-relaxed cursor-pointer mx-2 text-blue-600 hover:text-blue-600 text-sm"
      >
        <NavLink
          to={readRecord({ offset: pagePosition })}
          activeClassName={styles.active}
          className={styles.notActive}
        >
          {pagePosition}
        </NavLink>
      </p>
    )
  })
  return output
}
//items.push(
//  <p key={'last'}>
//    <Link
//      to={readRecord({
//        offset: currentPage * pageSize,
//      })}
//      className={styles.notActive}
//    >
//      {icons.rightArrow}
//    </Link>
//  </p>
//)

export default Pagination

import { NavLink } from '@redwoodjs/router'

//import { icons } from 'src/lib/icons'
import { styles } from 'src/lib/styles'
const Pagination = ({ count, readRecord, pageSize, offset }) => {
  function getPageOffsets(offset, pageSize, count) {
    count = parseInt(count, 10)
    offset = parseInt(offset, 10)
    pageSize = parseInt(pageSize, 10)
    var pageArray = [0, 0, 0]
    var pageCount = Math.ceil(count / pageSize) // get the number of pages in a whole number
    var current = parseInt(offset, 10)
    if (count >= pageSize) {
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
    } else {
      pageArray = []
    }
    let pageNameArray = pageArray.map((page) => {
      return Math.ceil(page / pageSize)
    })

    return { pageArray, pageNameArray }
  }
  let something = getPageOffsets(offset, pageSize, count)
  let output = something.pageArray.map((pagePosition, index) => {
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
          {something.pageNameArray[index]}
        </NavLink>
      </p>
    )
  })
  return output
}

export default Pagination

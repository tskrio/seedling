import { useTable, useSortBy } from 'react-table'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { NavLink, Link, navigate, useLocation } from '@redwoodjs/router'
import { useState, useEffect } from 'react'
import { styles } from 'src/lib/styles'
import { icons } from 'src/lib/icons'
import Pagination from 'src/components/Pagination'
const TableComponent = ({
  title,
  columns,
  data,
  queries,
  routes,
  display,
  roles,
  queryVariables,
  count,
  take,
  skip,
}) => {
  const { search } = useLocation()
  const { hasRole } = useAuth()
  let params = new URLSearchParams(search)
  const [tableData, setTableData] = useState(data)
  const [searchInput, setSearchInput] = useState(params.get('filter'))
  const [offset, setOffset] = useState(params.get('offset'))
  let handleSearchInput = (event) => {
    //console.log(event.target.value)
    setSearchInput(event.target.value)
  }
  let handleSearchKeyDown = (event) => {
    if (event.keyCode == 13) {
      navigate(routes.readRecords({ filter: searchInput, offset: 0 }))
    }
  }
  let updateData = () => {
    //console.log(data)
    setTableData(data)
  }
  useEffect(() => {
    //console.log('from useeffect', data.length)
    setTableData(data)
  }, [])
  data = data.map((row) => {
    return {
      ...row,
      actions: (
        <div className="flex">
          {hasRole(roles.updateRecord.concat(['admin'])) && (
            <span className="p-1 w-full">
              <Link
                className="rw-button rw-button-blue"
                to={routes.editRecord({ id: row.id })}
                title={`Edit ${row[display]}`}
              >
                Edit
              </Link>
            </span>
          )}
          {hasRole(roles.deleteRecord.concat(['admin'])) && (
            <span className="p-1 w-full">
              <button
                type="button"
                title={'Delete ' + row[display]}
                className="rw-button rw-button-red w-full"
                onClick={() => onDeleteClick(row.id, `${row[display]}`)}
              >
                Delete
              </button>
            </span>
          )}
        </div>
      ),
    }
  })

  columns = React.useMemo(
    () => columns,
    [
      /**TODO: Allow columns hiding */
    ]
  )
  //data = tableData
  data = React.useMemo(
    () => data,
    [
      tableData,
      /**TODO: Update data on edit or delete */
    ]
  )
  const [deleteRecord] = useMutation(queries.DELETEMUTATION, {
    onError: (error) => {
      console.log('onError', error, error.message)
      toast.error(error.message || `Error - not deleted`)
    },
    onCompleted: (something) => {
      //console.log(`${JSON.stringify(something)}`)
      toast.success(`deleted`)
      updateData()
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    //refetchQueries: [
    //  {
    //    query: queries.QUERY,
    //    variables: {
    //      id: queryVariables,
    //      /*not sure how to get the query variables */
    //    },
    //  },
    //],
    //awaitRefetchQueries: true,
  })
  const onDeleteClick = (id, display) => {
    if (confirm(`Are you sure you want to delete ${display}?`)) {
      deleteRecord({ variables: { id } })
    }
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)
  //{skip} skip
  //let {offset} offset
  //let resultsPerPage = take
  //let pages = Math.ceil(count / take)
  //let currentPage = offset / take + 1 || 1
  //console.log('currentPage', currentPage)
  //let {count} results
  //let pagination = (() => {
  //  let leftLink = <></>
  //  let rightLink = <></>
  //  let pageLinks = []
  //  while (pageLinks.length + currentPage < currentPage + 4) {
  //    pageLinks.push(
  //      <p
  //        key={pageLinks.length}
  //        className="leading-relaxed cursor-pointer mx-2 text-blue-600 hover:text-blue-600 text-sm"
  //      >
  //        <NavLink
  //          to={routes.readRecords({
  //            filter: searchInput,
  //            offset: (currentPage + pageLinks.length) * resultsPerPage,
  //          })}
  //          activeClassName={styles.active}
  //          className={styles.notActive}
  //        >
  //          {currentPage + pageLinks.length}
  //        </NavLink>
  //      </p>
  //    )
  //  }
  //  return { leftLink, rightLink, pageLinks }
  //})()
  //pagination.pageLinks = (
  //  <Pagination
  //    count={count}
  //    readRecord={routes.readRecords}
  //    pageSize={resultsPerPage}
  //    currentPage={currentPage}
  //    filter={searchInput}
  //  />
  //)
  return (
    <div className="pt-4 bg-white pb-4 px-4 rounded-md w-full shadow-lg">
      {/**Title Below */}
      <div className="flex justify-between w-full pt-6 ">
        <h2 className="ml-1 font-bold text-lg"> {title}</h2>
        <svg
          width="14"
          height="4"
          viewBox="0 0 14 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.4">
            <circle cx="2.19796" cy="1.80139" r="1.38611" fill="#222222" />
            <circle cx="11.9013" cy="1.80115" r="1.38611" fill="#222222" />
            <circle cx="7.04991" cy="1.80115" r="1.38611" fill="#222222" />
          </g>
        </svg>
      </div>
      {/**Title Above */}
      {/**Search Below TODO: Enable global fitlering */}
      <div className="w-full flex justify-end px-2 mt-2">
        <div className="w-full inline-block relative flex">
          <input
            type=""
            id="globalSearch"
            name="globalSearch"
            className="leading-snug border border-gray-300 block w-full appearance-none bg-gray-100 text-sm text-gray-600 py-1 px-4 pl-8 rounded-lg"
            placeholder="Search"
            defaultValue={searchInput}
            onChange={handleSearchInput}
            onKeyDown={handleSearchKeyDown}
          />
          <button
            type="button"
            title={'Search'}
            className="rw-button rw-button-green w-auto ml-2 bg-green-500"
            onClick={() =>
              navigate(
                routes.readRecords({
                  filter: searchInput,
                })
              )
            }
          >
            Go
          </button>
          <div className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">
            <svg
              className="fill-current h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 511.999 511.999"
            >
              <path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" />
            </svg>
          </div>
        </div>
      </div>
      {/**Search Above */}
      {/**Table Below */}
      <div className="overflow-x-auto mt-6">
        {/*/ apply the table props*/}
        <table
          {...getTableProps()}
          className="table-auto border-collapse w-full"
        >
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr
                  key={headerGroup.key}
                  {...headerGroup.getHeaderGroupProps()}
                  className="rounded-lg text-sm font-medium text-gray-700 text-left"
                >
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
                        key={column.key}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {
                          // Render the header
                          column.render('Header')
                        }
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' Z➡️A'
                              : ' A➡️Z'
                            : ''}
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr
                    key={row.key}
                    {...row.getRowProps()}
                    className="border px-4 py-2"
                  >
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td key={cell.key} {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {/**Table Above */}
      {/**New Record Button Below */}
      {hasRole(roles.createRecord.concat(['admin'])) && (
        <div className="flex flex-row-reverse">
          <span className="p-1 w-full">
            <Link
              className="rw-button rw-button-green w-full"
              to={routes.createRecord({ id: queryVariables })}
            >
              New Record
            </Link>
          </span>
        </div>
      )}
      {/**New Record Button Above */}
      {/**Pagination Below TODO: Enable pagination*/}
      {/*
      <div
        id="pagination"
        className="w-full flex justify-center border-t border-gray-100 pt-4 items-center"
      >
        {pagination.leftLink}
        {pagination.pageLinks}
        {pagination.rightLink}
      </div>
      <p> {skip} skip </p>
      <p> {offset} offset </p>
      <p> {take} users per page </p>
      <p> {Math.ceil(count / take)} pages</p>
      <p> {count} results </p>
      */}
      {/**Pagination Above */}
    </div>
  )
}

export default TableComponent

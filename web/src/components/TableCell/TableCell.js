import TimeTag from 'src/components/TimeTag'
import Boolean from 'src/components/Boolean'
import Reference from 'src/components/Reference'
let altText = './web/src/components/TableCell/TableCell.js'

const TableCell = (data) => {
  if (data.type === 'date') {
    return (
      <TimeTag
        alt={altText + data.column.key}
        datetime={data.row[data.column.key]}
      />
    )
  } else if (data.type === 'boolean') {
    return <Boolean alt={altText} value={data.column.key} />
  } else if (data.type === 'reference') {
    return <Reference alt={altText} path={data.column.key} row={data.row} />
  } else {
    return <>{data.row[data.column.key]}</>
  }
}

export default TableCell

const TimeTag = (data) => {
  let altText = 'Find me in ./web/src/components/TimeTag/TimeTag.js'
  try {
    let output = new Date(data.datetime)
    output = output
      .toLocaleString('en-CA', { hour12: false })
      .split(',')
      .join('')
    return (
      <time alt={altText} dateTime={data.datetime} title={data.datetime}>
        {output}
      </time>
    )
  } catch (e) {
    return <div>{JSON.stringify(data)}</div>
  }
}

export default TimeTag

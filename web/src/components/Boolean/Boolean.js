const Boolean = (data) => {
  let altText = 'Find me in ./web/src/components/Boolean/Boolean.js'
  data.value = data.value ? 'Yes' : 'No'
  try {
    return (
      <span alt={altText} dateTime={data.datetime} title={data.datetime}>
        {output}
      </span>
    )
  } catch (e) {
    return <div>{JSON.stringify(data)}</div>
  }
}

export default Boolean

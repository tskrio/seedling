const Reference = (data) => {
  let altText = 'Find me in ./web/src/components/Reference/Reference.js'
  //console.log('Reference', data)
  const getProps = (path, context) => {
    context = context || this
    path = path.split('.')
    path.forEach((pathString, index) => {
      context = context[path[index]]
    })
    return context
  }
  let output = getProps(data.path, data.row)
  try {
    return <span alt={altText}>{output}</span>
  } catch (e) {
    return <div>{JSON.stringify(data)}</div>
  }
}

export default Reference

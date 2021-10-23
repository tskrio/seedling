const Icon = (iconclass,iconname) => {
  return (
    <svg className={`c-icon ${iconclass}`}>
    <use xlinkHref={`${icons}#${iconname}`} />
  </svg>
  )
}

export default Icon

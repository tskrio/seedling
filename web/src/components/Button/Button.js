const Button = ({disabled, text, iconname, iconnameafter, iconclass}) => {
  /*const btnClass = classnames('c-btn', this.props.className, {
    'c-btn--secondary': this.props.issecondary,
    'c-btn--large': this.props.isLarge
  });*/

  return (
<><button disabled={disabled}>
        {iconname && (
          <Icon
            iconname={iconname}
            iconclass={iconclass}
          />
        )}
        {text && (
          <span className='c-btn__text'>{text}</span>
        )}
        {iconnameafter && (
          <Icon
            iconname={iconnameafter}
            iconclass={iconclass}
          />
        )}
      </button>
      {text}</>
  )
}

export default Button

const columnStyle = {
  fontSize: '1.5em',
  background: '#fafafa',
  padding: '0.5em',
  borderTop: '1px solid black',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
}
const innerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
export const Column = ({ columnObj, children }) => {
  return (
    <div style={{ ...columnStyle }}>
      <div>{columnObj.label}</div>
      <div style={{ ...innerStyle }}>{children}</div>
    </div>
  )
}

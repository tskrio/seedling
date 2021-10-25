import AboutPage from './AboutPage'
import { standard } from './AboutPage.mock'
import Standard from 'src/layouts/Standard'
import 'src/scaffold.css'
import 'src/reset.css'
import 'src/index.css'
export const generated = () => {
  return (
    <StandardLayout>
      <AboutPage />
    </StandardLayout>
  )
}

export const loggedin = () => {
  return (
    <Standard {...standard()}>
      <AboutPage />
    </Standard>
  )
}

export default { title: 'Pages/AboutPage' }

//export const empty = () => {
//  return Empty ? <Empty /> : null
//}
//
//export const failure = () => {
//  return Failure ? <Failure error={new Error('Oh no')} /> : null
//}
//
//export const success = () => {
//  return Success ? <Success {...standard()} /> : null
//}

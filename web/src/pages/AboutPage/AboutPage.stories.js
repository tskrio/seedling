import Standard from 'src/layouts/Standard'

import AboutPage from './AboutPage'
import { standard } from './AboutPage.mock'
import 'src/scaffold.css'
import 'src/reset.css'
import 'src/index.css'
export const generated = () => {
  return (
    <Standard>
      <AboutPage />
    </Standard>
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

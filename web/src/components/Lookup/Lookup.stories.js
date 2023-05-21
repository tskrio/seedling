// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Lookup {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Lookup from './Lookup'

export const generated = () => {
  return <Lookup />
}

export default {
  title: 'Components/Lookup',
  component: Lookup,
}

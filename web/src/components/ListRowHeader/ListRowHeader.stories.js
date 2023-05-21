// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <ListRowHeader {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import ListRowHeader from './ListRowHeader'

export const generated = () => {
  return <ListRowHeader />
}

export default {
  title: 'Components/ListRowHeader',
  component: ListRowHeader,
}

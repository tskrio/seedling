// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <ListHeader {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import ListHeader from './ListHeader'

export const generated = () => {
  return <ListHeader />
}

export default {
  title: 'Components/ListHeader',
  component: ListHeader,
}

// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <ListRowFooter {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import ListRowFooter from './ListRowFooter'

export const generated = () => {
  return <ListRowFooter />
}

export default {
  title: 'Components/ListRowFooter',
  component: ListRowFooter,
}

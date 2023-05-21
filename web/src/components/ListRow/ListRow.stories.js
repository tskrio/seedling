// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <ListRow {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import ListRow from './ListRow'

export const generated = () => {
  return <ListRow />
}

export default {
  title: 'Components/ListRow',
  component: ListRow,
}

// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <IconPicker {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import IconPicker from './IconPicker'

export const generated = () => {
  return <IconPicker />
}

export default {
  title: 'Components/IconPicker',
  component: IconPicker,
}

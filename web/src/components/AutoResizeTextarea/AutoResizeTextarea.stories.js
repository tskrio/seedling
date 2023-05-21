// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <AutoResizeTextarea {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import AutoResizeTextarea from './AutoResizeTextarea'

export const generated = () => {
  return <AutoResizeTextarea />
}

export default {
  title: 'Components/AutoResizeTextarea',
  component: AutoResizeTextarea,
}

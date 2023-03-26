// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <ReferenceField2 {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import ReferenceField2 from './ReferenceField2'

export const generated = () => {
  return <ReferenceField2 />
}

export default {
  title: 'Components/ReferenceField2',
  component: ReferenceField2,
}

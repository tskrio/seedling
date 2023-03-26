// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <ReferenceField {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import ReferenceField from './ReferenceField'

export const generated = () => {
  return <ReferenceField />
}

export default {
  title: 'Components/ReferenceField',
  component: ReferenceField,
}

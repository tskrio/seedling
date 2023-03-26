// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <FormComponentOld {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import FormComponentOld from './FormComponentOld'

export const generated = () => {
  return <FormComponentOld />
}

export default {
  title: 'Components/FormComponentOld',
  component: FormComponentOld,
}

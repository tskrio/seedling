// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <PageComponent {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import PageComponent from './PageComponent'

export const generated = () => {
  return <PageComponent />
}

export default {
  title: 'Components/PageComponent',
  component: PageComponent,
}

// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <LoginPasswordLessTokenForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import LoginPasswordLessTokenForm from './LoginPasswordLessTokenForm'

export const generated = () => {
  return <LoginPasswordLessTokenForm />
}

export default {
  title: 'Components/LoginPasswordLessTokenForm',
  component: LoginPasswordLessTokenForm,
}

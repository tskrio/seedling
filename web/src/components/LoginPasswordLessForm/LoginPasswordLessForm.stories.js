// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <LoginPasswordLessForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import LoginPasswordLessForm from './LoginPasswordLessForm'

export const generated = () => {
  return <LoginPasswordLessForm />
}

export default {
  title: 'Components/LoginPasswordLessForm',
  component: LoginPasswordLessForm,
}

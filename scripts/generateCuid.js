// To access your database
// Append api/* to import from api and web/* to import from web
import { createId } from '@paralleldrive/cuid2'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)
  const id = createId()
  // log out the id in a colorful way
  console.log(`:: Generated cuid ::`)
  console.log('%c' + id, 'color: #00ff00; font-size: 20px;')
  // log the id in red, green, and blue
  console.log(`:: Generated cuid in red ::`)
  console.log('%c' + id, 'color: #ff0000; font-size: 20px;')
  console.log(`:: Generated cuid in green ::`)
  console.log('%c' + id, 'color: #00ff00; font-size: 20px;')
  console.log(`:: Generated cuid in blue ::`)
  console.log('%c' + id, 'color: #0000ff; font-size: 20px;')
}

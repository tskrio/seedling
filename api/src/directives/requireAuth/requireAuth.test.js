import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  it('has a requireAuth throws an error if validation does not pass', () => {
    const mockExecution = mockRedwoodDirective(requireAuth, {})

    expect(mockExecution).toThrowError('Implementation missing for requireAuth')
  })
})

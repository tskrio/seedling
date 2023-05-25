import { pages, page, createPage, updatePage, deletePage } from './pages'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pages', () => {
  scenario('returns all pages', async (scenario) => {
    const result = await pages()

    expect(result.length).toEqual(Object.keys(scenario.page).length)
  })

  scenario('returns a single page', async (scenario) => {
    const result = await page({ id: scenario.page.one.id })

    expect(result).toEqual(scenario.page.one)
  })

  scenario('creates a page', async () => {
    const result = await createPage({
      input: {
        slug: 'String6582129',
        updatedAt: '2023-05-24T03:20:26.031Z',
        title: 'String',
        content: 'String',
      },
    })

    expect(result.slug).toEqual('String6582129')
    expect(result.updatedAt).toEqual(new Date('2023-05-24T03:20:26.031Z'))
    expect(result.title).toEqual('String')
    expect(result.content).toEqual('String')
  })

  scenario('updates a page', async (scenario) => {
    const original = await page({ id: scenario.page.one.id })
    const result = await updatePage({
      id: original.id,
      input: { slug: 'String40783852' },
    })

    expect(result.slug).toEqual('String40783852')
  })

  scenario('deletes a page', async (scenario) => {
    const original = await deletePage({ id: scenario.page.one.id })
    const result = await page({ id: original.id })

    expect(result).toEqual(null)
  })
})

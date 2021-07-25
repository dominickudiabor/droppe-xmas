import React from 'react'
import renderer from 'react-test-renderer'
import Page from '../components/Page'

it('it matches snapshot', () => {
  const testPage = renderer
    .create(
      <Page header="save me">
        <p>Works well</p>
      </Page>
    )
    .toJSON()

  expect(testPage).toMatchSnapshot()
})

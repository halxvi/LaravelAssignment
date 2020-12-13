import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Page404 from '../../resources/js/components/404.js'

let container = null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('test', () => {
  act(() => {
    render(<Page404 />, container)
  })
  expect(container.textContent).toBe('404')
})

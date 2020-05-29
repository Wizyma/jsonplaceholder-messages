import React, { useEffect } from 'react';
import { render, cleanup } from '@testing-library/react';

import Component from '..';
import PaginationProvider, { usePaginationContext } from '../../../context/pagination-context';

beforeEach(() => {
  cleanup();
});

function WithPagination({ children }: { children: any }) {
  const { setCount } = usePaginationContext();

  useEffect(() => {
    setCount(10)
  }, [])

  return children
}

describe(`${Component.name} should pass all test`, () => {
  it('render an empty fragment', () => {
    const tree = (
      <PaginationProvider>
        <Component />
      </PaginationProvider>
    )
    const { asFragment } = render(tree)

    expect(asFragment()).toMatchSnapshot()
  })

  it('render a fragment with  the pagination', () => {
    const { asFragment } = render(
      <WithPagination>
        <Component />
      </WithPagination>, {
      wrapper: ({ children }) => (
        <PaginationProvider>
          {children}
        </PaginationProvider>
      )
    })

    expect(asFragment()).toMatchSnapshot()
  })
})
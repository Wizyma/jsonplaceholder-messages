import { act } from 'react-dom/test-utils';
import { ReactQueryCacheProvider, makeQueryCache } from 'react-query'
import { render, cleanup } from '@testing-library/react';
import React from 'react';

import Component from '..';
import PaginationProvider from '../../../context/pagination-context';
import postsMock from './mock.json';

beforeEach(() => {
  cleanup();
});

const queryCache = makeQueryCache()

function Providers({ children }: { children: any }) {

  return (
    <PaginationProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        {children}
      </ReactQueryCacheProvider>
    </PaginationProvider>
  )
}

describe(`${Component.name} should pass all test`, () => {
  it('render posts with the loading state', () => {
    const { asFragment } = render(<Component />, {
      wrapper: ({ children }) => (
        <Providers>
          {children}
        </Providers>
      )
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('render posts with the query state', () => {
    queryCache.setQueryData(['posts', 1, 10], postsMock)
    const { asFragment } = render(<Component />, {
      wrapper: ({ children }) => (
        <Providers>
          {children}
        </Providers>
      )
    })
    
    act(() => {
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

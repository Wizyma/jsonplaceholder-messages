import { ReactQueryCacheProvider, makeQueryCache } from 'react-query'
import { render, cleanup, wait } from '@testing-library/react';
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
    const getPosts = () => postsMock
    queryCache.setQueryData(['posts', 1, 10], getPosts)
    const { asFragment } = render(<Component />, {
      wrapper: ({ children }) => (
        <Providers>
          {children}
        </Providers>
      )
    })
    
    wait(() => expect(asFragment()).toMatchSnapshot())
  })
})

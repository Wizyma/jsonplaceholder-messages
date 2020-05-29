import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Component from '..';

beforeEach(() => {
  cleanup();
});

describe(`${Component.name} should pass all test`, () => {
  it('renders children correctly', () => {
    const { asFragment, getByText } = render(<Component children={<p>Hello World</p>} />)
    const child = getByText(/Hello World/i);
    expect(child).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot()
  })
})
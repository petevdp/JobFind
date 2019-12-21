import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders the top-bar', () => {
  const { getByText } = render(<App />);
  const barTitleElement = getByText(/JobFind/i);
  expect(barTitleElement).toBeInTheDocument();
});
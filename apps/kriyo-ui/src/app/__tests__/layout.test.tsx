// Mock CSS and next/font/google to avoid Jest errors
jest.mock('../globals.css', () => ({}));
jest.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono' }),
}));

import { render, screen } from '@testing-library/react';
import React from 'react';
import RootLayout from '../layout';

describe('RootLayout', () => {
  it('renders children and favicon', () => {
    render(
      <RootLayout>
        <div data-testid="child">Child</div>
      </RootLayout>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    // Check favicon
    const link = document.querySelector('link[rel="icon"]');
    expect(link).toHaveAttribute('href', '/favicon.png');
  });
});

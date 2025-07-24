import { render } from '@testing-library/react';
import MSWInitializer from '../MSWInitializer';

const mockStart = jest.fn();
jest.mock('../mocks/browser', () => ({
  browser: { start: mockStart },
}));

describe('MSWInitializer', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    mockStart.mockClear();
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('does not call browser.start if NEXT_PUBLIC_API_MOCKING is not true', async () => {
    process.env.NEXT_PUBLIC_API_MOCKING = 'false';
    render(<MSWInitializer />);
    await Promise.resolve();
    expect(mockStart).not.toHaveBeenCalled();
  });
});

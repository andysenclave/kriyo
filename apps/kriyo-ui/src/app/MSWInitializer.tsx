'use client';
import { useEffect } from 'react';

const apiMocking = process.env.NEXT_PUBLIC_API_MOCKING === 'true';

export default function MSWInitializer() {
  useEffect(() => {
    async function enableMocking() {
      if (!apiMocking) return;
      const { browser } = await import('./mocks/browser');
      browser.start({ onUnhandledRequest: 'bypass' });
    }
    enableMocking();
  }, []);
  return null;
}

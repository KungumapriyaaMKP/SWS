'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-darkest flex flex-col items-center justify-center p-8 text-center">
      <div className="p-8 rounded-3xl glass-panel border border-rose-500/30 max-w-md w-full space-y-4">
        <h2 className="font-display text-2xl font-bold text-white">Something went wrong</h2>
        <p className="text-sm text-text-secondary">
          An unexpected error occurred. Click below to reload the page.
        </p>
        {error?.message && (
          <p className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-500/20 text-left font-mono break-words">
            {error.message}
          </p>
        )}
        <button
          onClick={() => reset()}
          className="w-full py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-rose-600 shadow-rose-glow"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

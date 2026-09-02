'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#0B0813] text-white min-h-screen flex items-center justify-center p-6">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 max-w-md w-full text-center space-y-4">
          <h2 className="text-2xl font-bold">Global Application Error</h2>
          <p className="text-sm text-zinc-400">
            A global error occurred. Please reset to continue.
          </p>
          {error?.message && (
            <p className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-500/20 text-left font-mono break-words">
              {error.message}
            </p>
          )}
          <button
            onClick={() => reset()}
            className="w-full py-3 rounded-full text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}

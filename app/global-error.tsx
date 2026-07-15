"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col items-center justify-center bg-white text-[#0a192f] font-sans px-6">
        <div className="max-w-md text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto border border-red-100">
            ⚠️
          </div>
          <h2 className="text-2xl font-black tracking-tight">Something went wrong!</h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            An unexpected error occurred in the Blessed Travel portal application. Please try reloading the session.
          </p>
          <button
            onClick={() => reset()}
            className="w-full bg-[#0a192f] hover:bg-[#0b1b3d] text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

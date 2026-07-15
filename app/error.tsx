"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white text-[#0a192f] font-sans px-6">
      <div className="max-w-md text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto">
          ⚠️
        </div>
        <h2 className="text-xl font-bold tracking-tight">Consular Interface Error</h2>
        <p className="text-xs text-zinc-500 leading-relaxed">
          The requested console page failed to compile dynamically. Contact your dedicated protocol officer if the issue persists.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-[#0a192f] hover:bg-[#0b1b3d] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
        >
          Reset Session
        </button>
      </div>
    </div>
  );
}

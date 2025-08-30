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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Oups ! Une erreur s&apos;est produite
        </h1>
        <p className="mt-4 text-gray-600">
          Quelque chose ne s&apos;est pas pass&eacute; comme pr&eacute;vu.
        </p>
        <div className="mt-6">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            R&eacute;essayer
          </button>
        </div>
      </div>
    </div>
  );
}

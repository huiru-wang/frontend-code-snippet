'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function RootError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="bg-purple-300 p-8 rounded-lg shadow-md w-1/4 text-center font-mono">
            <h2 className="text-2xl font-bold mb-6">
                Error Page
            </h2>
            <p className="text-2xl text-gray-600 pb-8">
                /dashboard/error.tsx
            </p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again For Dashboard ErrorHandle
            </button>
        </div>
    )
}
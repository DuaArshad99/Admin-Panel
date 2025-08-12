"use client"

import { AlertCircle, RefreshCw } from "lucide-react"

export default function ErrorDisplay({ error }) {
  const handleRetry = () => {
    localStorage.clear()
    sessionStorage.clear()
    window.location.reload()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Authentication Error</h1>
          <p className="text-gray-600 text-sm mb-4">
            {error.error_description || error.message || "Something went wrong during authentication"}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Clear Cache & Retry
          </button>
        </div>

        {import.meta.env.DEV && (
          <details className="mt-4 p-3 bg-gray-50 rounded text-xs">
            <summary className="cursor-pointer font-medium">Debug Information</summary>
            <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(error, null, 2)}</pre>
          </details>
        )}
      </div>
    </div>
  )
}

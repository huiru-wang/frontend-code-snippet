'use client'

import Link from "next/link";
import { useState } from "react";

export default function RootPage() {

  const [postId, setPostId] = useState<number>(1)

  return (
    <div className="flex flex-col bg-orange-300 p-8 rounded-lg shadow-md w-1/4 text-center font-mono">
      <h2 className="text-2xl font-bold mb-6">
        Root Page
      </h2>
      <p className="text-2xl text-gray-600 pb-10">
        /page.tsx
      </p>

      <Link
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        href="/error-test"
      >
        Go to Error-test: /error-test
      </Link>

      <br />

      <div>
        <Link
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 "
          href={`/posts/${postId}`}
        >
          Go to Post:
        </Link>
        <input
          className="w-8 ml-4"
          type="number"
          min={1}
          max={3}
          value={postId}
          onChange={(e) => setPostId(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

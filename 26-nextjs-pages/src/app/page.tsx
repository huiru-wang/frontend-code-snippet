import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Root',
  icons: '/favicon.ico',
  description: 'This is the root page',
}
export default function RootPage() {

  return (
    <div className="flex flex-col bg-orange-300 p-8 rounded-lg shadow-md w-1/4 text-center font-mono">
      <h2 className="text-2xl font-bold mb-6">
        Root Page
      </h2>
      <p className="text-2xl text-gray-600 pb-10">
        /page.tsx
      </p>
      <Link
        href="/dashboard"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

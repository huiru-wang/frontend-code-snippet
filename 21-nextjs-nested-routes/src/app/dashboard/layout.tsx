'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();

    return (
        <div className="border-4 border-dashed border-red-300 mx-auto min-h-96 p-0 w-full">
            <div className="font-mono text-2xl border-b-4 border-dashed border-red-300 ">
                <h1>
                    &nbsp;This is&nbsp;
                    <span className="text-red-300 mr-2 ml-2 font-bold">
                        Dashboard Layout -&gt;
                    </span>
                    /dashboard/layout.tsx
                </h1>

                <div className="flex gap-8 items-center justify-center font-mono font-bold mb-4 text-4xl">
                    <Link
                        className={
                            `${/^\/dashboard\/profile/.test(pathname) ? "text-gray-200 border-b-2" : "text-rose-400"}`
                        }
                        href="/dashboard/profile"
                    >
                        profile
                    </Link>
                    <Link
                        className={
                            `${/^\/dashboard\/settings/.test(pathname) ? "text-gray-200 border-b-2" : "text-rose-400"} `
                        }
                        href="/dashboard/settings"
                    >
                        settings
                    </Link>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center min-h-96">
                {children}
            </div>
        </div>
    );
}
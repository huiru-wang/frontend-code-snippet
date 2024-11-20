'use client'
import { fetchData } from "@/lib/api";
export default function Profile() {

    // 模拟1s延迟
    fetchData();

    return (
        <div className="bg-stone-300 p-8 rounded-lg shadow-md w-1/4 text-center font-mono">
            <h2 className="text-2xl font-bold mb-6">个人资料</h2>
            <p className="text-2xl first-line:text-gray-600">
                /dashboard/profile/page.tsx
            </p>
        </div>
    )
}
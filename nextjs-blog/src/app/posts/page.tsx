import { getPostFilesMetadata } from "@/lib/markdown";
import Link from "next/link";

export default async function Page() {

    const postMetadataList = await getPostFilesMetadata();

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">
                    Blog Posts
                </h1>
                <div className="space-y-4">
                    {
                        postMetadataList.map((metadata) => (
                            <Link
                                key={metadata.slug}
                                href={`/posts/${metadata.slug}`}
                                className="block p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                {metadata.frontmatter.title}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

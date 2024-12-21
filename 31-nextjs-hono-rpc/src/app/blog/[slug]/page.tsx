import { postsAPI } from "@/lib/hono-client";

type PageProps = {
    slug: string;
};

export default async function Page({ params }: { params: PageProps }) {

    const { slug } = await params;
    const response = await postsAPI[slug].$get();
    const result = await response.json();

    return (
        <div className="w-1/2 text-center pt-10 text-3xl">
            <h1>{result.data}</h1>
        </div>
    );
}
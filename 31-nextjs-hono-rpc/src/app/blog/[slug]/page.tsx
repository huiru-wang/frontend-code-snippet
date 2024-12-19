import { postsAPI } from "@/lib/hono-client";

type PageProps = {
    slug: string;
};

export default async function Page({ params }: { params: PageProps }) {

    const { slug } = await params
    const response = await postsAPI[slug].$get();

    if (!response.success) {
        return <div>Not Found</div>
    }

    return (
        <div className="w-1/2">
            {response.data}
        </div>
    );
}
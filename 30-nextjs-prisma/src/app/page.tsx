import { getPostById } from "@/actions/posts";

export default async function Home() {

  const post = await getPostById(1);

  return (
    <>
      <h1>Title: {post?.title}</h1>
      <p>Tags: {post?.tags}</p>
      <p>category: {post?.category}</p>
      <p>Content: {post?.content}</p>
      <p>published: {post?.published}</p>
      <p>author: {post?.author}</p>
    </>
  );
}

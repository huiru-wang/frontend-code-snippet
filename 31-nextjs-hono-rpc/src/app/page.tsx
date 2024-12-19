import { postsAPI } from "@/lib/hono-client";

export default async function Home() {

  const response = await postsAPI.$get();
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const book = await response.json();

  return (
    <div>
      <h1>Get books from hono: {book}</h1>
    </div>
  );
}

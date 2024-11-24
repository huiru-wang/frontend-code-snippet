import { client } from "@/lib/hono-client";

export default async function Home() {

  const response = await client.api.books.$get();
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (
    <div>
      <h1>Get books from hono：{response.json()}</h1>
    </div>
  );
}

import { hc } from "hono/client";
import { AppType } from "@/server/main";

const client = hc<AppType>(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000');

export const postsAPI = client.api.posts;

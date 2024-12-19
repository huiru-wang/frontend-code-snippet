export default function Home() {
  return (
    <>
      <h1 className="text-lime-400 text-3xl">Hello Nextjs</h1>
      <h1>{process.env.HONO_SERVER_URL!}</h1>
    </>
  );
}

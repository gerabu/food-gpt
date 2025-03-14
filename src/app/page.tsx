import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>{hello.greeting}</h1>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {session?.user && <LatestPost />}
        </div>
      </main>
    </HydrateClient>
  );
}

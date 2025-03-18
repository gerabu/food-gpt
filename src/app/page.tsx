import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Hello there 👋</h1>
      </main>
    </HydrateClient>
  );
}

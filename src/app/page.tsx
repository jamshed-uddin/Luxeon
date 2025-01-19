import { auth } from "@/auth";
import Hero from "@/components/homepage/Hero";

export default async function Home() {
  const session = await auth();

  return (
    <div className="-mt-16">
      <Hero />
      <div className="h-screen flex items-center">
        <h1 className="text-9xl font-bold">hello</h1>
      </div>
      <div className="h-screen flex items-center">
        <h1 className="text-9xl font-bold">hello</h1>
      </div>
    </div>
  );
}

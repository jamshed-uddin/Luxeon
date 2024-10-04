import { auth } from "@/auth";
import Hero from "@/components/homepage/Hero";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <Hero />
    </div>
  );
}

import { BentoGrid } from "@/components/BentoGrid";

export default function Home() {
  return (
    <main
      // className="min-h-screen bg-zinc-50 dark:bg-black py-20 px-4"
    >
      {/* <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">My Portfolio</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Welcome to my digital garden.</p>
      </div> */}
      <BentoGrid />
    </main>
  );
}
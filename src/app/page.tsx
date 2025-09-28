import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-4 items-center row-start-2">
        <h1>Nothing to see here, go to App!</h1>
        <Button asChild>
          <Link href="/app">App</Link>
        </Button>
      </div>
    </div>
  );
}

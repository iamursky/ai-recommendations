import { AiRecommendations } from "@/modules/ai";

export default async function HomePage() {
  return (
    <div className="flex min-h-dvh items-center justify-center py-40">
      <AiRecommendations className="w-full max-w-4xl" />
    </div>
  );
}

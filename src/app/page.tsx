import { Recommendations } from "@/modules/app";

export default async function HomePage() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Recommendations className="w-full max-w-2xl" />
    </div>
  );
}

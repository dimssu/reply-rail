import { Shell } from "@/components/Shell";
import { ReviewDetail } from "@/components/ReviewDetail";
import { REVIEWS } from "@/data/reviews";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return REVIEWS.map((r) => ({ id: r.id }));
}

type Params = Promise<{ id: string }>;

export default async function ReviewPage({ params }: { params: Params }) {
  const { id } = await params;
  const review = REVIEWS.find((r) => r.id === id);
  if (!review) return notFound();
  return (
    <Shell>
      <ReviewDetail reviewId={id} />
    </Shell>
  );
}

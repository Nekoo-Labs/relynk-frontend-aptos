import Checkout from "@/components/features/payment-links/checkout";
import PageLayout from "@/components/layouts/page-layout";

interface PageProps {
  params: Promise<{ username: string; slug: string }>;
}

export default async function CheckoutPage({ params }: PageProps) {
  const { username, slug } = await params;
  return (
    <PageLayout>
      <Checkout username={username} slug={slug} />
    </PageLayout>
  );
}

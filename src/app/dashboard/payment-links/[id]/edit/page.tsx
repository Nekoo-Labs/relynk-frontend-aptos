import { EditPaymentLinkPage } from "@/components/features/payment-links/edit-payment-link-page";
import PageLayout from "@/components/layouts/page-layout";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <PageLayout>
      <EditPaymentLinkPage linkId={resolvedParams.id} />
    </PageLayout>
  );
}

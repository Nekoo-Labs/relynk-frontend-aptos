import { EmbedWidgetPage } from "@/components/features/payment-links/embed-widget-page";
import PageLayout from "@/components/layouts/page-layout";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <PageLayout>
      <EmbedWidgetPage linkId={resolvedParams.id} />
    </PageLayout>
  );
}

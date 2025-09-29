import PageLayout from "@/components/layouts/page-layout";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import PaymentLinks from "@/components/features/payment-links";

export default function PaymentLinksPage() {
  return (
    <PageLayout className="px-4 flex flex-col items-center justify-center pt-24 pb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary z-[-1]" />
      <DashboardLayout>
        <PaymentLinks />
      </DashboardLayout>
    </PageLayout>
  );
}

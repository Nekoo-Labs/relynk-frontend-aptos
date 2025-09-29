import PageLayout from "@/components/layouts/page-layout";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { LinkIcon, User } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <PageLayout className="px-4 flex flex-col items-center justify-center pt-24 pb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary z-[-1]" />
      <DashboardLayout>
        <div>
          <p>Welcome , </p>
          <h1 className="text-xl font-medium">Get started with Relynk</h1>
        </div>
        <div className="w-full p-4 bg-secondary text-primary rounded-md min-h-10">
          <p>
            Relynk is a Web3-native monetization tool that lets creators,
            freelancers, and digital hustlers create payment links, sell digital
            products, and unlock content access — all without relying on Web2
            platforms or centralized gatekeepers.
          </p>
        </div>
        <div className="my-8">
          <h2 className="text-xl font-medium">Before you start,</h2>
          <p>here are a few things you can do in relynk:</p>
          <ul className="list-disc pl-4">
            <li>Setup your profile</li>
            <li>Create your first payment link</li>
          </ul>
        </div>

        <div className="grid sm:grid-cols-2 gap-2 sm:w-fit">
          <Button className="h-12" asChild>
            <Link href="/dashboard/profile">
              <User /> Setup your profile
            </Link>
          </Button>
          <Button variant="outline" className="h-12" asChild>
            <Link href="/dashboard/payment-links">
              <LinkIcon /> Create your first payment link
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    </PageLayout>
  );
}

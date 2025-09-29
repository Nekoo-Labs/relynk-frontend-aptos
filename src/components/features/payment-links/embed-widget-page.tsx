"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { EmbedWidget } from "./embed-widget";

// Mock payment links data
const mockPaymentLinks = [
  {
    id: "1",
    title: "Web3 Consultation",
    description: "1-hour consultation on Web3 development and blockchain integration",
    price: 150,
    currency: "USDC",
    slug: "web3-consultation",
    type: "one_time" as const,
    contentType: "link" as const,
    contentValue: "https://calendly.com/johndoe/consultation",
    isActive: true,
    totalEarned: 1200,
    totalSales: 8,
    createdAt: "2024-01-10",
    allowCustomAmount: false,
    maxPurchases: undefined,
    expiresAt: undefined,
  },
  {
    id: "2",
    title: "NFT Design Course",
    description: "Complete guide to designing and minting NFTs",
    price: 99,
    currency: "USDC",
    slug: "nft-design-course",
    type: "subscription" as const,
    billingInterval: "monthly" as const,
    contentType: "file" as const,
    contentValue: "https://course.johndoe.dev/nft-design.zip",
    isActive: true,
    totalEarned: 2970,
    totalSales: 30,
    createdAt: "2024-01-05",
    allowCustomAmount: false,
    maxPurchases: 100,
    expiresAt: undefined,
  },
  {
    id: "3",
    title: "Coffee Support",
    description: "Buy me a coffee to support my work",
    price: 5,
    currency: "USDC",
    slug: "coffee-support",
    type: "one_time" as const,
    contentType: "text" as const,
    contentValue: "Thank you for your support! Your contribution helps me create more content.",
    isActive: true,
    totalEarned: 125,
    totalSales: 25,
    createdAt: "2024-01-01",
    allowCustomAmount: true,
    minimumAmount: 3,
    maxPurchases: undefined,
    expiresAt: undefined,
  },
];

const mockUser = {
  username: "johndoe",
  availableBalance: 2847.50,
};

interface EmbedWidgetPageProps {
  linkId: string;
}

export function EmbedWidgetPage({ linkId }: EmbedWidgetPageProps) {
  const router = useRouter();
  const [paymentLink, setPaymentLink] = useState<{
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    slug: string;
    type: "one_time" | "subscription";
    billingInterval?: "monthly" | "yearly";
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPaymentLink = async () => {
      // Find the payment link by ID
      const foundLink = mockPaymentLinks.find(link => link.id === linkId);
      
      if (!foundLink) {
        router.push('/dashboard/payment-links');
        return;
      }
      
      setPaymentLink(foundLink);
      setLoading(false);
    };

    loadPaymentLink();
  }, [linkId, router]);

  const handleBack = () => {
    router.push('/dashboard/payment-links');
  };

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading embed options...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentLink) {
    return (
      <div className="container max-w-6xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Payment Link Not Found</h1>
          <Button onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Payment Links
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Payment Links
        </Button>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Embed Widget</h1>
        <p className="text-muted-foreground mt-2">
          Embed &quot;{paymentLink.title}&quot; on your website or blog
        </p>
      </div>

      {/* Embed Widget */}
      <EmbedWidget
        paymentLink={paymentLink}
        username={mockUser.username}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CreatePaymentLinkForm } from "./create-payment-link-form";

const mockUser = {
  username: "johndoe",
  availableBalance: 2847.5,
};

export function CreatePaymentLinkPage() {
  const router = useRouter();
  const [, setIsCreating] = useState(false);

  const handleCreatePaymentLink = async (data: {
    title: string;
    slug: string;
    price: number;
    type: "one_time" | "subscription";
    contentType: "link" | "text" | "file" | "access_code";
    contentValue: string;
    isActive: boolean;
    allowCustomAmount: boolean;
    description?: string;
    billingInterval?: "monthly" | "yearly";
    minimumAmount?: number;
    maxPurchases?: number;
    expiresAt?: string;
  }) => {
    setIsCreating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Creating payment link:", data);

    // In a real app, this would save to the backend
    alert(`Payment link "${data.title}" created successfully!`);

    setIsCreating(false);
    router.push("/dashboard/payment-links");
  };

  const handleCancel = () => {
    router.push("/dashboard/payment-links");
  };

  return (
    <div className="container max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Payment Links
        </Button>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Create Payment Link</h1>
        <p className="text-muted-foreground mt-2">
          Create a new payment link for your products or services
        </p>
      </div>

      {/* Create Form */}
      <CreatePaymentLinkForm
        onSubmit={handleCreatePaymentLink}
        onCancel={handleCancel}
        username={mockUser.username}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { WithdrawalForm } from "./withdrawal-form";

// Mock user data
const mockUser = {
  username: "johndoe",
  availableBalance: 2847.5,
};

export function WithdrawPage() {
  const router = useRouter();
  const [, setIsProcessing] = useState(false);

  const handleWithdraw = async (data: {
    amount: number;
    walletAddress: string;
    platformFee: number;
  }) => {
    setIsProcessing(true);
    console.log("Withdrawal requested:", data);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, this would trigger the withdrawal process
    alert(
      `Withdrawal of ${(
        data.amount -
        (data.amount * data.platformFee) / 100
      ).toFixed(2)} USDC initiated!`
    );

    setIsProcessing(false);
    router.push("/dashboard/payment-links");
  };

  const handleCancel = () => {
    router.push("/dashboard/payment-links");
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Payment Links
        </Button>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Withdraw Funds</h1>
        <p className="text-muted-foreground mt-2">
          Transfer your earnings to your Aptos wallet
        </p>
      </div>

      {/* Withdrawal Form */}
      <WithdrawalForm
        availableBalance={mockUser.availableBalance}
        onSubmit={handleWithdraw}
        onCancel={handleCancel}
      />
    </div>
  );
}

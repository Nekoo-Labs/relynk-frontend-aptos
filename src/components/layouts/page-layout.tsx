"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletSelector } from "@/components/wallet-selector";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function PageLayout({
  children,
  className,
  needWallet = true,
}: {
  children: React.ReactNode;
  className?: string;
  needWallet?: boolean;
}) {
  const { connected, account, isLoading = true } = useWallet();

  if (isLoading) {
    return (
      <div className="w-full h-dvh flex items-center justify-center pt-24 pb-8">
        <Skeleton className="w-full container mx-auto h-full" />
      </div>
    );
  }

  if (needWallet && (!connected || !account)) {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect a Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to start using Relynk
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <WalletSelector />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return <div className={cn("min-h-dvh pt-20", className)}>{children}</div>;
}

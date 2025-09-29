"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DollarSign,
  CreditCard,
  Shield,
  CheckCircle,
  Repeat,
  Download,
  Link as LinkIcon,
  Key,
  FileText,
  ArrowLeft,
  Wallet,
  Link,
} from "lucide-react";

// Mock data - in a real app, this would come from your backend/blockchain
const mockPaymentLinks = {
  johndoe: {
    "web3-consultation": {
      id: "1",
      title: "Web3 Consultation",
      description:
        "1-hour consultation on Web3 development and blockchain integration. Get expert advice on smart contracts, DeFi protocols, and Web3 architecture.",
      price: 150,
      currency: "USDC",
      slug: "web3-consultation",
      type: "one_time" as const,
      contentType: "link" as const,
      contentValue: "https://calendly.com/johndoe/consultation",
      isActive: true,
      allowCustomAmount: false,
      creator: {
        username: "johndoe",
        displayName: "John Doe",
        avatar: "",
        bio: "Web3 Developer & Blockchain Consultant",
      },
    },
    "nft-design-course": {
      id: "2",
      title: "NFT Design Course",
      description:
        "Complete guide to designing and minting NFTs. Learn the fundamentals of digital art, blockchain technology, and NFT marketplaces.",
      price: 99,
      currency: "USDC",
      slug: "nft-design-course",
      type: "subscription" as const,
      billingInterval: "monthly" as const,
      contentType: "file" as const,
      contentValue: "https://course.johndoe.dev/nft-design.zip",
      isActive: true,
      allowCustomAmount: false,
      creator: {
        username: "johndoe",
        displayName: "John Doe",
        avatar: "",
        bio: "Web3 Developer & Blockchain Consultant",
      },
    },
    "coffee-support": {
      id: "3",
      title: "Coffee Support",
      description:
        "Buy me a coffee to support my work creating Web3 content and open-source projects.",
      price: 5,
      currency: "USDC",
      slug: "coffee-support",
      type: "one_time" as const,
      contentType: "text" as const,
      contentValue:
        "Thank you for your support! Your contribution helps me create more content and maintain open-source projects.",
      isActive: true,
      allowCustomAmount: true,
      minimumAmount: 3,
      creator: {
        username: "johndoe",
        displayName: "John Doe",
        avatar: "",
        bio: "Web3 Developer & Blockchain Consultant",
      },
    },
  },
};

export default function Checkout({
  username,
  slug,
}: {
  username: string;
  slug: string;
}) {
  const [paymentLink, setPaymentLink] = useState<{
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    slug: string;
    type: "one_time" | "subscription";
    billingInterval?: "monthly" | "yearly";
    contentType: "link" | "file" | "access_code" | "text";
    contentValue: string;
    isActive: boolean;
    allowCustomAmount: boolean;
    minimumAmount?: number;
    creator: {
      username: string;
      displayName: string;
      avatar: string;
      bio: string;
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const loadPaymentLink = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const userLinks =
        mockPaymentLinks[username as keyof typeof mockPaymentLinks];
      if (!userLinks) {
        notFound();
      }

      const foundLink = userLinks[slug as keyof typeof userLinks];
      if (!foundLink || !foundLink.isActive) {
        notFound();
      }

      setPaymentLink(foundLink);
      setAmount(foundLink.price);
      setLoading(false);
    };

    loadPaymentLink();
  }, [username, slug]);

  const handlePayment = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setPaymentComplete(true);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value) || 0;
    if (
      paymentLink?.allowCustomAmount &&
      numValue >= (paymentLink?.minimumAmount || paymentLink?.price || 0)
    ) {
      setAmount(numValue);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!paymentLink) {
    return notFound();
  }

  const isSubscription = paymentLink.type === "subscription";
  const platformFee = amount * 0.025; // 2.5% platform fee
  const totalAmount = amount + platformFee;

  if (paymentComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your payment has been processed.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Access Your Content</h3>
              {paymentLink.contentType === "link" && (
                <Button asChild className="w-full">
                  <a
                    href={paymentLink.contentValue}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Access Content
                  </a>
                </Button>
              )}
              {paymentLink.contentType === "file" && (
                <Button asChild className="w-full">
                  <a href={paymentLink.contentValue} download>
                    <Download className="w-4 h-4 mr-2" />
                    Download File
                  </a>
                </Button>
              )}
              {paymentLink.contentType === "access_code" && (
                <div className="text-center">
                  <Label>Access Code:</Label>
                  <div className="mt-2 p-2 bg-background rounded border font-mono text-lg">
                    {paymentLink.contentValue}
                  </div>
                </div>
              )}
              {paymentLink.contentType === "text" && (
                <div className="text-sm text-muted-foreground">
                  {paymentLink.contentValue}
                </div>
              )}
            </div>

            <Button variant="outline" asChild className="w-full">
              <a href={`/${username}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full container mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <a href={`/${username}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </a>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Product Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={paymentLink.creator.avatar} />
                <AvatarFallback>
                  {paymentLink.creator.displayName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">
                  {paymentLink.creator.displayName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  @{paymentLink.creator.username}
                </p>
              </div>
            </div>

            <CardTitle className="text-2xl">{paymentLink.title}</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              {paymentLink.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Price:</span>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    ${paymentLink.price} USDC
                    {isSubscription && (
                      <span className="text-sm font-normal text-muted-foreground">
                        /{paymentLink.billingInterval?.replace("ly", "")}
                      </span>
                    )}
                  </div>
                  {isSubscription && (
                    <Badge variant="outline" className="mt-1">
                      <Repeat className="w-3 h-3 mr-1" />
                      Recurring
                    </Badge>
                  )}
                </div>
              </div>

              {paymentLink.allowCustomAmount && (
                <div className="space-y-2">
                  <Label htmlFor="customAmount">Custom Amount (Optional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="customAmount"
                      type="number"
                      step="0.01"
                      min={paymentLink.minimumAmount || paymentLink.price}
                      placeholder={`Minimum: $${
                        paymentLink.minimumAmount || paymentLink.price
                      }`}
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pay more to show extra support (minimum: $
                    {paymentLink.minimumAmount || paymentLink.price})
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {paymentLink.contentType === "link" && (
                  <LinkIcon className="w-4 h-4" />
                )}
                {paymentLink.contentType === "file" && (
                  <Download className="w-4 h-4" />
                )}
                {paymentLink.contentType === "access_code" && (
                  <Key className="w-4 h-4" />
                )}
                {paymentLink.contentType === "text" && (
                  <FileText className="w-4 h-4" />
                )}

                <span>
                  {paymentLink.contentType === "link" && "Access via link"}
                  {paymentLink.contentType === "file" && "Downloadable content"}
                  {paymentLink.contentType === "access_code" &&
                    "Access code provided"}
                  {paymentLink.contentType === "text" && "Text content"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Complete Payment
            </CardTitle>
            <CardDescription>
              Secure payment powered by Aptos blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Wallet Connection */}
            <div className="space-y-2">
              <Label htmlFor="wallet">Wallet Address</Label>
              <div className="flex gap-2">
                <Input
                  id="wallet"
                  placeholder="Connect your Aptos wallet"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => setWalletAddress("0x1234...abcd")}
                >
                  <Wallet className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Payment Summary */}
            <div className="space-y-3">
              <h4 className="font-medium">Payment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{paymentLink.title}</span>
                  <span>${amount.toFixed(2)} USDC</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Platform fee (2.5%)</span>
                  <span>${platformFee.toFixed(2)} USDC</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)} USDC</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={!walletAddress || isProcessing}
              className="w-full h-12"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay ${totalAmount.toFixed(2)} USDC
                </>
              )}
            </Button>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Secure payment powered by Aptos blockchain. Your transaction is
                protected by cryptographic security.
              </AlertDescription>
            </Alert>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Powered by{" "}
                <Link href="/" className="underline hover:no-underline">
                  Relynk
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

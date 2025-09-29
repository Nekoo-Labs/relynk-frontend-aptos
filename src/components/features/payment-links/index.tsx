"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useUrl from "@/hooks/use-url";
import {
  Plus,
  ExternalLink,
  Copy,
  Trash2,
  DollarSign,
  TrendingUp,
  Download,
  Wallet,
  LinkIcon,
  Repeat,
  Code,
  Edit3,
} from "lucide-react";
import Link from "next/link";

// Mock payment links data with enhanced features
const mockPaymentLinks = [
  {
    id: "1",
    title: "Web3 Consultation",
    description:
      "1-hour consultation on Web3 development and blockchain integration",
    price: 150,
    currency: "USDC",
    slug: "web3-consultation",
    url: "https://rely.ink/johndoe/web3-consultation",
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
    url: "https://rely.ink/johndoe/nft-design-course",
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
    url: "https://rely.ink/johndoe/coffee-support",
    type: "one_time" as const,
    contentType: "text" as const,
    contentValue:
      "Thank you for your support! Your contribution helps me create more content.",
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

// Mock user data
const mockUser = {
  username: "johndoe",
  availableBalance: 2847.5,
};

export default function PaymentLinks() {
  const { appUrl } = useUrl({ withoutSubdomain: true });

  // Generate dynamic URLs for mock data
  const generatePaymentLinkUrl = (username: string, slug: string) => {
    return appUrl
      ? `${appUrl}/${username}/${slug}`
      : `https://rely.ink/${username}/${slug}`;
  };

  // Update mock data with dynamic URLs
  const dynamicMockPaymentLinks = mockPaymentLinks.map((link) => ({
    ...link,
    url: generatePaymentLinkUrl(mockUser.username, link.slug),
  }));

  const [paymentLinks, setPaymentLinks] = useState(dynamicMockPaymentLinks);

  const totalEarnings = paymentLinks.reduce(
    (sum, link) => sum + link.totalEarned,
    0
  );
  const totalSales = paymentLinks.reduce(
    (sum, link) => sum + link.totalSales,
    0
  );

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // You could show a toast notification here
      alert("Payment link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const navigateToCreate = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard/payment-links/create";
    }
  };

  const navigateToWithdraw = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard/payment-links/withdraw";
    }
  };

  const navigateToEdit = (linkId: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/dashboard/payment-links/${linkId}/edit`;
    }
  };

  const navigateToEmbed = (linkId: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/dashboard/payment-links/${linkId}/embed`;
    }
  };

  const handleDeleteLink = (linkId: string) => {
    if (confirm("Are you sure you want to delete this payment link?")) {
      setPaymentLinks((prev) => prev.filter((link) => link.id !== linkId));
    }
  };

  const handleToggleActive = (linkId: string) => {
    setPaymentLinks((prev) =>
      prev.map((link) =>
        link.id === linkId ? { ...link, isActive: !link.isActive } : link
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payment Links</h1>
          <p className="text-muted-foreground">
            Create and manage your Web3 payment links
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={navigateToWithdraw} variant="outline">
            <Wallet className="w-4 h-4" />
            Withdraw Funds
          </Button>
          <Button onClick={navigateToCreate}>
            <Plus className="w-4 h-4" />
            Create Payment Link
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalEarnings.toFixed(2)} USDC
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +15.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8 sales
              </span>
              this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUser.availableBalance.toFixed(2)} USDC
            </div>
            <p className="text-xs text-muted-foreground">
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={navigateToWithdraw}
              >
                Withdraw funds
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Links List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Payment Links</CardTitle>
          <CardDescription>
            Manage your Web3 payment links and track performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockPaymentLinks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <div className="mb-4">
                <DollarSign className="w-12 h-12 mx-auto opacity-50" />
              </div>
              <p className="text-lg font-medium mb-2">No payment links yet</p>
              <p className="text-sm mb-4">
                Create your first payment link to start earning
              </p>
              <Button onClick={navigateToCreate}>
                <Plus className="w-4 h-4" />
                Create Your First Payment Link
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {paymentLinks.map((link) => {
                link.url = `${appUrl}${mockUser.username}/${link.slug}`;

                return (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">{link.title}</h4>
                        {link.isActive ? (
                          <Badge variant="default" className="text-xs">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 truncate">
                        {link.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium">
                          ${link.price} {link.currency}
                          {link.type === "subscription" && (
                            <Badge variant="outline" className="ml-1 text-xs">
                              <Repeat className="w-3 h-3 mr-1" />
                              {link.billingInterval}
                            </Badge>
                          )}
                        </span>
                        <span className="text-muted-foreground">
                          {link.totalSales} sales
                        </span>
                        <span className="text-muted-foreground">
                          ${link.totalEarned} earned
                        </span>
                        {link.allowCustomAmount && (
                          <Badge variant="secondary" className="text-xs">
                            Custom amount
                          </Badge>
                        )}
                      </div>
                      <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded mt-2 inline-block">
                        {link.url}
                      </code>
                    </div>

                    <div className="flex items-center gap-1 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyUrl(link.url)}
                        title="Copy payment link"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateToEmbed(link.id)}
                        title="Get embed code"
                      >
                        <Code className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        title="Open payment link"
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(link.id)}
                        title={link.isActive ? "Deactivate" : "Activate"}
                      >
                        {link.isActive ? "🟢" : "🔴"}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateToEdit(link.id)}
                        title="Edit payment link"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLink(link.id)}
                        className="text-destructive hover:text-destructive"
                        title="Delete payment link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Setup</CardTitle>
            <CardDescription>
              Get started with common payment link types
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={navigateToCreate}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              One-time Payment
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={navigateToCreate}
            >
              <Repeat className="w-4 h-4 mr-2" />
              Subscription
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={navigateToCreate}
            >
              <Download className="w-4 h-4 mr-2" />
              Digital Product
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Integration</CardTitle>
            <CardDescription>Add payment links to your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground mb-3">
              Your payment links can be automatically added to your link-in-bio
              profile.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/profile">
                <LinkIcon className="w-4 h-4 mr-2" />
                Manage Profile Links
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

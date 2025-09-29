"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  DollarSign,
  Link as LinkIcon,
  Copy,
  Edit3,
  Trash2,
  ExternalLink,
  TrendingUp,
  Link,
} from "lucide-react";

// Mock payment links data
const mockPaymentLinks = [
  {
    id: "1",
    title: "Web3 Consultation",
    description: "1-hour consultation on Web3 development",
    amount: 150,
    currency: "APT",
    url: "https://relynk.app/pay/consultation-123",
    isActive: true,
    totalEarned: 1200,
    totalSales: 8,
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    title: "NFT Design Course",
    description: "Complete guide to designing NFTs",
    amount: 99,
    currency: "APT",
    url: "https://relynk.app/pay/nft-course-456",
    isActive: true,
    totalEarned: 2970,
    totalSales: 30,
    createdAt: "2024-01-05",
  },
  {
    id: "3",
    title: "Coffee Support",
    description: "Buy me a coffee to support my work",
    amount: 5,
    currency: "APT",
    url: "https://relynk.app/pay/coffee-789",
    isActive: true,
    totalEarned: 125,
    totalSales: 25,
    createdAt: "2024-01-01",
  },
];

export default function PaymentLinks() {
  const totalEarnings = mockPaymentLinks.reduce(
    (sum, link) => sum + link.totalEarned,
    0
  );
  const totalSales = mockPaymentLinks.reduce(
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
        <Button>
          <Plus className="w-4 h-4" />
          Create Payment Link
        </Button>
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
            <div className="text-2xl font-bold">{totalEarnings} APT</div>
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
            <CardTitle className="text-sm font-medium">Active Links</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPaymentLinks.filter((link) => link.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              of {mockPaymentLinks.length} total links
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
              <Button>
                <Plus className="w-4 h-4" />
                Create Your First Payment Link
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockPaymentLinks.map((link) => (
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
                        {link.amount} {link.currency}
                      </span>
                      <span className="text-muted-foreground">
                        {link.totalSales} sales
                      </span>
                      <span className="text-muted-foreground">
                        {link.totalEarned} {link.currency} earned
                      </span>
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

                    <Button variant="ghost" size="sm" title="Edit payment link">
                      <Edit3 className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      title="Delete payment link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Consultation Service
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Digital Product
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Donation/Tip
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

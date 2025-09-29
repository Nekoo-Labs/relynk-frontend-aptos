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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import NextLink from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  Copy,
  Palette,
  User,
  Link as LinkIcon,
  CreditCard,
} from "lucide-react";
import {
  LinkManager,
  type Link,
  type PaymentLink,
} from "@/components/link-manager";
import { ProfileCustomizer } from "@/components/profile-customizer";
import { ProfilePreview } from "@/components/profile-preview";
import useUrl from "@/hooks/use-url";
import { AnimatedDiv } from "@/components/ui/animated-wrapper";

// Mock payment links data
const mockPaymentLinks = [
  {
    id: "1",
    title: "Web3 Consultation",
    description:
      "1-hour consultation on Web3 development and blockchain integration",
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
    contentValue:
      "Thank you for your support! Your contribution helps me create more content.",
    isActive: true,
    totalEarned: 125,
    totalSales: 25,
    createdAt: "2024-01-15",
  },
];

// Mock data - in a real app, this would come from your backend/blockchain
const mockProfile = {
  id: "user123",
  username: "johndoe",
  displayName: "John Doe",
  bio: "Web3 Developer & Creator | Building the future of decentralized apps",
  avatar: "",
  theme: "default",
  backgroundColor: "#ffffff",
  textColor: "#000000",
  buttonColor: "#000000",
  buttonTextColor: "#ffffff",
  links: [
    {
      id: "1",
      title: "My Portfolio",
      url: "https://johndoe.dev",
      description: "Check out my latest projects",
      isActive: true,
      clicks: 142,
      icon: "🌐",
      type: "regular" as const,
    },
    {
      id: "2",
      title: "Twitter",
      url: "https://twitter.com/johndoe",
      description: "Follow me for Web3 updates",
      isActive: true,
      clicks: 89,
      icon: "🐦",
      type: "regular" as const,
    },
    {
      id: "3",
      title: "GitHub",
      url: "https://github.com/johndoe",
      description: "Open source projects",
      isActive: true,
      clicks: 67,
      icon: "💻",
      type: "regular" as const,
    },
  ] as Link[],
};

export default function DashboardProfile() {
  const [profile, setProfile] = useState(mockProfile);
  const [paymentLinks] = useState(mockPaymentLinks);
  const [activeTab, setActiveTab] = useState("links");
  const [copied, setCopied] = useState(false);

  const { appUrl } = useUrl({ withoutSubdomain: true });

  const profileUrl = `${appUrl}${profile.username}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleProfileUpdate = (
    updates: Partial<{
      id: string;
      username: string;
      displayName: string;
      bio: string;
      avatar: string;
      theme: string;
      backgroundColor: string;
      textColor: string;
      buttonColor: string;
      buttonTextColor: string;
    }>
  ) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const handleLinksUpdate = (links: Link[]) => {
    setProfile((prev) => ({ ...prev, links }));
  };

  const handleAddPaymentLinkToProfile = (paymentLinkId: string) => {
    const paymentLink = paymentLinks.find((link) => link.id === paymentLinkId);
    if (!paymentLink) return;

    const profileLink: PaymentLink = {
      id: `payment-${paymentLink.id}`,
      title: paymentLink.title,
      url: `${appUrl}/${profile.username}/${paymentLink.slug}`,
      description: `${paymentLink.description} - ${paymentLink.price} ${paymentLink.currency}`,
      isActive: paymentLink.isActive,
      clicks: 0,
      icon: "💳",
      type: "payment" as const,
      paymentLinkId: paymentLink.id,
      price: paymentLink.price,
      currency: paymentLink.currency,
    };

    // Check if payment link is already added
    const existingLink = profile.links.find(
      (link) => "paymentLinkId" in link && link.paymentLinkId === paymentLink.id
    );

    if (!existingLink) {
      setProfile((prev) => ({
        ...prev,
        links: [...prev.links, profileLink] as Link[],
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <AnimatedDiv>
          <h1 className="text-2xl font-bold">Profile Management</h1>
          <p className="text-muted-foreground">
            Create and customize your link-in-bio profile
          </p>
        </AnimatedDiv>
        <AnimatedDiv className="flex items-center gap-2">
          <Button variant="outline" onClick={handleCopyUrl}>
            {copied ? "Copied!" : <Copy className="w-4 h-4" />}
            {!copied && "Copy URL"}
          </Button>
          <Button variant="outline" asChild>
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4" />
              Preview
            </a>
          </Button>
        </AnimatedDiv>
      </div>

      {/* Profile URL */}
      <AnimatedDiv>
        <Card>
          <CardHeader>
            <CardTitle>Profile URL</CardTitle>
            <CardDescription>
              Copy and paste this URL into your bio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
              <LinkIcon className="w-4 h-4 text-muted-foreground" />
              <code className="text-sm font-mono">{profileUrl}</code>
            </div>
          </CardContent>
        </Card>
      </AnimatedDiv>

      {/* Main Content */}
      <AnimatedDiv className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Management */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="links" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Links
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="customize"
                className="flex items-center gap-2"
              >
                <Palette className="w-4 h-4" />
                Design
              </TabsTrigger>
            </TabsList>

            <TabsContent value="links" className="space-y-4">
              <LinkManager
                links={profile.links}
                onLinksUpdate={handleLinksUpdate}
              />
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add Payment Links to Profile</CardTitle>
                  <CardDescription>
                    Select payment links to display on your public profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {paymentLinks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="mb-4">
                        <CreditCard className="w-12 h-12 mx-auto opacity-50" />
                      </div>
                      <p className="text-lg font-medium mb-2">
                        No payment links yet
                      </p>
                      <p className="text-sm mb-4">
                        Create payment links first to add them to your profile
                      </p>
                      <Button asChild>
                        <NextLink href="/dashboard/payment-links/create">
                          <CreditCard className="w-4 h-4" />
                          Create Payment Link
                        </NextLink>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {paymentLinks.map((paymentLink) => {
                        const isAdded = profile.links.some(
                          (link) =>
                            "paymentLinkId" in link &&
                            link.paymentLinkId === paymentLink.id
                        );

                        return (
                          <div
                            key={paymentLink.id}
                            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="text-2xl">💳</div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium truncate">
                                  {paymentLink.title}
                                </h4>
                                <Badge variant="secondary" className="text-xs">
                                  {paymentLink.price} {paymentLink.currency}
                                </Badge>
                                {paymentLink.type === "subscription" && (
                                  <Badge variant="outline" className="text-xs">
                                    {paymentLink.billingInterval}
                                  </Badge>
                                )}
                                {!paymentLink.isActive && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs"
                                  >
                                    Inactive
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                {paymentLink.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {paymentLink.totalSales} sales •{" "}
                                {paymentLink.totalEarned} {paymentLink.currency}{" "}
                                earned
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {isAdded ? null : (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleAddPaymentLinkToProfile(
                                      paymentLink.id
                                    )
                                  }
                                  disabled={!paymentLink.isActive}
                                >
                                  Add to Profile
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your public profile details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>
                        {profile.displayName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profile.username}
                        onChange={(e) =>
                          handleProfileUpdate({ username: e.target.value })
                        }
                        placeholder="johndoe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={profile.displayName}
                        onChange={(e) =>
                          handleProfileUpdate({
                            displayName: e.target.value,
                          })
                        }
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) =>
                          handleProfileUpdate({ bio: e.target.value })
                        }
                        placeholder="Tell people about yourself..."
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customize" className="space-y-4">
              <ProfileCustomizer
                profile={profile}
                onProfileUpdate={handleProfileUpdate}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:sticky lg:top-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Live Preview
              </CardTitle>
              <CardDescription>
                See how your profile looks to visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <ProfilePreview profile={profile} />
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedDiv>
    </div>
  );
}

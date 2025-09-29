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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Copy, Palette, User, Link as LinkIcon } from "lucide-react";
import { LinkManager } from "@/components/link-manager";
import { ProfileCustomizer } from "@/components/profile-customizer";
import { ProfilePreview } from "@/components/profile-preview";
import useUrl from "@/hooks/use-url";

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
    },
    {
      id: "2",
      title: "Twitter",
      url: "https://twitter.com/johndoe",
      description: "Follow me for Web3 updates",
      isActive: true,
      clicks: 89,
      icon: "🐦",
    },
    {
      id: "3",
      title: "GitHub",
      url: "https://github.com/johndoe",
      description: "Open source projects",
      isActive: true,
      clicks: 67,
      icon: "💻",
    },
  ],
};

export default function DashboardProfile() {
  const [profile, setProfile] = useState(mockProfile);
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

  const handleProfileUpdate = (updates: Partial<typeof profile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const handleLinksUpdate = (links: typeof profile.links) => {
    setProfile((prev) => ({ ...prev, links }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Profile Management</h1>
          <p className="text-muted-foreground">
            Create and customize your link-in-bio profile
          </p>
        </div>
        <div className="flex items-center gap-2">
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
        </div>
      </div>

      {/* Profile URL */}
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

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Management */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="links" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Links
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
      </div>
    </div>
  );
}

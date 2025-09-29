"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { ProfilePreview } from "@/components/profile-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Share2, Heart } from "lucide-react";

// Mock data - in a real app, this would come from your backend/blockchain
const mockProfiles = {
  johndoe: {
    id: "user123",
    username: "johndoe",
    displayName: "John Doe",
    bio: "Web3 Developer & Creator | Building the future of decentralized apps",
    avatar: "",
    theme: "gradient-blue",
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff",
    buttonColor: "#ffffff",
    buttonTextColor: "#667eea",
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
      {
        id: "4",
        title: "Buy Me a Coffee",
        url: "https://buymeacoffee.com/johndoe",
        description: "Support my work",
        isActive: true,
        clicks: 23,
        icon: "☕",
      },
      {
        id: "5",
        title: "Newsletter",
        url: "https://newsletter.johndoe.dev",
        description: "Weekly Web3 insights",
        isActive: true,
        clicks: 156,
        icon: "📧",
      },
    ],
  },
  alice: {
    id: "user456",
    username: "alice",
    displayName: "Alice Chen",
    bio: "Digital Artist & NFT Creator 🎨 | Exploring the intersection of art and technology",
    avatar: "",
    theme: "gradient-pink",
    backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    textColor: "#ffffff",
    buttonColor: "#ffffff",
    buttonTextColor: "#f5576c",
    links: [
      {
        id: "1",
        title: "NFT Collection",
        url: "https://opensea.io/alice",
        description: "My latest digital art pieces",
        isActive: true,
        clicks: 234,
        icon: "🎨",
      },
      {
        id: "2",
        title: "Instagram",
        url: "https://instagram.com/alice_creates",
        description: "Behind the scenes content",
        isActive: true,
        clicks: 189,
        icon: "📸",
      },
      {
        id: "3",
        title: "Art Commissions",
        url: "https://alice-art.com/commissions",
        description: "Custom artwork available",
        isActive: true,
        clicks: 45,
        icon: "✨",
      },
    ],
  },
};

type Profile = (typeof mockProfiles)["johndoe"];

export default function UserProfile({ username }: { username: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  //   const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const loadProfile = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundProfile = mockProfiles[username as keyof typeof mockProfiles];

      if (!foundProfile) {
        notFound();
      }

      setProfile(foundProfile);
      setLoading(false);
    };

    loadProfile();
  }, [username]);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile?.displayName} - Relynk Profile`,
          text: profile?.bio,
          url: url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        // You could show a toast notification here
        alert("Profile URL copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy URL:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return notFound();
  }

  const isGradient = profile.backgroundColor.startsWith("linear-gradient");

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        background: profile.backgroundColor,
      }}
    >
      {/* Background overlay for better readability */}
      {isGradient && <div className="absolute inset-0 bg-black/10" />}

      {/* Header Actions */}
      <div className="fixed top-4 right-4 z-10 flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleShare}
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Profile */}
      <div className="w-full max-w-md relative z-10">
        <ProfilePreview profile={profile} isPublic={true} />
      </div>

      {/* Footer */}
      <div className="mt-8 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge
            variant="secondary"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white"
          >
            <Heart className="w-3 h-3 mr-1" />
            Powered by Relynk
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        >
          <a href="/dashboard" target="_blank" rel="noopener noreferrer">
            Create Your Own Profile
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}

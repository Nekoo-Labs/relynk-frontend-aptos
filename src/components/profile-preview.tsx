"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  isActive: boolean;
  clicks: number;
  icon: string;
}

interface Profile {
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
  links: Link[];
}

interface ProfilePreviewProps {
  profile: Profile;
  isPublic?: boolean;
}

export function ProfilePreview({
  profile,
  isPublic = false,
}: ProfilePreviewProps) {
  const activeLinks = profile.links.filter((link) => link.isActive);

  const containerStyle = {
    backgroundColor: profile.backgroundColor,
    color: profile.textColor,
  };

  const buttonStyle = {
    backgroundColor: profile.buttonColor,
    color: profile.buttonTextColor,
    borderColor: profile.buttonColor,
  };

  return (
    <div
      className="w-full max-w-md mx-auto min-h-[600px] p-6 flex flex-col items-center"
      style={containerStyle}
    >
      {/* Profile Header */}
      <div className="text-center mb-8">
        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white/20">
          <AvatarImage src={profile.avatar} alt={profile.displayName} />
          <AvatarFallback className="text-2xl">
            {profile.displayName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold mb-2">{profile.displayName}</h1>
        <p className="text-sm opacity-80 mb-4">@{profile.username}</p>

        {profile.bio && (
          <p className="text-sm leading-relaxed opacity-90 max-w-xs">
            {profile.bio}
          </p>
        )}
      </div>

      {/* Links */}
      <div className="w-full space-y-3 flex-1">
        {activeLinks.length === 0 ? (
          <div className="text-center py-8 opacity-60">
            <p className="text-sm">No links available</p>
          </div>
        ) : (
          activeLinks.map((link) => (
            <a
              key={link.id}
              href={isPublic ? link.url : undefined}
              target={isPublic ? "_blank" : undefined}
              rel={isPublic ? "noopener noreferrer" : undefined}
              className={`
                block w-full p-4 rounded-xl border transition-all duration-200
                ${
                  isPublic
                    ? "hover:scale-105 hover:shadow-lg cursor-pointer"
                    : "cursor-default"
                }
              `}
              style={{
                ...buttonStyle,
                border: `2px solid ${profile.buttonColor}`,
              }}
              onClick={!isPublic ? (e) => e.preventDefault() : undefined}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-xl flex-shrink-0">{link.icon}</span>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-medium truncate">{link.title}</div>
                    {link.description && (
                      <div className="text-sm opacity-80 truncate">
                        {link.description}
                      </div>
                    )}
                  </div>
                </div>
                {isPublic && (
                  <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-60" />
                )}
              </div>
            </a>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs opacity-60">Powered by Relynk</p>
      </div>
    </div>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
  links: {
    id: string;
    title: string;
    url: string;
    description: string;
    isActive: boolean;
    clicks: number;
    icon: string;
  }[];
}

interface ProfileCustomizerProps {
  profile: Profile;
  onProfileUpdate: (updates: Partial<Profile>) => void;
}

const themes = [
  {
    id: "default",
    name: "Default",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
  },
  {
    id: "dark",
    name: "Dark",
    backgroundColor: "#1a1a1a",
    textColor: "#ffffff",
    buttonColor: "#ffffff",
    buttonTextColor: "#000000",
  },
  {
    id: "gradient-blue",
    name: "Ocean Blue",
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff",
    buttonColor: "#ffffff",
    buttonTextColor: "#667eea",
  },
  {
    id: "gradient-pink",
    name: "Sunset Pink",
    backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    textColor: "#ffffff",
    buttonColor: "#ffffff",
    buttonTextColor: "#f5576c",
  },
  {
    id: "gradient-green",
    name: "Forest Green",
    backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    textColor: "#ffffff",
    buttonColor: "#ffffff",
    buttonTextColor: "#4facfe",
  },
  {
    id: "minimal",
    name: "Minimal Gray",
    backgroundColor: "#f8f9fa",
    textColor: "#212529",
    buttonColor: "#6c757d",
    buttonTextColor: "#ffffff",
  },
];

const colorPresets = [
  { name: "Black", color: "#000000" },
  { name: "White", color: "#ffffff" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Green", color: "#10b981" },
  { name: "Purple", color: "#8b5cf6" },
  { name: "Pink", color: "#ec4899" },
  { name: "Orange", color: "#f97316" },
  { name: "Red", color: "#ef4444" },
];

export function ProfileCustomizer({
  profile,
  onProfileUpdate,
}: ProfileCustomizerProps) {
  const handleThemeChange = (theme: (typeof themes)[0]) => {
    onProfileUpdate({
      theme: theme.id,
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      buttonColor: theme.buttonColor,
      buttonTextColor: theme.buttonTextColor,
    });
  };

  const handleColorChange = (
    type: "backgroundColor" | "textColor" | "buttonColor" | "buttonTextColor",
    color: string
  ) => {
    onProfileUpdate({ [type]: color });
  };

  const isGradient = (color: string) => color.startsWith("linear-gradient");

  return (
    <div className="space-y-6">
      {/* Theme Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Presets</CardTitle>
          <CardDescription>
            Choose from pre-designed themes or customize your own
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme)}
                className={`
                  relative p-4 rounded-lg border-2 transition-all hover:scale-105
                  ${
                    profile.theme === theme.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-muted hover:border-primary/50"
                  }
                `}
              >
                <div
                  className="w-full h-16 rounded-md mb-2 flex items-center justify-center"
                  style={{
                    background: theme.backgroundColor,
                    color: theme.textColor,
                  }}
                >
                  <div
                    className="px-3 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: theme.buttonColor,
                      color: theme.buttonTextColor,
                    }}
                  >
                    Button
                  </div>
                </div>
                <p className="text-sm font-medium">{theme.name}</p>
                {profile.theme === theme.id && (
                  <Badge className="absolute -top-2 -right-2" variant="default">
                    Active
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Colors</CardTitle>
          <CardDescription>Fine-tune your profile colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Background Color */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Background Color
            </Label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={
                    isGradient(profile.backgroundColor)
                      ? "#ffffff"
                      : profile.backgroundColor
                  }
                  onChange={(e) =>
                    handleColorChange("backgroundColor", e.target.value)
                  }
                  className="w-10 h-10 rounded border cursor-pointer"
                  disabled={isGradient(profile.backgroundColor)}
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={profile.backgroundColor}
                    onChange={(e) =>
                      handleColorChange("backgroundColor", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border rounded-md"
                    placeholder="#ffffff or gradient..."
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      handleColorChange("backgroundColor", preset.color)
                    }
                    className="w-8 h-8 rounded border-2 border-muted hover:border-primary transition-colors"
                    style={{ backgroundColor: preset.color }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Text Color */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Text Color</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={profile.textColor}
                  onChange={(e) =>
                    handleColorChange("textColor", e.target.value)
                  }
                  className="w-10 h-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={profile.textColor}
                  onChange={(e) =>
                    handleColorChange("textColor", e.target.value)
                  }
                  className="flex-1 px-3 py-2 text-sm border rounded-md"
                  placeholder="#000000"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handleColorChange("textColor", preset.color)}
                    className="w-8 h-8 rounded border-2 border-muted hover:border-primary transition-colors"
                    style={{ backgroundColor: preset.color }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Button Color */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Button Color
            </Label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={profile.buttonColor}
                  onChange={(e) =>
                    handleColorChange("buttonColor", e.target.value)
                  }
                  className="w-10 h-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={profile.buttonColor}
                  onChange={(e) =>
                    handleColorChange("buttonColor", e.target.value)
                  }
                  className="flex-1 px-3 py-2 text-sm border rounded-md"
                  placeholder="#000000"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      handleColorChange("buttonColor", preset.color)
                    }
                    className="w-8 h-8 rounded border-2 border-muted hover:border-primary transition-colors"
                    style={{ backgroundColor: preset.color }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Button Text Color */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Button Text Color
            </Label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={profile.buttonTextColor}
                  onChange={(e) =>
                    handleColorChange("buttonTextColor", e.target.value)
                  }
                  className="w-10 h-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={profile.buttonTextColor}
                  onChange={(e) =>
                    handleColorChange("buttonTextColor", e.target.value)
                  }
                  className="flex-1 px-3 py-2 text-sm border rounded-md"
                  placeholder="#ffffff"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      handleColorChange("buttonTextColor", preset.color)
                    }
                    className="w-8 h-8 rounded border-2 border-muted hover:border-primary transition-colors"
                    style={{ backgroundColor: preset.color }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <Card>
        <CardContent className="pt-6">
          <Button
            variant="outline"
            onClick={() => handleThemeChange(themes[0])}
            className="w-full"
          >
            Reset to Default Theme
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

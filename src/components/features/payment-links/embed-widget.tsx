"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useUrl from "@/hooks/use-url";
import {
  Copy,
  Code,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  Settings,
} from "lucide-react";

interface PaymentLink {
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  type: "one_time" | "subscription";
  billingInterval?: "monthly" | "yearly";
}

interface EmbedWidgetProps {
  paymentLink: PaymentLink;
  username: string;
}

export function EmbedWidget({ paymentLink, username }: EmbedWidgetProps) {
  const { appUrl } = useUrl({ withoutSubdomain: true });
  const [widgetStyle, setWidgetStyle] = useState({
    theme: "light",
    primaryColor: "#3b82f6",
    backgroundColor: "#ffffff",
    borderRadius: "8",
    showDescription: true,
    showPoweredBy: true,
    buttonText: "Buy Now",
    width: "400",
    height: "auto",
  });

  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [copied, setCopied] = useState<string | null>(null);

  const generateEmbedCode = (type: "iframe" | "script" | "button") => {
    const baseUrl = appUrl
      ? `${appUrl}/${username}/${paymentLink.slug}`
      : `https://rely.ink/${username}/${paymentLink.slug}`;
    const params = new URLSearchParams({
      embed: "true",
      theme: widgetStyle.theme,
      primary_color: widgetStyle.primaryColor.replace("#", ""),
      bg_color: widgetStyle.backgroundColor.replace("#", ""),
      border_radius: widgetStyle.borderRadius,
      show_description: widgetStyle.showDescription.toString(),
      show_powered_by: widgetStyle.showPoweredBy.toString(),
      button_text: widgetStyle.buttonText,
    });

    switch (type) {
      case "iframe":
        return `<iframe
  src="${baseUrl}?${params.toString()}"
  width="${widgetStyle.width}"
  height="${widgetStyle.height === "auto" ? "300" : widgetStyle.height}"
  frameborder="0"
  scrolling="no"
  style="border-radius: ${widgetStyle.borderRadius}px; overflow: hidden;">
</iframe>`;

      case "script":
        const embedScriptUrl = appUrl
          ? `${appUrl}/embed.js`
          : `https://rely.ink/embed.js`;
        return `<script
  src="${embedScriptUrl}"
  data-payment-link="${paymentLink.slug}"
  data-username="${username}"
  data-theme="${widgetStyle.theme}"
  data-primary-color="${widgetStyle.primaryColor}"
  data-bg-color="${widgetStyle.backgroundColor}"
  data-border-radius="${widgetStyle.borderRadius}"
  data-show-description="${widgetStyle.showDescription}"
  data-show-powered-by="${widgetStyle.showPoweredBy}"
  data-button-text="${widgetStyle.buttonText}"
  data-width="${widgetStyle.width}"
  async>
</script>`;

      case "button":
        return `<a
  href="${baseUrl}"
  target="_blank"
  rel="noopener noreferrer"
  style="
    display: inline-block;
    padding: 12px 24px;
    background-color: ${widgetStyle.primaryColor};
    color: ${widgetStyle.theme === "light" ? "#ffffff" : "#000000"};
    text-decoration: none;
    border-radius: ${widgetStyle.borderRadius}px;
    font-weight: 600;
    font-family: system-ui, -apple-system, sans-serif;
    transition: opacity 0.2s;
  "
  onmouseover="this.style.opacity='0.8'"
  onmouseout="this.style.opacity='1'"
>
  ${widgetStyle.buttonText} - $${paymentLink.price} USDC
</a>`;

      default:
        return "";
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getDeviceWidth = () => {
    switch (previewDevice) {
      case "mobile":
        return "320px";
      case "tablet":
        return "768px";
      case "desktop":
        return "100%";
      default:
        return "100%";
    }
  };

  const renderPreview = () => {
    const isSubscription = paymentLink.type === "subscription";
    const priceText = isSubscription
      ? `$${paymentLink.price}/mo`
      : `$${paymentLink.price}`;

    return (
      <div
        className="border rounded-lg overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: widgetStyle.backgroundColor,
          borderRadius: `${widgetStyle.borderRadius}px`,
          width: getDeviceWidth(),
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <div className="p-6 text-center">
          <h3
            className="text-xl font-bold mb-2"
            style={{
              color: widgetStyle.theme === "light" ? "#000000" : "#ffffff",
            }}
          >
            {paymentLink.title}
          </h3>

          {widgetStyle.showDescription && paymentLink.description && (
            <p
              className="text-sm mb-4 opacity-80"
              style={{
                color: widgetStyle.theme === "light" ? "#666666" : "#cccccc",
              }}
            >
              {paymentLink.description}
            </p>
          )}

          <div
            className="text-2xl font-bold mb-4"
            style={{ color: widgetStyle.primaryColor }}
          >
            {priceText}
            {isSubscription && (
              <span className="text-sm font-normal opacity-70">
                /{paymentLink.billingInterval?.replace("ly", "")}
              </span>
            )}
          </div>

          <button
            className="px-6 py-3 rounded font-medium transition-all hover:opacity-80 w-full"
            style={{
              backgroundColor: widgetStyle.primaryColor,
              color: widgetStyle.theme === "light" ? "#ffffff" : "#000000",
              borderRadius: `${widgetStyle.borderRadius}px`,
            }}
          >
            {widgetStyle.buttonText}
          </button>

          {widgetStyle.showPoweredBy && (
            <p
              className="text-xs mt-4 opacity-60"
              style={{
                color: widgetStyle.theme === "light" ? "#666666" : "#cccccc",
              }}
            >
              Powered by Relynk
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Embed Widget
          </CardTitle>
          <CardDescription>
            Embed this payment link on your website or blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Configuration */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Widget Settings
                </h4>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={widgetStyle.theme}
                        onValueChange={(value) =>
                          setWidgetStyle((prev) => ({ ...prev, theme: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="borderRadius">Border Radius</Label>
                      <Select
                        value={widgetStyle.borderRadius}
                        onValueChange={(value) =>
                          setWidgetStyle((prev) => ({
                            ...prev,
                            borderRadius: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">None</SelectItem>
                          <SelectItem value="4">Small</SelectItem>
                          <SelectItem value="8">Medium</SelectItem>
                          <SelectItem value="12">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={widgetStyle.primaryColor}
                          onChange={(e) =>
                            setWidgetStyle((prev) => ({
                              ...prev,
                              primaryColor: e.target.value,
                            }))
                          }
                          className="w-10 h-10 rounded border cursor-pointer"
                        />
                        <Input
                          value={widgetStyle.primaryColor}
                          onChange={(e) =>
                            setWidgetStyle((prev) => ({
                              ...prev,
                              primaryColor: e.target.value,
                            }))
                          }
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="backgroundColor">Background Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={widgetStyle.backgroundColor}
                          onChange={(e) =>
                            setWidgetStyle((prev) => ({
                              ...prev,
                              backgroundColor: e.target.value,
                            }))
                          }
                          className="w-10 h-10 rounded border cursor-pointer"
                        />
                        <Input
                          value={widgetStyle.backgroundColor}
                          onChange={(e) =>
                            setWidgetStyle((prev) => ({
                              ...prev,
                              backgroundColor: e.target.value,
                            }))
                          }
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      value={widgetStyle.buttonText}
                      onChange={(e) =>
                        setWidgetStyle((prev) => ({
                          ...prev,
                          buttonText: e.target.value,
                        }))
                      }
                      placeholder="Buy Now"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Width (px)</Label>
                      <Input
                        value={widgetStyle.width}
                        onChange={(e) =>
                          setWidgetStyle((prev) => ({
                            ...prev,
                            width: e.target.value,
                          }))
                        }
                        placeholder="400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Select
                        value={widgetStyle.height}
                        onValueChange={(value) =>
                          setWidgetStyle((prev) => ({ ...prev, height: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="200">200px</SelectItem>
                          <SelectItem value="300">300px</SelectItem>
                          <SelectItem value="400">400px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showDescription">Show Description</Label>
                      <Switch
                        checked={widgetStyle.showDescription}
                        onCheckedChange={(checked) =>
                          setWidgetStyle((prev) => ({
                            ...prev,
                            showDescription: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPoweredBy">
                        Show &quot;Powered by Relynk&quot;
                      </Label>
                      <Switch
                        checked={widgetStyle.showPoweredBy}
                        onCheckedChange={(checked) =>
                          setWidgetStyle((prev) => ({
                            ...prev,
                            showPoweredBy: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </h4>

                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                  <Button
                    variant={previewDevice === "desktop" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewDevice("desktop")}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={previewDevice === "tablet" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewDevice("tablet")}
                  >
                    <Tablet className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={previewDevice === "mobile" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewDevice("mobile")}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px] flex items-center justify-center">
                {renderPreview()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Embed Code */}
      <Card>
        <CardHeader>
          <CardTitle>Embed Code</CardTitle>
          <CardDescription>
            Copy and paste one of these code snippets into your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="iframe">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="iframe">iFrame</TabsTrigger>
              <TabsTrigger value="script">JavaScript</TabsTrigger>
              <TabsTrigger value="button">Button Link</TabsTrigger>
            </TabsList>

            <TabsContent value="iframe" className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>iFrame Embed</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(generateEmbedCode("iframe"), "iframe")
                  }
                >
                  {copied === "iframe" ? (
                    "Copied!"
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Textarea
                value={generateEmbedCode("iframe")}
                readOnly
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">
                Simple iframe embed. Works on most websites and platforms.
              </p>
            </TabsContent>

            <TabsContent value="script" className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>JavaScript Embed</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(generateEmbedCode("script"), "script")
                  }
                >
                  {copied === "script" ? (
                    "Copied!"
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Textarea
                value={generateEmbedCode("script")}
                readOnly
                rows={12}
                className="font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">
                Advanced embed with better responsive behavior and loading
                performance.
              </p>
            </TabsContent>

            <TabsContent value="button" className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Button Link</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(generateEmbedCode("button"), "button")
                  }
                >
                  {copied === "button" ? (
                    "Copied!"
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Textarea
                value={generateEmbedCode("button")}
                readOnly
                rows={18}
                className="font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">
                Simple button that opens the payment page in a new window.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

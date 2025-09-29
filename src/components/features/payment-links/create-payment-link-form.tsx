"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DollarSign,
  Link as LinkIcon,
  FileText,
  Key,
  Download,
  Repeat,
  CreditCard,
  Globe,
} from "lucide-react";
import useUrl from "@/hooks/use-url";

const paymentLinkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(50, "Slug must be less than 50 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  price: z.number().min(0.01, "Price must be greater than 0"),
  type: z.enum(["one_time", "subscription"]),
  billingInterval: z.enum(["monthly", "yearly"]).optional(),
  contentType: z.enum(["link", "file", "access_code", "text"]),
  contentValue: z.string().min(1, "Content is required"),
  isActive: z.boolean(),
  allowCustomAmount: z.boolean(),
  minimumAmount: z.number().optional(),
  maxPurchases: z.number().optional(),
  expiresAt: z.string().optional(),
});

type PaymentLinkFormData = z.infer<typeof paymentLinkSchema>;

interface CreatePaymentLinkFormProps {
  onSubmit: (data: PaymentLinkFormData) => void;
  onCancel: () => void;
  initialData?: Partial<PaymentLinkFormData>;
  username: string;
}

export function CreatePaymentLinkForm({
  onSubmit,
  onCancel,
  initialData,
  username,
}: CreatePaymentLinkFormProps) {
  const { appUrl } = useUrl({ withoutSubdomain: true });
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);

  const form = useForm<PaymentLinkFormData>({
    resolver: zodResolver(paymentLinkSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      type: initialData?.type || "one_time",
      billingInterval: initialData?.billingInterval || "monthly",
      contentType: initialData?.contentType || "link",
      contentValue: initialData?.contentValue || "",
      isActive: initialData?.isActive ?? true,
      allowCustomAmount: initialData?.allowCustomAmount || false,
      minimumAmount: initialData?.minimumAmount || undefined,
      maxPurchases: initialData?.maxPurchases || undefined,
      expiresAt: initialData?.expiresAt || "",
    },
  });

  const watchType = form.watch("type");
  const watchSlug = form.watch("slug");
  const watchContentType = form.watch("contentType");
  const watchAllowCustomAmount = form.watch("allowCustomAmount");

  // Mock slug availability check
  const checkSlugAvailability = async (slug: string) => {
    if (!slug || slug.length < 3) return;

    setCheckingSlug(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock logic - some slugs are "taken"
    const takenSlugs = [
      "test",
      "admin",
      "api",
      "www",
      "consultation",
      "course",
    ];
    const available = !takenSlugs.includes(slug.toLowerCase());
    setSlugAvailable(available);
    setCheckingSlug(false);
  };

  const generateSlugFromTitle = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    form.setValue("slug", slug);
    checkSlugAvailability(slug);
  };

  const handleSubmit = (data: PaymentLinkFormData) => {
    onSubmit(data);
  };

  const previewUrl = appUrl
    ? `${appUrl}/${username}/${watchSlug || "your-slug"}`
    : `rely.ink/${username}/${watchSlug || "your-slug"}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            {initialData ? "Edit Payment Link" : "Create Payment Link"}
          </CardTitle>
          <CardDescription>
            Create a shareable payment link for your products or services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Web3 Consultation"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              if (!watchSlug) {
                                generateSlugFromTitle(e.target.value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          The name of your product or service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom URL Slug *</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="web3-consultation"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  checkSlugAvailability(e.target.value);
                                }}
                              />
                              {checkingSlug && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                              )}
                              {slugAvailable === true && (
                                <Badge
                                  variant="default"
                                  className="text-green-600"
                                >
                                  Available
                                </Badge>
                              )}
                              {slugAvailable === false && (
                                <Badge variant="destructive">Taken</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <Globe className="w-4 h-4 inline mr-1" />
                              {previewUrl}
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Unique URL for your payment link (lowercase, numbers,
                          hyphens only)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="1-hour consultation on Web3 development and blockchain integration"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional description to help customers understand what
                          they&apos;re buying
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="one_time">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                One-time Payment
                              </div>
                            </SelectItem>
                            <SelectItem value="subscription">
                              <div className="flex items-center gap-2">
                                <Repeat className="w-4 h-4" />
                                Subscription
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchType === "subscription" && (
                    <FormField
                      control={form.control}
                      name="billingInterval"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Billing Interval</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select billing interval" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (USDC) *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="number"
                              step="0.01"
                              min="0.01"
                              placeholder="99.00"
                              className="pl-10"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Price in USDC{" "}
                          {watchType === "subscription" &&
                            `per ${form
                              .watch("billingInterval")
                              ?.replace("ly", "")}`}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allowCustomAmount"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Allow Custom Amount
                          </FormLabel>
                          <FormDescription>
                            Let customers pay more than the minimum price
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {watchAllowCustomAmount && (
                    <FormField
                      control={form.control}
                      name="minimumAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Amount (USDC)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder="10.00"
                                className="pl-10"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || undefined
                                  )
                                }
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Minimum amount customers can pay
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Delivery Method</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="How will customers access the content?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="link">
                              <div className="flex items-center gap-2">
                                <LinkIcon className="w-4 h-4" />
                                Redirect to URL
                              </div>
                            </SelectItem>
                            <SelectItem value="file">
                              <div className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                File Download
                              </div>
                            </SelectItem>
                            <SelectItem value="access_code">
                              <div className="flex items-center gap-2">
                                <Key className="w-4 h-4" />
                                Access Code
                              </div>
                            </SelectItem>
                            <SelectItem value="text">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Text Content
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose how customers will receive their purchase
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contentValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {watchContentType === "link" && "Redirect URL"}
                          {watchContentType === "file" && "File URL"}
                          {watchContentType === "access_code" && "Access Code"}
                          {watchContentType === "text" && "Text Content"}
                          {" *"}
                        </FormLabel>
                        <FormControl>
                          {watchContentType === "text" ? (
                            <Textarea
                              placeholder="Enter the content customers will receive..."
                              rows={4}
                              {...field}
                            />
                          ) : (
                            <Input
                              placeholder={
                                watchContentType === "link"
                                  ? "https://example.com/course"
                                  : watchContentType === "file"
                                  ? "https://example.com/download/file.pdf"
                                  : watchContentType === "access_code"
                                  ? "COURSE2024"
                                  : "Enter content..."
                              }
                              {...field}
                            />
                          )}
                        </FormControl>
                        <FormDescription>
                          {watchContentType === "link" &&
                            "URL where customers will be redirected after payment"}
                          {watchContentType === "file" &&
                            "Direct link to the file customers will download"}
                          {watchContentType === "access_code" &&
                            "Code that customers will receive to access your content"}
                          {watchContentType === "text" &&
                            "Text content that will be displayed to customers after payment"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="maxPurchases"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Purchases (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="Leave empty for unlimited"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Limit the number of times this link can be purchased
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiresAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiration Date (Optional)</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormDescription>
                          Set when this payment link should stop accepting
                          payments
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Active</FormLabel>
                          <FormDescription>
                            Enable or disable this payment link
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <Separator />

              <div className="flex items-center justify-between">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={slugAvailable === false}>
                  {initialData ? "Update Payment Link" : "Create Payment Link"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

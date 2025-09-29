"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, DollarSign, TrendingDown, Info } from "lucide-react";

const withdrawalSchema = z.object({
  amount: z.number().min(10, "Minimum withdrawal amount is 10 USDC"),
  walletAddress: z.string().min(1, "Wallet address is required"),
  platformFee: z.number().min(1).max(5),
});

type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

interface WithdrawalFormProps {
  availableBalance: number;
  onSubmit: (data: WithdrawalFormData) => void;
  onCancel: () => void;
}

export function WithdrawalForm({
  availableBalance,
  onSubmit,
  onCancel,
}: WithdrawalFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: 0,
      walletAddress: "",
      platformFee: 2.5, // Default 2.5% fee
    },
  });

  const watchAmount = form.watch("amount");
  const watchPlatformFee = form.watch("platformFee");

  const platformFeeAmount = (watchAmount * watchPlatformFee) / 100;
  const netAmount = watchAmount - platformFeeAmount;
  const maxWithdrawal = availableBalance;

  const handleSubmit = async (data: WithdrawalFormData) => {
    setIsProcessing(true);
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onSubmit(data);
    setIsProcessing(false);
  };

  const setMaxAmount = () => {
    form.setValue("amount", maxWithdrawal);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Withdraw Funds
          </CardTitle>
          <CardDescription>
            Transfer your earnings to your wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Available Balance */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Available Balance
                </p>
                <p className="text-2xl font-bold">
                  {availableBalance.toFixed(2)} USDC
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Minimum Withdrawal
                </p>
                <p className="text-lg font-medium">10.00 USDC</p>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0x1234...abcd or wallet.apt"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your Aptos wallet address to receive USDC
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Withdrawal Amount (USDC) *</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            step="0.01"
                            min="10"
                            max={maxWithdrawal}
                            placeholder="100.00"
                            className="pl-10 pr-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-2 text-xs"
                            onClick={setMaxAmount}
                          >
                            Max
                          </Button>
                        </div>

                        {/* Quick Amount Buttons */}
                        <div className="flex gap-2">
                          {[25, 50, 100, 250].map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                form.setValue(
                                  "amount",
                                  Math.min(amount, maxWithdrawal)
                                )
                              }
                              disabled={amount > maxWithdrawal}
                            >
                              ${amount}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Amount to withdraw (minimum 10 USDC)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platformFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform Fee: {watchPlatformFee}%</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={1}
                          max={5}
                          step={0.1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>1% (Min)</span>
                          <span>5% (Max)</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Adjust the platform fee (1% - 5%). Lower fees support the
                      platform development.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Withdrawal Summary */}
              {watchAmount > 0 && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <h4 className="font-medium mb-4">Withdrawal Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Withdrawal Amount</span>
                        <span className="font-medium">
                          {watchAmount.toFixed(2)} USDC
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Platform Fee ({watchPlatformFee}%)</span>
                        <span>-{platformFeeAmount.toFixed(2)} USDC</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium text-lg">
                        <span>You&apos;ll receive</span>
                        <span className="text-green-600">
                          {netAmount.toFixed(2)} USDC
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Processing Info */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Withdrawals are processed within 24 hours. You&apos;ll receive
                  a confirmation email once the transfer is complete.
                </AlertDescription>
              </Alert>

              {/* Fee Explanation */}
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent>
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">
                        About Platform Fees
                      </h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Platform fees help us maintain and improve Relynk&apos;s
                        services, including:
                      </p>
                      <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                        <li>Secure payment processing</li>
                        <li>Platform maintenance and updates</li>
                        <li>Customer support</li>
                        <li>New feature development</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isProcessing ||
                    watchAmount < 10 ||
                    watchAmount > maxWithdrawal
                  }
                  className="min-w-32"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Withdraw{" "}
                      {netAmount > 0 ? `${netAmount.toFixed(2)} USDC` : ""}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

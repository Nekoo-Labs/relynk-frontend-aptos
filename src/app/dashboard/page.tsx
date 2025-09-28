import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletSelector } from "@/components/wallet-selector";

export default function DashboardPage() {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Connect a Wallet</CardTitle>
          <CardDescription>
            Connect your wallet to start using Relynk
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <WalletSelector />
        </CardFooter>
      </Card>
    </div>
  );
}

"use client"

import { useWallet } from "@/context/wallet-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function WalletStatus() {
  const { address, isAuthorized } = useWallet()

  if (!address) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Wallet not connected</AlertTitle>
        <AlertDescription>Please connect your wallet to access this feature.</AlertDescription>
      </Alert>
    )
  }

  if (!isAuthorized) {
    return (
      <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Unauthorized wallet</AlertTitle>
        <AlertDescription className="flex flex-col gap-1">
          <span>Your wallet is not authorized to register products.</span>
          <span className="font-mono text-xs">{address}</span>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Wallet connected</AlertTitle>
      <AlertDescription className="flex flex-col gap-1">
        <span>Your wallet is authorized to register products.</span>
        <span className="font-mono text-xs">{address}</span>
      </AlertDescription>
    </Alert>
  )
}

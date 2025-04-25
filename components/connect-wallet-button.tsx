"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Wallet } from "lucide-react"
import { useWallet } from "@/context/wallet-context"

export default function ConnectWalletButton() {
  const [open, setOpen] = useState(false)
  const { address, connect, disconnect } = useWallet()

  const handleConnect = (walletType: string) => {
    connect(walletType)
    setOpen(false)
  }

  if (address) {
    return (
      <Button variant="outline" onClick={disconnect} className="flex gap-2">
        <Wallet className="h-4 w-4" />
        <span className="hidden sm:inline-block font-mono text-xs">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      </Button>
    )
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="flex gap-2">
        <Wallet className="h-4 w-4" />
        <span className="hidden sm:inline-block">Connect Wallet</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>Connect your wallet to register products on the blockchain</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => handleConnect("metamask")} className="flex justify-start gap-3">
              <img src="/placeholder.svg?height=24&width=24" alt="MetaMask" className="h-6 w-6" />
              MetaMask
            </Button>
            <Button onClick={() => handleConnect("ton")} className="flex justify-start gap-3">
              <img src="/placeholder.svg?height=24&width=24" alt="TON Connect" className="h-6 w-6" />
              TON Connect
            </Button>
            <Button onClick={() => handleConnect("walletconnect")} className="flex justify-start gap-3">
              <img src="/placeholder.svg?height=24&width=24" alt="WalletConnect" className="h-6 w-6" />
              WalletConnect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

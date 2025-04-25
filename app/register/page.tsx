"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/context/wallet-context"
import WalletStatus from "@/components/wallet-status"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { address, isAuthorized } = useWallet()

  const [productId, setProductId] = useState("")
  const [harvestDate, setHarvestDate] = useState("")
  const [location, setLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to register a product.",
        variant: "destructive",
      })
      return
    }

    if (!isAuthorized) {
      toast({
        title: "Unauthorized wallet",
        description: "Your wallet is not authorized to register products.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Mock blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockTxHash =
        "0x" +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")

      toast({
        title: "Product registered successfully!",
        description: "Transaction has been confirmed on the blockchain.",
      })

      // Redirect to success page
      router.push(`/success/${productId}?txHash=${mockTxHash}`)
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error registering your product.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12">
      <WalletStatus />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Register a Product</CardTitle>
          <CardDescription>Log your product information securely on the blockchain</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productId">Product/Batch ID</Label>
              <Input
                id="productId"
                placeholder="Enter a unique product identifier"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="harvestDate">Harvest Date & Time</Label>
              <Input
                id="harvestDate"
                type="datetime-local"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Farm location or coordinates"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setLocation("Current location (mock)")}
                className="mt-2"
              >
                Use Current Location
              </Button>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={!address || !isAuthorized || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting to Blockchain...
                </>
              ) : (
                "Register Product on Blockchain"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {!address && (
        <div className="mt-6 text-center p-4 bg-muted rounded-lg">
          <p className="text-muted-foreground">Please connect your wallet to register products.</p>
        </div>
      )}

      {address && !isAuthorized && (
        <div className="mt-6 text-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800">
            Your wallet is not authorized to register products. Please contact an administrator to get authorized.
          </p>
        </div>
      )}
    </div>
  )
}

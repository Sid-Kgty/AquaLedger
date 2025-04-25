"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink, Search, XCircle } from "lucide-react"
import Link from "next/link"

// Mock product database
const mockProducts = {
  PROD001: {
    id: "PROD001",
    harvestDate: "2023-04-15T10:30:00",
    location: "Farm A, California",
    producer: "0x1234567890abcdef1234567890abcdef12345678",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  PROD002: {
    id: "PROD002",
    harvestDate: "2023-04-20T08:45:00",
    location: "Farm B, Oregon",
    producer: "0x1234567890abcdef1234567890abcdef12345678",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  },
}

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const [productId, setProductId] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [verificationStatus, setVerificationStatus] = useState<"verified" | "unverified" | null>(null)

  useEffect(() => {
    const productParam = searchParams.get("product")
    if (productParam) {
      setProductId(productParam)
      handleVerify(productParam)
    }
  }, [searchParams])

  const handleVerify = async (id: string) => {
    setIsVerifying(true)

    // Simulate API call to blockchain
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (mockProducts[id]) {
      setVerificationResult(mockProducts[id])
      setVerificationStatus("verified")
    } else {
      setVerificationResult(null)
      setVerificationStatus("unverified")
    }

    setIsVerifying(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleVerify(productId)
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">Verify Product Authenticity</h1>
      <p className="text-center text-muted-foreground mb-8">Check if a product has been registered on the blockchain</p>

      <Card>
        <CardHeader>
          <CardTitle>Product Verification</CardTitle>
          <CardDescription>Enter a product ID or scan a QR code to verify its authenticity</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isVerifying || !productId}>
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>

          {verificationStatus === "verified" && verificationResult && (
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-center">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 px-3 py-1.5 text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Verified on Blockchain
                </Badge>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 font-medium">Product Details</div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Product ID</div>
                    <div className="col-span-2">{verificationResult.id}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Harvest Date</div>
                    <div className="col-span-2">{new Date(verificationResult.harvestDate).toLocaleString()}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Location</div>
                    <div className="col-span-2">{verificationResult.location}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Producer</div>
                    <div className="col-span-2 text-sm truncate">{verificationResult.producer}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Transaction</div>
                    <div className="col-span-2 flex items-center gap-2">
                      <span className="text-sm truncate">{verificationResult.txHash}</span>
                      <Button variant="ghost" size="icon" asChild className="h-6 w-6">
                        <Link
                          href={`https://etherscan.io/tx/${verificationResult.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {verificationStatus === "unverified" && (
            <div className="mt-8 text-center p-6 border rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 text-red-800 rounded-full p-2">
                  <XCircle className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Product Not Verified</h3>
              <p className="text-muted-foreground">
                This product ID was not found on the blockchain. It may be counterfeit or incorrectly entered.
              </p>
            </div>
          )}

          {!verificationStatus && !isVerifying && (
            <div className="mt-8 text-center p-6 border rounded-lg border-dashed">
              <div className="flex justify-center mb-4">
                <div className="bg-muted rounded-full p-2">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Enter a Product ID</h3>
              <p className="text-muted-foreground">
                Enter a product ID or scan a QR code to verify its authenticity on the blockchain.
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                Try example:{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => {
                    setProductId("PROD001")
                    handleVerify("PROD001")
                  }}
                >
                  PROD001
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

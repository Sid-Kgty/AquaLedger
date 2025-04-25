"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Download, ExternalLink } from "lucide-react"
import QRCode from "@/components/qr-code"

interface SuccessPageProps {
  params: {
    productId: string
  }
}

export default function SuccessPage({ params }: SuccessPageProps) {
  const searchParams = useSearchParams()
  const txHash = searchParams.get("txHash") || "0x0000000000000000000000000000000000000000000000000000000000000000"
  const productId = params.productId
  const [verificationUrl, setVerificationUrl] = useState("")

  useEffect(() => {
    // Get the current origin for the verification URL
    const origin = window.location.origin
    setVerificationUrl(`${origin}/verify?product=${productId}`)
  }, [productId])

  const handleDownloadQR = () => {
    // In a real app, this would download the QR code as an image
    alert("In a real app, this would download the QR code as a PNG file")
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-emerald-100 text-emerald-800 rounded-full p-3">
          <Check className="h-8 w-8" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2">Product Registered Successfully!</h1>
      <p className="text-center text-muted-foreground mb-8">
        Your product has been recorded on the blockchain and is now verifiable.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Information recorded on the blockchain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Product ID</div>
              <div>{productId}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Transaction Hash</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="truncate">{txHash}</span>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Verification URL</div>
              <div className="text-sm break-all">{verificationUrl}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href={`/verify?product=${productId}`}>Test Verification</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <CardDescription>Scan to verify product authenticity</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="border p-4 rounded-lg bg-white">
              <QRCode value={verificationUrl} size={200} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDownloadQR} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button variant="link" asChild>
          <Link href="/register">Register Another Product</Link>
        </Button>
      </div>
    </div>
  )
}

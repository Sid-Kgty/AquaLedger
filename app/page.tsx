import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import ConnectWalletButton from "@/components/connect-wallet-button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="flex flex-col items-center text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        Trace Your Supply Chain 
          <span className="text-emerald-600"> Powered by Blockchain</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl">
          Transparent, immutable, and secure tracking for your products from harvest to consumer. Register your products
          and let customers verify authenticity with a simple scan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <ConnectWalletButton />
          <Button asChild size="lg">
            <Link href="/register">
              Register a Product <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-800 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Connect Your Wallet</h3>
                  <p className="text-muted-foreground">
                    Authorized producers connect their blockchain wallet to access the system.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-800 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Register Products</h3>
                  <p className="text-muted-foreground">
                    Log product details like harvest date, location, and batch ID directly to the blockchain.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-800 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Generate QR Codes</h3>
                  <p className="text-muted-foreground">
                    Create unique QR codes for each product that link to verification page.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-800 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Verify Authenticity</h3>
                  <p className="text-muted-foreground">
                    Customers scan QR codes to verify product origin and authenticity on the blockchain.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button variant="outline" asChild>
                <Link href="/verify">Try Verification Demo</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] rounded-xl overflow-hidden border">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Supply chain visualization"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

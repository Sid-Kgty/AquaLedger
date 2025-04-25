"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/context/wallet-context"
import WalletStatus from "@/components/wallet-status"
import { Plus, Trash2 } from "lucide-react"

// Mock admin wallet address
const ADMIN_WALLET = "0x1234567890abcdef1234567890abcdef12345678"

// Mock authorized producers
const initialProducers = [
  "0x1234567890abcdef1234567890abcdef12345678",
  "0x2345678901abcdef2345678901abcdef23456789",
  "0x3456789012abcdef3456789012abcdef34567890",
]

export default function AdminPage() {
  const { toast } = useToast()
  const { address } = useWallet()
  const [producers, setProducers] = useState<string[]>(initialProducers)
  const [newProducer, setNewProducer] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if connected wallet is admin
    if (address) {
      setIsAdmin(address.toLowerCase() === ADMIN_WALLET.toLowerCase())
    } else {
      setIsAdmin(false)
    }
  }, [address])

  const handleAddProducer = () => {
    if (!newProducer) return

    // Basic Ethereum address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(newProducer)) {
      toast({
        title: "Invalid address",
        description: "Please enter a valid Ethereum address",
        variant: "destructive",
      })
      return
    }

    if (producers.includes(newProducer)) {
      toast({
        title: "Producer already exists",
        description: "This producer is already in the whitelist",
        variant: "destructive",
      })
      return
    }

    setProducers([...producers, newProducer])
    setNewProducer("")

    toast({
      title: "Producer added",
      description: "The producer has been added to the whitelist",
    })
  }

  const handleRemoveProducer = (producerToRemove: string) => {
    setProducers(producers.filter((producer) => producer !== producerToRemove))

    toast({
      title: "Producer removed",
      description: "The producer has been removed from the whitelist",
    })
  }

  if (!address) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <WalletStatus />
        <div className="mt-8 text-center p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Connect Wallet</h2>
          <p className="text-muted-foreground">Please connect your wallet to access the admin panel.</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <WalletStatus />
        <div className="mt-8 text-center p-6 border rounded-lg bg-red-50">
          <h2 className="text-xl font-semibold mb-2 text-red-800">Access Denied</h2>
          <p className="text-red-700">
            Your wallet does not have admin privileges. Please connect with an admin wallet.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <WalletStatus />

      <h1 className="text-3xl font-bold mt-8 mb-6">Admin Panel</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Authorized Producers</CardTitle>
          <CardDescription>Manage wallets that are authorized to register products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Enter Ethereum address (0x...)"
              value={newProducer}
              onChange={(e) => setNewProducer(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddProducer}>
              <Plus className="h-4 w-4 mr-2" />
              Add Producer
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet Address</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {producers.map((producer) => (
                <TableRow key={producer}>
                  <TableCell className="font-mono text-sm">{producer}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveProducer(producer)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {producers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground py-6">
                    No producers added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Submissions</CardTitle>
          <CardDescription>View all products registered on the blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Producer</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>PROD001</TableCell>
                <TableCell>Apr 15, 2023</TableCell>
                <TableCell className="font-mono text-xs truncate">0x1234...5678</TableCell>
                <TableCell>
                  <Button variant="link" size="sm" asChild>
                    <a href="/verify?product=PROD001">View</a>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PROD002</TableCell>
                <TableCell>Apr 20, 2023</TableCell>
                <TableCell className="font-mono text-xs truncate">0x1234...5678</TableCell>
                <TableCell>
                  <Button variant="link" size="sm" asChild>
                    <a href="/verify?product=PROD002">View</a>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

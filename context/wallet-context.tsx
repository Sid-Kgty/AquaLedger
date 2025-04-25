"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Mock authorized producers
const AUTHORIZED_PRODUCERS = [
  "0x1234567890abcdef1234567890abcdef12345678",
  "0x2345678901abcdef2345678901abcdef23456789",
  "0x3456789012abcdef3456789012abcdef34567890",
]

interface WalletContextType {
  address: string | null
  isAuthorized: boolean
  connect: (walletType: string) => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isAuthorized: false,
  connect: () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  // Check if wallet is authorized
  useEffect(() => {
    if (address) {
      const authorized = AUTHORIZED_PRODUCERS.some((producer) => producer.toLowerCase() === address.toLowerCase())
      setIsAuthorized(authorized)
    } else {
      setIsAuthorized(false)
    }
  }, [address])

  // Mock wallet connection
  const connect = (walletType: string) => {
    console.log(`Connecting to ${walletType}...`)

    // Generate a random Ethereum address for demo purposes
    const randomAddress = () => {
      let addr = "0x"
      const chars = "0123456789abcdef"
      for (let i = 0; i < 40; i++) {
        addr += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return addr
    }

    // For demo purposes, sometimes connect as authorized producer
    const shouldBeAuthorized = Math.random() > 0.5

    if (shouldBeAuthorized) {
      // Connect as one of the authorized producers
      const randomIndex = Math.floor(Math.random() * AUTHORIZED_PRODUCERS.length)
      setAddress(AUTHORIZED_PRODUCERS[randomIndex])
    } else {
      // Connect as random unauthorized address
      setAddress(randomAddress())
    }
  }

  const disconnect = () => {
    setAddress(null)
  }

  return (
    <WalletContext.Provider value={{ address, isAuthorized, connect, disconnect }}>{children}</WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)

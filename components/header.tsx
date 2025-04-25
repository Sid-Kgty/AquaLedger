"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package2 } from "lucide-react"
import { cn } from "@/lib/utils"
import ConnectWalletButton from "./connect-wallet-button"

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Register", href: "/register" },
    { label: "Verify", href: "/verify" },
    { label: "Admin", href: "/admin" },
  ]

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="hidden sm:inline-block">AquaLedger</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  )
}

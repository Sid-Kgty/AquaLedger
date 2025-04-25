import Link from "next/link"
import { Package2, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link href="/" className="flex items-center gap-2 text-sm">
            <Package2 className="h-5 w-5" />
            <span className="font-semibold">AquaLedger</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} AquaLedger. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

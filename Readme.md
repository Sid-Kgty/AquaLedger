# Blockchain Supply Chain Tracking

A Next.js application for transparent, immutable, and secure tracking of products from harvest to consumer using blockchain technology.

![Blockchain Supply Chain Tracking](/placeholder.svg?height=400&width=800)

## 🌟 Features

- **Blockchain Verification**: Register products on the blockchain for immutable record-keeping
- **QR Code Generation**: Create unique QR codes for each product that link to verification pages
- **Producer Authorization**: Role-based access control for authorized producers
- **Admin Dashboard**: Manage authorized producers and view product submissions
- **Public Verification**: Allow anyone to verify product authenticity by scanning QR codes
- **Responsive Design**: Works seamlessly on mobile and desktop devices

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Blockchain Integration**: Ethereum (mock implementation)
- **Authentication**: Wallet-based authentication (MetaMask, TON, WalletConnect)
- **QR Code**: Client-side QR code generation

## 📋 Prerequisites

- Node.js 18.0 or later
- npm or yarn
- A modern web browser

## 🚀 Getting Started

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/blockchain-supply-chain.git
   cd blockchain-supply-chain
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📱 Usage Guide

### For Consumers

1. Visit the verification page or scan a product QR code
2. Enter the product ID or let the QR code automatically fill it
3. View the product's blockchain-verified information

### For Producers

1. Connect your wallet using the "Connect Wallet" button
2. Navigate to the Register page
3. Fill in the product details (ID, harvest date, location)
4. Submit the information to the blockchain
5. Download the generated QR code to attach to your product

### For Administrators

1. Connect with an admin wallet
2. Navigate to the Admin page
3. Add or remove authorized producer wallets
4. View all product submissions

## 📁 Project Structure

\`\`\`
blockchain-supply-chain/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard
│   ├── register/           # Product registration
│   ├── success/            # Registration success page
│   ├── verify/             # Product verification
│   └── layout.tsx          # Root layout
├── components/             # Reusable UI components
│   ├── connect-wallet-button.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── qr-code.tsx
│   ├── wallet-status.tsx
│   └── ui/                 # shadcn/ui components
├── context/                # React context providers
│   └── wallet-context.tsx  # Wallet connection state
├── public/                 # Static assets
└── README.md               # Project documentation
\`\`\`

## 🔄 Blockchain Integration

The current implementation uses a mock blockchain integration for demonstration purposes. In a production environment, you would need to:

1. Connect to actual Ethereum or other blockchain networks
2. Implement smart contract interactions
3. Use real wallet providers

## 🛣️ Roadmap

- [ ] Implement actual blockchain integration with Ethereum or TON
- [ ] Add product history tracking with timeline view
- [ ] Support for multiple languages
- [ ] Product image upload functionality
- [ ] Mobile app for easier QR scanning
- [ ] Supply chain analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Ethereum](https://ethereum.org/)
- [QRCode.js](https://github.com/soldair/node-qrcode)

---

Built with ❤️ for transparent supply chains

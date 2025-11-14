import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { Container } from '@/components/common/container'
import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Toaster } from '@/components/ui/sonner'
import { ReactQueryProvider } from '@/providers/react-query'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bewear',
  description: 'Bewear. A new ecommerce to wear clothes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Header />
          <Container>{children}</Container>
        </ReactQueryProvider>
        <Footer />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}

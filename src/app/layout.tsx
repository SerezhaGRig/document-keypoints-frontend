import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { KeypointsProvider } from '@/context/KeypointsContext'
import HelpButton from '@/components/HelpButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Document Keypoints Analyzer',
  description: 'Analyze documents based on custom keypoints',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KeypointsProvider>
          <main className="min-h-screen">
            {children}
            <HelpButton />
          </main>
        </KeypointsProvider>
      </body>
    </html>
  )
}
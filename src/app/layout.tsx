// src/app/layout.tsx

import { IBM_Plex_Mono } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Matrix Alert Monitor',
  description: 'Fake but beautiful alert simulation dashboard',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${mono.className} bg-black text-matrixGreen`}>
        {children}
      </body>
    </html>
  )
}

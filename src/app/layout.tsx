import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vocab Quiz App',
  description: 'English vocabulary quiz application for learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="min-h-screen">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-blue-600">
                📘 Vocab Quiz
              </h1>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="mt-auto py-6 text-center text-gray-500 text-sm">
            <p>© 2024 Vocab Quiz App - Built with Next.js</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
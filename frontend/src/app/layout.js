import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Real Estate App',
  description: 'Built with Next.js and Django',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white shadow mb-6">
          <Navbar />
        </header>
        <main className="max-w-6xl mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}

import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Real Estate App',
  description: 'Built with Next.js and Django',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white shadow mb-6">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              🏡 RealEstate
            </Link>
            <div className="space-x-4 text-sm">
              {/* Placeholder para login/logout */}
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:underline text-gray-500 cursor-default">Login</a>
            </div>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}

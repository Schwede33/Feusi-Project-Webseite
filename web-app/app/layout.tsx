import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { CartProvider } from '@/app/context/CartContext';
import CartButton from '@/app/components/CartButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bens Webshop',
  description: 'Moderner Webshop mit Warenkorb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}
      >
        <CartProvider>
          {/* Navigation */}
          <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              {/* Logo */}
              <Link href="/" className="text-xl font-bold tracking-tight">
                🛍️ Bens Webshop
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center gap-6 text-sm font-medium">
                <Link href="/categories" className="hover:text-blue-600">
                  Kategorien
                </Link>
                <Link href="/products" className="hover:text-blue-600">
                  Produkte
                </Link>
                <Link href="/customers" className="hover:text-blue-600">
                  Kunden
                </Link>
  <Link href="/orders" className="hover:text-blue-600">
    Bestellungen
  </Link>

  {/* Cart */}
  <CartButton />
</div>
            </nav>
          </header>

          {/* Page Content */}
          <main className="relative z-0 min-h-screen">{children}</main>

          {/* Footer */}
          <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Bens Webshop – Schulprojekt
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}



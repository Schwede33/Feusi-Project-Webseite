'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      🛒 Warenkorb

      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
          {cartCount}
        </span>
      )}
    </Link>
  );
}

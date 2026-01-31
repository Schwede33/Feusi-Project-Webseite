import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black flex items-center justify-center px-6">
      <main className="w-full max-w-5xl rounded-3xl bg-white dark:bg-zinc-900 shadow-xl px-10 py-20">
        
        {/* Header / Logo */}
        <div className="mb-16 flex items-center gap-4">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={90}
            height={20}
            className="dark:invert"
            priority
          />
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Powered by Next.js
          </span>
        </div>

        {/* Hero Section */}
        <section className="grid gap-12 md:grid-cols-2 items-center">
          
          {/* Text */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Bens Webshop
            </h1>

            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Entdecke unsere Produktwelt – von Kategorien bis zu einzelnen
              Artikeln. Verwalte Kunden, Produkte und Bestellungen übersichtlich
              an einem Ort.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
    href="/categories"
    className="group rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40"
  >
    <div className="mb-4 text-4xl">📦</div>
    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
      Kategorien
    </h3>
    <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
      Alle Produktkategorien entdecken
    </p>
  </Link>

  <Link
    href="/products"
    className="group rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40"
  >
    <div className="mb-4 text-4xl">🧾</div>
    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
      Produkte
    </h3>
    <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
      Gesamte Produktübersicht
    </p>
  </Link>

  <Link
    href="/customers"
    className="group rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40"
  >
    <div className="mb-4 text-4xl">👤</div>
    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
      Kunden
    </h3>
    <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
      Kunden verwalten & ansehen
    </p>
  </Link>
  
</div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col items-start gap-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 p-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Jetzt starten
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400">
              Melde dich an, um Bestellungen zu verwalten und neue Produkte
              hinzuzufügen.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition"
            >
              Login
            </Link>
            <div className="mt-12 flex justify-center">
  <Link
    href="/login"
    className="inline-flex items-center gap-3 rounded-full bg-zinc-900 px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-zinc-700 hover:scale-[1.03] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
  >
    🔐 Login
  </Link>
</div>
          </div>

        </section>
      </main>
    </div>
  );
}

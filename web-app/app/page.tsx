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

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Kategorien */}
    <Link
      href="/categories"
      className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md min-h-[180px]"
    >
      <div className="mb-4 text-4xl">📦</div>
      <h3 className="text-lg font-semibold text-zinc-900 mb-2">
        Kategorien
      </h3>
      <p className="text-sm leading-relaxed text-zinc-600">
        Alle Produktkategorien entdecken und verwalten
      </p>
    </Link>

    {/* Produkte */}
    <Link
      href="/products"
      className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md min-h-[180px]"
    >
      <div className="mb-4 text-4xl">🧾</div>
      <h3 className="text-lg font-semibold text-zinc-900 mb-2">
        Produkte
      </h3>
      <p className="text-sm leading-relaxed text-zinc-600">
        Gesamte Produktübersicht mit Preisen und Lagerbestand
      </p>
    </Link>

    {/* Kunden */}
    <Link
      href="/customers"
      className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md min-h-[180px]"
    >
      <div className="mb-4 text-4xl">👤</div>
      <h3 className="text-lg font-semibold text-zinc-900 mb-2">
        Kunden
      </h3>
      <p className="text-sm leading-relaxed text-zinc-600">
        Kunden verwalten, anzeigen und Bestellungen zuordnen
      </p>
    </Link>
  </div>
</div>

          {/* Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-112 xl:h-128">
            <Image
              src="/webshop-illustration.png"
              alt="Webshop Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </section>
      </main>
    </div>    
    );
  }
  

          

        


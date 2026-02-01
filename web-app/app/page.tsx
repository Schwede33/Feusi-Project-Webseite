import { getCategories, getProducts } from '@/lib/api';
import HomeSearch from './HomeSearch';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Daten laden
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-12">
      
      {/* 🔍 SUCHFELD + SUCHERGEBNISSE */}
      <HomeSearch
        categories={categories}
        products={products}
      />

      {/* 🧱 DEIN BESTEHENDER STARTSEITEN-INHALT */}
      <section className="rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">
          Bens Webshop
        </h1>

        <p className="text-zinc-600 max-w-xl">
          Entdecke unsere Produktwelt – von Kategorien bis zu einzelnen Artikeln.
          Verwalte Kunden, Produkte und Bestellungen übersichtlich an einem Ort.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-xl border p-6 text-center">
            📦
            <h3 className="mt-2 font-semibold">Kategorien</h3>
            <p className="text-sm text-zinc-500">
              Alle Produktkategorien entdecken
            </p>
          </div>

          <div className="rounded-xl border p-6 text-center">
            🛒
            <h3 className="mt-2 font-semibold">Produkte</h3>
            <p className="text-sm text-zinc-500">
              Gesamte Produktübersicht
            </p>
          </div>

          <div className="rounded-xl border p-6 text-center">
            👤
            <h3 className="mt-2 font-semibold">Kunden</h3>
            <p className="text-sm text-zinc-500">
              Kunden verwalten & ansehen
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

          

        


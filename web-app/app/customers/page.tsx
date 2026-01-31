import { getCustomers } from '@/lib/api';

// Force this page to be rendered at runtime
export const dynamic = 'force-dynamic';

export default async function Page() {
  let customers = [] as {
    CustomerID: number;
    CustomerName: string;
    ContactName: string;
    Address: string;
    City: string;
    PostalCode: string;
    Country: string;
  }[];

  try {
    customers = await getCustomers();
  } catch (err) {
    console.error('Failed to fetch customers:', err);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-14 space-y-10">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Kunden
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Übersicht aller registrierten Kunden
        </p>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.CustomerID}
            className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              👤 {customer.CustomerName}
            </h2>

            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Ansprechpartner: <span className="font-medium">{customer.ContactName}</span>
            </p>

            <div className="mt-4 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <p>📍 {customer.Address}</p>
              <p>
                {customer.PostalCode} {customer.City}
              </p>
              <p>🌍 {customer.Country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

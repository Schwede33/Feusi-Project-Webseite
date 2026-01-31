import { getOrders } from '@/lib/api';

// Force this page to be rendered at runtime
export const dynamic = 'force-dynamic';

export default async function Page() {
  let orders = [] as {
    OrderID: number;
    CustomerID: number;
    EmployeeID: number;
    OrderDate: string;
    ShipperID: number;
  }[];

  try {
    orders = await getOrders();
  } catch (err) {
    console.error('Failed to fetch orders:', err);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-14 space-y-10">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Bestellungen
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Übersicht aller getätigten Bestellungen
        </p>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.OrderID}
            className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              🧾 Bestellung #{order.OrderID}
            </h2>

            <div className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p>👤 Kunde ID: {order.CustomerID}</p>
              <p>🧑‍💼 Mitarbeiter ID: {order.EmployeeID}</p>
              <p>
                📅 Datum:{' '}
                {order.OrderDate
                  ? new Date(order.OrderDate).toLocaleDateString('de-CH')
                  : '—'}
              </p>
              <p>🚚 Versender ID: {order.ShipperID}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

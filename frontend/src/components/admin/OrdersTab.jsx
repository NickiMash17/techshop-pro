import React, { useState } from 'react';

const OrderStatus = ({ status }) => {
  const styles = {
    'Pending': 'bg-yellow-500/20 text-yellow-500',
    'Processing': 'bg-blue-500/20 text-blue-500',
    'Completed': 'bg-green-500/20 text-green-500',
    'Cancelled': 'bg-red-500/20 text-red-500'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${styles[status]}`}>
      {status}
    </span>
  );
};

const OrdersTab = () => {
  const [orders] = useState([
    {
      id: 'ORD001',
      customer: 'John Doe',
      date: '2025-06-20',
      total: 299.99,
      status: 'Completed',
      items: 2
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      date: '2025-06-21',
      total: 199.99,
      status: 'Processing',
      items: 1
    },
    {
      id: 'ORD003',
      customer: 'Mike Johnson',
      date: '2025-06-21',
      total: 459.98,
      status: 'Pending',
      items: 3
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search orders..."
            className="px-4 py-2 bg-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface text-left">
            <tr>
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Items</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-surface/50">
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">{order.items}</td>
                <td className="p-4">${order.total.toFixed(2)}</td>
                <td className="p-4">
                  <OrderStatus status={order.status} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:text-green-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTab;
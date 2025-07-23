// Copyright (c) 2025 Nickimash17. All rights reserved.
// Trademark: "TechShop Pro" is a trademark of Nickimash17.
// This code was written by Nickimash17. Unauthorized copying or distribution is prohibited.

import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currency';

const statusStyles = {
  'pending': 'bg-yellow-500/20 text-yellow-500',
  'processing': 'bg-blue-500/20 text-blue-500',
  'shipped': 'bg-green-500/20 text-green-500',
  'delivered': 'bg-green-500/20 text-green-500',
  'cancelled': 'bg-red-500/20 text-red-500',
};

function OrderStatus({ status }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[status] || 'bg-gray-500/20 text-gray-400'}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/orders/my-orders')
      .then(res => {
        setOrders(res.data.orders || []);
        setError('');
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to load orders');
      })
      .finally(() => setLoading(false));
  }, []);

  const getItemsDisplay = (order) => {
    if (!order.items || order.items.length === 0) return 'No items';
    
    // If items are populated with product details
    if (order.items[0].product && typeof order.items[0].product === 'object') {
      const itemNames = order.items.map(item => 
        `${item.quantity}x ${item.product.name || 'Unknown Product'}`
      );
      return itemNames.join(', ');
    }
    
    // If items are just IDs, show count
    return `${order.items.length} item${order.items.length !== 1 ? 's' : ''}`;
  };

  return (
    <div className="flex justify-center items-start min-h-[80vh] bg-background px-2 py-8">
      <div className="max-w-4xl w-full bg-surface/80 rounded-2xl shadow-xl border border-white/10 p-6 sm:p-10">
        <h2 className="text-2xl font-extrabold text-gradient mb-6">My Orders</h2>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span className="ml-3 text-primary">Loading orders...</span>
          </div>
        ) : error ? (
          <div className="form-error text-center mb-4">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-400">You have no orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface text-left">
                <tr>
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Items</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-surface/50 cursor-pointer transition" onClick={() => window.location.href = `/orders/${order._id}`}>
                    <td className="p-4 font-medium">{order._id}</td>
                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-sm">{getItemsDisplay(order)}</td>
                    <td className="p-4">{formatCurrency(order.totalAmount || 0, false)}</td>
                    <td className="p-4"><OrderStatus status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 
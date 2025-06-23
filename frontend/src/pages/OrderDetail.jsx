import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { formatCurrency } from '../utils/currency';

const statusStyles = {
  'Pending': 'bg-yellow-500/20 text-yellow-500',
  'Processing': 'bg-blue-500/20 text-blue-500',
  'Completed': 'bg-green-500/20 text-green-500',
  'Cancelled': 'bg-red-500/20 text-red-500',
};

function OrderStatus({ status }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[status] || 'bg-gray-500/20 text-gray-400'}`}>
      {status}
    </span>
  );
}

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get(`/orders/${id}`)
      .then(res => {
        setOrder(res.data.order || res.data);
        setError('');
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to load order');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      <span className="ml-3 text-primary">Loading order...</span>
    </div>
  );
  if (error) return <div className="form-error text-center my-8">{error}</div>;
  if (!order) return null;

  return (
    <div className="max-w-3xl mx-auto bg-surface/80 rounded-2xl shadow-xl border border-white/10 p-6 sm:p-10 my-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-primary hover:underline">&larr; Back to Orders</button>
      <h2 className="text-2xl font-extrabold text-gradient mb-2">Order #{order._id}</h2>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <OrderStatus status={order.status} />
        <span className="text-gray-400">{new Date(order.createdAt).toLocaleString()}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="font-semibold mb-2">Shipping Info</h3>
          <div className="text-sm text-gray-300">
            <div>{order.shippingAddress?.name}</div>
            <div>{order.shippingAddress?.address}</div>
            <div>{order.shippingAddress?.city}, {order.shippingAddress?.province}</div>
            <div>{order.shippingAddress?.country}, {order.shippingAddress?.postalCode}</div>
            <div>{order.shippingAddress?.phone}</div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Payment Info</h3>
          <div className="text-sm text-gray-300">
            <div>Method: {order.paymentMethod}</div>
            <div>Total: <span className="font-bold">{formatCurrency(order.totalAmount || 0, false)}</span></div>
            <div>Status: {order.isPaid ? 'Paid' : 'Unpaid'}</div>
          </div>
        </div>
      </div>
      <h3 className="font-semibold mb-4">Items</h3>
      <div className="overflow-x-auto mb-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Qty</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {(order.items || order.orderItems || []).map((item, idx) => (
              <tr key={idx}>
                <td className="p-2 flex items-center gap-2">
                  {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />}
                  <span>{item.name}</span>
                </td>
                <td className="p-2">{item.quantity || item.qty}</td>
                <td className="p-2">{formatCurrency(item.price || 0, true)}</td>
                <td className="p-2">{formatCurrency((item.price || 0) * (item.quantity || item.qty || 1), true)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-6">
        <Link to="/orders" className="btn-secondary">Back to Orders</Link>
      </div>
    </div>
  );
} 